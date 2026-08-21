import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SUBAGENTS_DIR } from "../shared/config.js";
import type { Logger } from "../shared/types.js";

export function spawnSubagent(
	name: string,
	task: string,
	context: string,
	logger: Logger,
): void {
	const dir = join(SUBAGENTS_DIR, name);
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
	const taskFile = join(dir, "task.json");
	const payload = { name, task, context, createdAt: new Date().toISOString() };
	writeFileSync(taskFile, JSON.stringify(payload, null, 2));
	logger.info(`Spawned subagent: ${name}`);
	logger.info(`Task file: ${taskFile}`);
}

export function delegateToSubagent(
	name: string,
	message: string,
	logger: Logger,
): void {
	const dir = join(SUBAGENTS_DIR, name);
	if (!existsSync(dir)) {
		logger.error(`Subagent not found: ${name}`);
		return;
	}
	const inbox = join(dir, "inbox.jsonl");
	const entry = {
		type: "delegate",
		message,
		timestamp: new Date().toISOString(),
	};
	appendFileSync(inbox, `${JSON.stringify(entry)}\n`);
	logger.info(`Delegated to ${name}: ${message}`);
}
