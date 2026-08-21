import { SUBAGENTS_DIR } from "../shared/config.js";
import type { Logger, SubagentTask } from "../shared/types.js";

export async function spawnSubagent(
	name: string,
	task: string,
	context: string,
	logger: Logger,
): Promise<void> {
	const taskFile = `${SUBAGENTS_DIR}/${name}/task.json`;
	const payload: SubagentTask = {
		name,
		task,
		context,
		createdAt: new Date().toISOString(),
	};
	await Bun.write(taskFile, JSON.stringify(payload, null, 2));
	logger.info(`Spawned subagent: ${name}`);
	logger.info(`Task file: ${taskFile}`);
}

export async function delegateToSubagent(
	name: string,
	message: string,
	logger: Logger,
): Promise<void> {
	const taskFile = `${SUBAGENTS_DIR}/${name}/task.json`;
	if (!(await Bun.file(taskFile).exists())) {
		logger.error(`Subagent not found: ${name}`);
		return;
	}
	const inbox = `${SUBAGENTS_DIR}/${name}/inbox.jsonl`;
	const existing = (await Bun.file(inbox).exists()) ? await Bun.file(inbox).text() : "";
	const entry = {
		type: "delegate",
		message,
		timestamp: new Date().toISOString(),
	};
	await Bun.write(inbox, existing + `${JSON.stringify(entry)}\n`);
	logger.info(`Delegated to ${name}: ${message}`);
}
