#!/usr/bin/env bun
import { callMcp, runCommand } from "../adapters/process-adapter.js";
import { invokeSkill, listAvailableSkills } from "../application/skill-service.js";
import { delegateToSubagent, spawnSubagent } from "../application/subagent-service.js";
import { createLogger } from "../shared/logger.js";

interface ParsedArgs {
	command?: string;
	target?: string;
	positionals: string[];
	options: Record<string, string>;
}

function parseArgs(argv: string[]): ParsedArgs {
	const args = [...argv];
	const options: Record<string, string> = {};
	const positionals: string[] = [];

	while (args.length > 0) {
		const arg = args.shift();
		if (!arg) break;

		if (arg === "--") {
			positionals.push(...args);
			break;
		}

		if (arg.startsWith("--")) {
			const key = arg.slice(2);
			const next = args.shift();
			if (next === undefined || next.startsWith("-")) {
				options[key] = "true";
				if (next) args.unshift(next);
			} else {
				options[key] = next;
			}
		} else if (arg.startsWith("-") && arg.length === 2) {
			const key = arg[1];
			const next = args.shift();
			if (next === undefined || next.startsWith("-")) {
				options[key] = "true";
				if (next) args.unshift(next);
			} else {
				options[key] = next;
			}
		} else {
			positionals.push(arg);
		}
	}

	return {
		command: positionals[0],
		target: positionals[1],
		positionals: positionals.slice(2),
		options,
	};
}

function showHelp(version: string): void {
	console.log(`create-skills v${version}

Usage: create-skills <command> [options]

Commands:
  run <cli> [args...]                Run a CLI with arguments
  call <mcp> [options]               Call an MCP server tool
  spawn <subagent> [options]         Spawn a new subagent
  delegate-to <subagent> [options]   Delegate a task to an existing subagent
  invoke <skill> [options]           Invoke a skill by name
  list                               List available skills

Options:
  -h, --help                         Show help
  -V, --version                      Show version`);
}

const VERSION = "0.1.0";

async function main(): Promise<void> {
	const { command, target, positionals, options } = parseArgs(process.argv.slice(2));

	if (options.help === "true" || options.h === "true" || !command) {
		showHelp(VERSION);
		process.exit(command ? 0 : 1);
	}

	if (options.version === "true" || options.V === "true") {
		console.log(VERSION);
		process.exit(0);
	}

	const logger = createLogger();

	switch (command) {
		case "run": {
			if (!target) {
				logger.error("Missing <cli>");
				process.exit(1);
			}
			const code = await runCommand(target, positionals, logger);
			process.exit(code);
		}
		case "call": {
			if (!target) {
				logger.error("Missing <mcp>");
				process.exit(1);
			}
			const tool = options.tool ?? options.t;
			const params = JSON.parse(options.params ?? options.p ?? "{}") as Record<string, unknown>;
			const result = await callMcp(target, tool, params, logger);
			if (result) console.log(JSON.stringify(result, null, 2));
			break;
		}
		case "spawn": {
			if (!target) {
				logger.error("Missing <subagent>");
				process.exit(1);
			}
			spawnSubagent(target, options.task ?? options.t ?? "", options.context ?? options.c ?? "", logger);
			break;
		}
		case "delegate-to": {
			if (!target) {
				logger.error("Missing <subagent>");
				process.exit(1);
			}
			const message = options.message ?? options.m;
			if (!message) {
				logger.error("Missing --message");
				process.exit(1);
			}
			delegateToSubagent(target, message, logger);
			break;
		}
		case "invoke": {
			if (!target) {
				logger.error("Missing <skill>");
				process.exit(1);
			}
			const local = options.local === "true" || options.l === "true";
			const global = !(options.global === "false" || options.g === "false");
			const path = await invokeSkill(target, { local, global }, logger);
			if (!path) process.exit(1);
			break;
		}
		case "list":
		case "ls":
			listAvailableSkills(logger);
			break;
		default:
			logger.error(`Unknown command: ${command}`);
			showHelp(VERSION);
			process.exit(1);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
