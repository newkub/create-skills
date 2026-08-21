import { homedir } from "node:os";
import { join } from "node:path";

export const GLOBAL_SKILLS_DIR = join(homedir(), "AppData", "Roaming", "devin", "skills");
export const LOCAL_SKILLS_DIR = ".devin/skills";
export const SUBAGENTS_DIR = ".devin/subagents";
export const MCP_CONFIG_FILE = ".devin/mcp.json";
