export interface Logger {
	info: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
}

export interface McpConfig {
	command: string;
	args?: string[];
}

export interface SubagentTask {
	name: string;
	task: string;
	context: string;
	createdAt: string;
}

export interface SkillInfo {
	name: string;
	path: string;
	goal: string;
	scope: string;
	execute: string[];
}
