import { describe, expect, it } from "bun:test";
import { findSkillPath, listSkills, parseSkill } from "../src/domain/skill.js";

describe("skill domain", () => {
	it("parses skill content", () => {
		const content = `---\nname: test-skill\n---\n\n## Goal\n\nTest goal.\n\n## Scope\n\nTest scope.\n\n## Execute\n\n1. Step one\n2. Step two\n`;
		const skill = parseSkill(content);
		expect(skill.name).toBe("test-skill");
		expect(skill.goal).toBe("Test goal.");
		expect(skill.scope).toBe("Test scope.");
		expect(skill.execute).toContain("1. Step one");
	});

	it("lists skills without error", async () => {
		const skills = await listSkills();
		expect(Array.isArray(skills)).toBe(true);
	});

	it("finds a known global skill", async () => {
		const path = await findSkillPath("follow-create-bun-cli", false, true);
		if (path) {
			const suffix = "follow-create-bun-cli/SKILL.md";
			expect(
				path.endsWith(suffix) ||
					path.endsWith("follow-create-bun-cli\\SKILL.md"),
			).toBe(true);
		}
	});
});
