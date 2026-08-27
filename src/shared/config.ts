const home = Bun.env.HOME ?? Bun.env.USERPROFILE ?? "";

export const GLOBAL_SKILLS_DIR = `${home}/AppData/Roaming/devin/skills`;
export const LOCAL_SKILLS_DIR = ".devin/skills";
export const SUBAGENTS_DIR = ".devin/subagents";
export const MCP_CONFIG_FILE = ".devin/mcp.json";
