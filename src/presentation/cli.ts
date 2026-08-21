#!/usr/bin/env bun
import cac from "cac";
import pc from "picocolors";
import { callMcp, runCommand } from "../adapters/process-adapter.js";
import { invokeSkill, listAvailableSkills } from "../application/skill-service.js";
import { delegateToSubagent, spawnSubagent } from "../application/subagent-service.js";
import { createLogger } from "../shared/logger.js";

const VERSION = "0.1.0";

const cli = cac("create-skills").version(VERSION).help();

cli
	.command("run <cli> [...args]", "Run a CLI with arguments")
	.allowUnknownOptions()
	.action(async (target, rest, options) => {
		if (!target) {
			console.error(pc.red("Missing <cli>"));
			process.exit(1);
		}
		const extra = options["--"] as string[] | undefined;
		const args = [...(rest ?? []), ...(extra ?? [])];
		const logger = createLogger();
		const code = await runCommand(target, args, logger);
		process.exit(code);
	});

cli
	.command("call <mcp>", "Call an MCP server tool")
	.option("--tool <tool>", "Tool name")
	.option("--params <params>", "JSON params")
	.action(async (target, options) => {
		if (!target) {
			console.error(pc.red("Missing <mcp>"));
			process.exit(1);
		}
		const logger = createLogger();
		const tool = options.tool as string | undefined;
		const params = JSON.parse((options.params as string) ?? "{}") as Record<string, unknown>;
		const result = await callMcp(target, tool, params, logger);
		if (result !== undefined) console.log(JSON.stringify(result, null, 2));
	});

cli
	.command("spawn <subagent>", "Spawn a new subagent")
	.option("--task <task>", "Task description")
	.option("--context <context>", "Context")
	.action(async (target, options) => {
		if (!target) {
			console.error(pc.red("Missing <subagent>"));
			process.exit(1);
		}
		const logger = createLogger();
		await spawnSubagent(target, (options.task as string) ?? "", (options.context as string) ?? "", logger);
	});

cli
	.command("delegate-to <subagent>", "Delegate a task to an existing subagent")
	.option("--message <message>", "Message")
	.action(async (target, options) => {
		if (!target) {
			console.error(pc.red("Missing <subagent>"));
			process.exit(1);
		}
		const message = options.message as string | undefined;
		if (!message) {
			console.error(pc.red("Missing --message"));
			process.exit(1);
		}
		const logger = createLogger();
		await delegateToSubagent(target, message, logger);
	});

cli
	.command("invoke <skill>", "Invoke a skill by name")
	.option("--local", "Search local skills")
	.option("--global", "Search global skills (default)")
	.action(async (target, options) => {
		if (!target) {
			console.error(pc.red("Missing <skill>"));
			process.exit(1);
		}
		const local = options.local === true;
		const global = options.global !== false && options.global !== "false";
		const logger = createLogger();
		const path = await invokeSkill(target, { local, global }, logger);
		if (!path) process.exit(1);
	});

cli
	.command("list", "List available skills")
	.alias("ls")
	.action(async () => {
		const logger = createLogger();
		await listAvailableSkills(logger);
	});

cli.parse();
