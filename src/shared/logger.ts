import type { Logger } from "./types.js";

export function createLogger(): Logger {
	return {
		info: (message: string) => console.log("[create-skills]", message),
		error: (message: string) => console.error("[create-skills]", message),
		warn: (message: string) => console.warn("[create-skills]", message),
	};
}
