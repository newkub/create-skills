import { readFileSync } from "node:fs";
import { findSkillPath, listSkills, parseSkill } from "../domain/skill.js";
import type { Logger } from "../shared/types.js";

export async function invokeSkill(
	name: string,
	options: { local: boolean; global: boolean },
	logger: Logger,
): Promise<string | undefined> {
	const path = findSkillPath(name, options.local, options.global);
	if (!path) {
		logger.error(`Skill not found: ${name}`);
		return undefined;
	}
	const content = readFileSync(path, "utf-8");
	const skill = parseSkill(content);
	skill.path = path;

	logger.info(`Skill: ${skill.name}`);
	logger.info(`Path: ${skill.path}`);
	if (skill.goal) logger.info(`Goal: ${skill.goal.split("\n")[0] ?? ""}`);
	if (skill.scope) logger.info(`Scope: ${skill.scope.split("\n")[0] ?? ""}`);
	if (skill.execute.length > 0) {
		logger.info("Execute:");
		for (const step of skill.execute.slice(0, 20)) {
			console.log(`  ${step}`);
		}
		if (skill.execute.length > 20) {
			logger.info(`... and ${skill.execute.length - 20} more steps`);
		}
	}
	return path;
}

export function listAvailableSkills(logger: Logger): string[] {
	const skills = listSkills();
	logger.info(`Found ${skills.length} skills`);
	for (const skill of skills) {
		console.log(`  ${skill}`);
	}
	return skills;
}
