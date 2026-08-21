import type { BunupConfig } from "bunup";

const config: BunupConfig = {
	entry: ["./src/index.ts", "./src/presentation/cli.ts"],
	format: ["esm", "cjs"],
	packages: "bundle",
	dts: true,
	clean: true,
	sourcemap: true,
	minify: true,
	target: "node",
	outDir: "./dist",
	exports: true,
};

export default config;
