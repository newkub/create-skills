# create-skills

> 🚀 Bun-native CLI for orchestrating Devin skills, MCP servers, subagents, and other CLI tools.

![Version](https://img.shields.io/badge/version-0.1.0-1976d2?style=flat-square)
![Bun](https://img.shields.io/badge/Bun-%3E%3D%201.3.14-000000?style=flat-square&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-ESNext-3178c6?style=flat-square&logo=typescript&logoColor=white)

```text
create-skills v0.1.0
┌────────────────────────────────────────────────────────────┐
│  $ create-skills <command> [options]                       │
├────────────────────────────────────────────────────────────┤
│  Commands:                                                 │
│    run <cli>          Run a CLI with arguments             │
│    call <mcp>         Call an MCP server tool              │
│    spawn <subagent>   Spawn a new subagent task            │
│    delegate-to        Send a task to a subagent            │
│    invoke <skill>     Invoke a skill by name               │
│    list               List local and global skills         │
└────────────────────────────────────────────────────────────┘
```

## Get Started

1. Install the CLI — add `@wrikka/create-skills` globally or in your project.
   ```bash
   bun add -g @wrikka/create-skills
   ```
2. Configure an MCP server (optional) — create `.devin/mcp.json`.
   ```json
   {
     "my-server": {
       "command": "npx",
       "args": ["-y", "@example/mcp-server"]
     }
   }
   ```
3. Run a safe command — list all available skills.
   ```bash
   create-skills list
   ```

## Features

| Icon | Feature | Description | Benefit | Usage |
|:---:|---------|-------------|---------|-------|
| ![icon](https://api.iconify.design/mdi:console-line.svg?color=%230097a7&width=20) | `run <cli>` | Run any CLI with extra arguments | Execute external tools from one entry point | `create-skills run bun -- --version` |
| ![icon](https://api.iconify.design/mdi:server-network.svg?color=%231976d2&width=20) | `call <mcp>` | Call an MCP server tool over stdio | Extend the CLI with external tools and context | `create-skills call my-server --tool list-tools` |
| ![icon](https://api.iconify.design/mdi:robot.svg?color=%237b1fa2&width=20) | `spawn <subagent>` | Create a new subagent task | Break work into parallel or focused agents | `create-skills spawn agent-1 --task "review README"` |
| ![icon](https://api.iconify.design/mdi:send.svg?color=%23c2185b&width=20) | `delegate-to <subagent>` | Send a task to an existing subagent | Continue collaboration with a running agent | `create-skills delegate-to agent-1 --message "start review"` |
| ![icon](https://api.iconify.design/mdi:book-open.svg?color=%23388e3c&width=20) | `invoke <skill>` | Load and preview a skill's `## Execute` section | Reuse Devin skill instructions programmatically | `create-skills invoke follow-create-bun-cli` |
| ![icon](https://api.iconify.design/mdi:format-list-bulleted.svg?color=%23303f9f&width=20) | `list` | List local and global skills | Discover skills without searching manually | `create-skills list` |

## Usage

### Usage via CLI

Install the package and run commands directly from the terminal.

```bash
bun add -g @wrikka/create-skills
create-skills run bun -- --version
create-skills list
create-skills invoke follow-create-bun-cli
create-skills call my-server --tool list-tools
create-skills spawn agent-1 --task "review README"
```

### Usage via SDK

Import and use the orchestration functions in your own Bun or Node ESM project.

```typescript
import { runCommand, callMcp, invokeSkill, listAvailableSkills } from "@wrikka/create-skills";
import { createLogger } from "@wrikka/create-skills";

const logger = createLogger();

// run a CLI
await runCommand("bun", ["--version"], logger);

// call an MCP tool
const result = await callMcp("my-server", "list-tools", {}, logger);

// invoke a skill
await invokeSkill("follow-create-bun-cli", { local: false, global: true }, logger);

// list skills
const skills = await listAvailableSkills(logger);
```

### Usage via npx/bunx

Run the latest version without installing it first.

```bash
bunx @wrikka/create-skills list
bunx @wrikka/create-skills invoke follow-create-bun-cli
```

## Project

<details><summary>Goal</summary>

| Icon | Goal | Status | Description |
|:---:|------|--------|-------------|
| ![icon](https://api.iconify.design/mdi:target.svg?color=%23388e3c&width=20) | Single CLI for orchestration | ✓ Goal | Provide one command for running CLIs, calling MCPs, managing subagents, and invoking skills |
| ![icon](https://api.iconify.design/mdi:target.svg?color=%23388e3c&width=20) | Bun-native runtime | ✓ Goal | Use Bun native APIs instead of `node:*` modules for performance and consistency |
| ![icon](https://api.iconify.design/mdi:target.svg?color=%23388e3c&width=20) | Pluggable MCP support | ✓ Goal | Load and call MCP servers from `.devin/mcp.json` over stdio |
| ![icon](https://api.iconify.design/mdi:close.svg?color=%23d32f2f&width=20) | Multi-agent consensus | ✗ Not Goal | Consensus logic between multiple agents is out of scope for now |

</details>

<details><summary>Scope</summary>

| Icon | Scope | Status | Description |
|:---:|------|--------|-------------|
| ![icon](https://api.iconify.design/mdi:check-circle.svg?color=%23388e3c&width=20) | Bun CLI and SDK | ✓ In Scope | TypeScript ESM package with both CLI entry and library exports |
| ![icon](https://api.iconify.design/mdi:check-circle.svg?color=%23388e3c&width=20) | Skill discovery and preview | ✓ In Scope | Find local and global skills and render their `## Execute` section |
| ![icon](https://api.iconify.design/mdi:check-circle.svg?color=%23388e3c&width=20) | Subagent task and inbox management | ✓ In Scope | Spawn and delegate to subagents through `.devin/subagents/` files |
| ![icon](https://api.iconify.design/mdi:close-circle.svg?color=%23d32f2f&width=20) | HTML report generation | ✗ Out Scope | Visual reports are handled by `/report-in-html` separately |

</details>

<details><summary>When To Use</summary>

| Icon | Use Case | Description |
|:---:|----------|-------------|
| ![icon](https://api.iconify.design/mdi:layers.svg?color=%230097a7&width=20) | Automate multi-tool workflows | When you need to run several CLIs, MCPs, and subagents from one place |
| ![icon](https://api.iconify.design/mdi:book-open.svg?color=%23388e3c&width=20) | Reuse Devin skills | When you want to preview or execute skill instructions programmatically |
| ![icon](https://api.iconify.design/mdi:robot.svg?color=%237b1fa2&width=20) | Build agent orchestrators | When you need a Bun-native base for managing subagent tasks |

</details>

<details><summary>Key Concepts</summary>

| Icon | Name | Description |
|:---:|------|-------------|
| ![icon](https://api.iconify.design/mdi:hexagon-multiple.svg?color=%23303f9f&width=20) | Clean Architecture | Domain → Application → Adapters → Presentation layers |
| ![icon](https://api.iconify.design/mdi:lightning-bolt.svg?color=%23ffa000&width=20) | Bun Native APIs | `Bun.file`, `Bun.write`, `Bun.spawn`, `Bun.Glob` for I/O and processes |
| ![icon](https://api.iconify.design/mdi:console.svg?color=%230097a7&width=20) | cac | Minimal command-line argument parser |
| ![icon](https://api.iconify.design/mdi:palette.svg?color=%23c2185b&width=20) | picocolors | Zero-dependency terminal colors |

</details>

<details><summary>Core Principles</summary>

| Icon | Name | Description |
|:---:|------|-------------|
| ![icon](https://api.iconify.design/mdi:package-variant-closed.svg?color=%2300796b&width=20) | Zero runtime deps after build | `bunup` bundles `cac` and `picocolors` into `dist/` |
| ![icon](https://api.iconify.design/mdi:file-check.svg?color=%231976d2&width=20) | Keep files under 250 lines | Easier to read, review, and maintain |
| ![icon](https://api.iconify.design/mdi:refresh.svg?color=%23f57c00&width=20) | Prefer Bun over `node:*` | Use Bun APIs wherever equivalent native APIs exist |

</details>

<details><summary>Best Practices</summary>

| Icon | Name | Description |
|:---:|------|-------------|
| ![icon](https://api.iconify.design/mdi:alert.svg?color=%23d32f2f&width=20) | Validate inputs early | Fail fast when required arguments or configs are missing |
| ![icon](https://api.iconify.design/mdi:shield-check.svg?color=%23388e3c&width=20) | Use dry-run for destructive operations | Verify before writing files or killing processes |
| ![icon](https://api.iconify.design/mdi:check-all.svg?color=%230097a7&width=20) | Run `bun run verify` before shipping | Ensures lint, type check, tests, and build all pass |

</details>

## API References

<details><summary>Functions</summary>

| Function | Description |
|----------|-------------|
| `runCommand(command, args, logger)` | Run a CLI with `Bun.spawn` and return the exit code |
| `callMcp(name, tool, params, logger)` | Call an MCP server over stdio and return the tool result |
| `invokeSkill(name, options, logger)` | Find a skill by name and render its metadata and execute steps |
| `listAvailableSkills(logger)` | Return an array of all available local and global skill names |
| `spawnSubagent(name, task, context, logger)` | Create a subagent task file under `.devin/subagents/` |
| `delegateToSubagent(name, message, logger)` | Append a message to a subagent's `inbox.jsonl` |

</details>

## Development

<details><summary>Tech Stack</summary>

| Layer | Technology | Version | Description |
|-------|-------------|---------|-------------|
| Runtime | Bun | >= 1.3.14 | JavaScript runtime and test runner |
| Language | TypeScript | ESNext | Type-safe ESM development |
| Bundler | bunup | ^0.16.32 | Bun-first build tool with ESM/CJS/dts output |
| CLI Parser | cac | ^6.7.14 | Minimal command-line argument parser |
| Colors | picocolors | ^1.1.1 | Zero-dependency terminal colors |
| Linter | Biome | from root monorepo | Formatting and linting |
| Scanner | ast-grep | from root monorepo | Code pattern scanning |

</details>

<details><summary>How It Work</summary>

```text
┌─────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   User      │────▶│  presentation/cli   │────▶│  application        │
│   Input     │     │  (cac + picocolors) │     │  services           │
└─────────────┘     └─────────────────────┘     └─────────────────────┘
                                                           │
                              ┌────────────────┬───────────┴───────────┬────────────────┐
                              ▼                ▼                       ▼                ▼
                        ┌──────────┐   ┌──────────────┐        ┌──────────────┐   ┌──────────┐
                        │  skill   │   │  subagent    │        │   process    │   │   MCP    │
                        │  domain  │   │  service     │        │   adapter    │   │  server  │
                        └──────────┘   └──────────────┘        └──────────────┘   └──────────┘
```

</details>

<details><summary>Architecture</summary>

```text
src/
├── domain/             # pure skill parsing logic
│   └── skill.ts
├── application/        # orchestration for skills and subagents
│   ├── skill-service.ts
│   └── subagent-service.ts
├── adapters/           # process and MCP adapters
│   └── process-adapter.ts
├── presentation/       # CLI entry point using cac
│   └── cli.ts
├── shared/             # types, logger, config
│   ├── types.ts
│   ├── logger.ts
│   └── config.ts
├── index.ts            # public API exports
└── test/               # bun:test suites
    └── cli.test.ts
```

</details>

<details><summary>Scripts</summary>

```json
{
  "dev": "bun run src/presentation/cli.ts",                    // run CLI in dev mode
  "build": "bunup",                                             // build with bunup
  "build:watch": "bunup --watch",                               // build in watch mode
  "typecheck": "tsc --noEmit",                                  // TypeScript type check
  "typecheck:watch": "tsc --noEmit --watch",                    // type check in watch mode
  "lint": "biome check",                                        // lint with Biome
  "lint:fix": "biome check --write",                            // lint and fix
  "format": "biome check --write",                              // format with Biome
  "test": "bun test",                                           // run Bun tests
  "test:watch": "bun test --watch",                             // run tests in watch mode
  "test:coverage": "bun test --coverage",                       // run tests with coverage
  "scan": "ast-grep scan",                                      // run ast-grep scan
  "check": "bun run lint && bun run typecheck && bun run scan", // lint + type + scan
  "verify": "bun run check && bun run test && bun run build",   // check + test + build
  "clean": "bunx rimraf dist node_modules",                     // remove dist and deps
  "deps:analyze": "bunx depcheck"                               // analyze dependencies
}
```

</details>

<details><summary>Workflows</summary>

```text
.devin/                       # workspace configuration
├── mcp.json                  # MCP server registry (optional)
├── subagents/                # subagent task and inbox files
│   ├── <name>/
│   │   ├── task.json         # task payload
│   │   └── inbox.jsonl       # delegated messages
└── skills/                   # local project skills

scripts/                      # helper scripts
└── smoke-test.ts             # end-to-end smoke test
```

</details>

<details><summary>Skills</summary>

```text
global/                       # global Devin skills (read-only)
├── follow-create-bun-cli/    # conventions for Bun CLI creation
├── use-bun-native-api/       # Bun native API guidance
└── ...

project/                      # project-specific workflows
├── AGENTS.md                 # agent instructions for create-skills
├── README.md                 # this file
├── biome.jsonc               # Biome configuration
├── bunup.config.ts           # bunup build configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # package manifest
```

</details>

## License

MIT
