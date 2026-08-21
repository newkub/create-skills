import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GLOBAL_SKILLS_DIR, LOCAL_SKILLS_DIR } from "../shared/config.js";
import type { SkillInfo } from "../shared/types.js";

export function findSkillPath(
	name: string,
	searchLocal: boolean,
	searchGlobal: boolean,
): string | undefined {
	if (searchLocal) {
		const localPath = join(LOCAL_SKILLS_DIR, name, "SKILL.md");
		if (existsSync(localPath)) return localPath;
	}
	if (searchGlobal) {
		const globalPath = join(GLOBAL_SKILLS_DIR, name, "SKILL.md");
		if (existsSync(globalPath)) return globalPath;
	}
	return undefined;
}

export function parseSkill(content: string): SkillInfo {
	const goalMatch = content.match(/## Goal\n+([\s\S]*?)(?=\n## |$)/);
	const scopeMatch = content.match(/## Scope\n+([\s\S]*?)(?=\n## |$)/);
	const executeMatch = content.match(/## Execute\n+([\s\S]*?)(?=\n## |$)/);

	return {
		name: parseFrontmatter(content, "name") ?? "unknown",
		path: "",
		goal: goalMatch ? goalMatch[1].trim() : "",
		scope: scopeMatch ? scopeMatch[1].trim() : "",
		execute: executeMatch
			? executeMatch[1]
					.split("\n")
					.filter((line) => line.trim().length > 0)
					.map((line) => line.trim())
			: [],
	};
}

function parseFrontmatter(content: string, key: string): string | undefined {
	const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
	return match ? match[1].trim() : undefined;
}

export function listSkills(): string[] {
	const skills: string[] = [];
	if (existsSync(LOCAL_SKILLS_DIR)) {
		for (const dir of readdirSync(LOCAL_SKILLS_DIR)) {
			if (existsSync(join(LOCAL_SKILLS_DIR, dir, "SKILL.md"))) {
				skills.push(`${dir} (local)`);
			}
		}
	}
	if (existsSync(GLOBAL_SKILLS_DIR)) {
		for (const dir of readdirSync(GLOBAL_SKILLS_DIR)) {
			if (existsSync(join(GLOBAL_SKILLS_DIR, dir, "SKILL.md"))) {
				skills.push(`${dir} (global)`);
			}
		}
	}
	return skills;
}
