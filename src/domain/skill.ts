import { GLOBAL_SKILLS_DIR, LOCAL_SKILLS_DIR } from "../shared/config.js";
import type { SkillInfo } from "../shared/types.js";

export async function findSkillPath(
	name: string,
	searchLocal: boolean,
	searchGlobal: boolean,
): Promise<string | undefined> {
	if (searchLocal) {
		const localPath = `${LOCAL_SKILLS_DIR}/${name}/SKILL.md`;
		if (await Bun.file(localPath).exists()) return localPath;
	}
	if (searchGlobal) {
		const globalPath = `${GLOBAL_SKILLS_DIR}/${name}/SKILL.md`;
		if (await Bun.file(globalPath).exists()) return globalPath;
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

async function collectSkills(dir: string): Promise<string[]> {
	const skills: string[] = [];
	try {
		const pattern = new Bun.Glob("*/SKILL.md");
		for await (const file of pattern.scan(dir)) {
			const name = file.split(/[\\/]/)[0] ?? file;
			skills.push(`${name} (${dir === LOCAL_SKILLS_DIR ? "local" : "global"})`);
		}
	} catch {
		// directory does not exist
	}
	return skills;
}

export async function listSkills(): Promise<string[]> {
	const local = await collectSkills(LOCAL_SKILLS_DIR);
	const global = await collectSkills(GLOBAL_SKILLS_DIR);
	return [...local, ...global];
}
