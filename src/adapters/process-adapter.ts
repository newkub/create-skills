import { MCP_CONFIG_FILE } from "../shared/config.js";
import type { Logger, McpConfig } from "../shared/types.js";

export async function runCommand(
	command: string,
	args: string[],
	logger: Logger,
): Promise<number> {
	logger.info(`Running: ${[command, ...args].join(" ")}`);
	const proc = Bun.spawn([command, ...args], { stdio: ["inherit", "inherit", "inherit"] });
	await proc.exited;
	return proc.exitCode ?? 1;
}

interface McpConfigMap {
	[name: string]: McpConfig;
}

async function loadMcpConfig(): Promise<McpConfigMap> {
	const file = Bun.file(MCP_CONFIG_FILE);
	if (!(await file.exists())) return {};
	const text = await file.text();
	return JSON.parse(text) as McpConfigMap;
}

async function* readLines(stream: ReadableStream<Uint8Array>) {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let done = false;
	while (!done) {
		const { value, done: d } = await reader.read();
		done = d;
		if (value) {
			buffer += decoder.decode(value, { stream: !done });
			const parts = buffer.split("\n");
			buffer = parts.pop() ?? "";
			for (const line of parts) {
				if (line.trim()) yield line;
			}
		}
	}
	if (buffer.trim()) yield buffer;
}

export async function callMcp(
	name: string,
	tool: string | undefined,
	params: Record<string, unknown>,
	logger: Logger,
): Promise<unknown> {
	const configMap = await loadMcpConfig();
	const config = configMap[name];
	if (!config) {
		logger.error(`MCP server not found: ${name}`);
		return undefined;
	}

	const proc = Bun.spawn([config.command, ...(config.args ?? [])], {
		stdio: ["pipe", "pipe", "pipe"],
	});

	const writer = proc.stdin.getWriter();
	const encoder = new TextEncoder();

	const initRequest = {
		jsonrpc: "2.0",
		id: 1,
		method: "initialize",
		params: {
			protocolVersion: "2024-11-05",
			capabilities: {},
			clientInfo: { name: "create-skills", version: "0.1.0" },
		},
	};
	const initNotification = {
		jsonrpc: "2.0",
		method: "notifications/initialized",
	};

	writer.write(encoder.encode(JSON.stringify(initRequest) + "\n"));
	writer.write(encoder.encode(JSON.stringify(initNotification) + "\n"));

	if (tool) {
		const callRequest = {
			jsonrpc: "2.0",
			id: 2,
			method: "tools/call",
			params: { name: tool, arguments: params },
		};
		writer.write(encoder.encode(JSON.stringify(callRequest) + "\n"));
	}

	await writer.close();

	let result: unknown;
	const timeout = setTimeout(() => {
		proc.kill(9);
	}, 10000);

	try {
		for await (const line of readLines(proc.stdout)) {
			try {
				const message = JSON.parse(line) as { id?: number; result?: unknown; error?: unknown };
				if (message.id === 2) {
					result = "error" in message ? message.error : message.result;
					break;
				}
			} catch {
				// ignore non-JSON lines
			}
		}
	} finally {
		clearTimeout(timeout);
		proc.kill(9);
	}

	return result;
}
