import pc from "picocolors";
import type { Logger } from "./types.js";

export function createLogger(): Logger {
	return {
		info: (message: string) => console.log(pc.cyan("[create-skills]"), message),
		error: (message: string) =>
			console.error(pc.red("[create-skills]"), message),
		warn: (message: string) =>
			console.warn(pc.yellow("[create-skills]"), message),
	};
}
