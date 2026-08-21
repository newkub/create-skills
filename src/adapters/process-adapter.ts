import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { existsSync, readFileSync } from "node:fs";
import { MCP_CONFIG_FILE } from "../shared/config.js";
import type { Logger, McpConfig } from "../shared/types.js";

export async function runCommand(
	cli: string,
	args: string[],
	logger: Logger,
): Promise<number> {
	return new Promise((resolve) => {
		const fullCommand = `${cli} ${args.join(" ")}`.trim();
		logger.info(`Running: ${fullCommand}`);
		const child = spawn(fullCommand, { shell: true, stdio: "inherit" });
		child.on("close", (code) => resolve(code ?? 0));
		child.on("error", (err) => {
			logger.error(`Failed to run ${cli}: ${err.message}`);
			resolve(1);
		});
	});
}

export async function callMcp(
	mcp: string,
	tool: string | undefined,
	params: Record<string, unknown>,
	logger: Logger,
): Promise<unknown | undefined> {
	if (!existsSync(MCP_CONFIG_FILE)) {
		logger.error(`MCP config not found: ${MCP_CONFIG_FILE}`);
		logger.info(
			"Create a config file like: { \"<name>\": { \"command\": \"npx\", \"args\": [\"-y\", \"@server/mcp-server\"] } }",
		);
		return undefined;
	}
	const config: Record<string, McpConfig> = JSON.parse(
		readFileSync(MCP_CONFIG_FILE, "utf-8"),
	);
	const server = config[mcp];
	if (!server) {
		logger.error(`MCP server not found: ${mcp}`);
		return undefined;
	}
	if (!tool) {
		logger.info(
			`MCP server: ${mcp} (${server.command} ${(server.args ?? []).join(" ")})`,
		);
		logger.info("Use --tool <tool> and --params '{\"key\":\"value\"}' to call a tool.");
		return undefined;
	}

	logger.info(`Calling ${mcp}/${tool} with params: ${JSON.stringify(params)}`);
	return callMcpStdio(server, tool, params, logger);
}

function callMcpStdio(
	config: McpConfig,
	tool: string,
	params: Record<string, unknown>,
	logger: Logger,
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const proc = spawn(config.command, config.args ?? [], {
			stdio: ["pipe", "pipe", "pipe"],
		});
		const reader = createInterface({ input: proc.stdout });
		let requestId = 0;
		const pending = new Map<number, (value: unknown) => void>();

		const send = (message: unknown) => {
			proc.stdin.write(`${JSON.stringify(message)}\n`);
		};

		const request = (method: string, paramsValue: unknown): Promise<unknown> => {
			const id = ++requestId;
			const promise = new Promise<unknown>((res) => pending.set(id, res));
			send({ jsonrpc: "2.0", id, method, params: paramsValue });
			return promise;
		};

		reader.on("line", (line) => {
			try {
				const message: { id?: number; result?: unknown } = JSON.parse(line);
				if (message.id !== undefined && pending.has(message.id)) {
					pending.get(message.id)?.(message);
				}
			} catch {
				// ignore non-json lines
			}
		});

		proc.on("error", (err) => reject(err));

		(async () => {
			try {
				await request("initialize", {
					protocolVersion: "2024-11-05",
					capabilities: {},
					clientInfo: { name: "create-skills", version: "0.1.0" },
				});
				send({ jsonrpc: "2.0", method: "notifications/initialized" });
				const result = await request("tools/call", {
					name: tool,
					arguments: params,
				});
				resolve(result);
			} catch (err) {
				reject(err);
			} finally {
				proc.kill();
			}
		})();
	});
}
