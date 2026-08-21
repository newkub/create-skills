#!/usr/bin/env bun
/**
 * Smoke test script for create-skills CLI.
 * Runs each command in dry-run / safe mode to verify wiring.
 */
import { callMcp, runCommand } from "../src/adapters/process-adapter.js";
import { listAvailableSkills } from "../src/application/skill-service.js";
import { spawnSubagent } from "../src/application/subagent-service.js";
import { createLogger } from "../src/shared/logger.js";

const logger = createLogger();

async function main() {
	logger.info("=== Smoke test start ===");

	// 1. list skills
	await listAvailableSkills(logger);

	// 2. spawn a subagent
	await spawnSubagent("smoke", "Run smoke test", ".", logger);

	// 3. run a safe CLI
	const code = await runCommand("bun", ["-e", "console.log('smoke-ok')"], logger);
	if (code !== 0) throw new Error(`run command failed with code ${code}`);

	// 4. call a missing MCP (should warn, not throw)
	await callMcp("missing-server", undefined, {}, logger);

	logger.info("=== Smoke test complete ===");
}

main().catch((err) => {
	logger.error(String(err));
	process.exit(1);
});
