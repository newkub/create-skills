---
title: Features
description: Existing features of create-skills grouped by domain.
---

# Features

`create-skills` provides six core commands and a public SDK for orchestrating Devin skills, MCP servers, subagents, and external CLI tools.

## CLI Commands

| Feature | Description | Module | Domain |
|---------|-------------|--------|--------|
| `run <cli>` | Run any CLI with extra arguments | `src/presentation/cli.ts`, `src/adapters/process-adapter.ts` | CLI execution |
| `call <mcp>` | Call an MCP server tool over stdio | `src/presentation/cli.ts`, `src/adapters/process-adapter.ts` | MCP integration |
| `spawn <subagent>` | Create a new subagent task | `src/presentation/cli.ts`, `src/application/subagent-service.ts` | Subagent management |
| `delegate-to <subagent>` | Send a task to an existing subagent | `src/presentation/cli.ts`, `src/application/subagent-service.ts` | Subagent management |
| `invoke <skill>` | Load and preview a skill's `## Execute` section | `src/presentation/cli.ts`, `src/application/skill-service.ts` | Skill discovery |
| `list` | List local and global skills | `src/presentation/cli.ts`, `src/application/skill-service.ts` | Skill discovery |

## Skill Domain

| Feature | Description | Module | Domain |
|---------|-------------|--------|--------|
| Skill file parsing | Parse `SKILL.md` frontmatter and `## Goal`, `## Scope`, `## Execute` sections | `src/domain/skill.ts` | Skill parsing |
| Skill path resolution | Search local `.devin/skills` or global `~/.devin/skills` | `src/domain/skill.ts`, `src/shared/config.ts` | Skill discovery |
| Skill listing | Collect all `*/SKILL.md` files with `Bun.Glob` | `src/domain/skill.ts` | Skill discovery |

## Subagent Management

| Feature | Description | Module | Domain |
|---------|-------------|--------|--------|
| Task file creation | Write `task.json` payload to `.devin/subagents/<name>/` | `src/application/subagent-service.ts` | Subagent lifecycle |
| Inbox delegation | Append delegated messages to `inbox.jsonl` | `src/application/subagent-service.ts` | Subagent communication |
| Task existence check | Verify subagent exists before delegating | `src/application/subagent-service.ts` | Subagent lifecycle |

## Process and MCP Adapter

| Feature | Description | Module | Domain |
|---------|-------------|--------|--------|
| Command execution | Spawn processes with `Bun.spawn` and inherit stdio | `src/adapters/process-adapter.ts` | Process execution |
| MCP stdio client | Send JSON-RPC initialize and tools/call requests | `src/adapters/process-adapter.ts` | MCP integration |
| MCP config loading | Read `.devin/mcp.json` and route to the correct server | `src/adapters/process-adapter.ts`, `src/shared/config.ts` | MCP integration |

## Build and Tooling

| Feature | Description | Module | Domain |
|---------|-------------|--------|--------|
| ESM + CJS bundle | Build both formats with `bunup` | `bunup.config.ts` | Build |
| Type declarations | Emit `.d.ts` for library consumers | `bunup.config.ts` | Build |
| Bun test runner | Unit tests for skill parsing and discovery | `test/cli.test.ts` | Testing |
| Smoke test | End-to-end script that exercises list, run, and spawn | `scripts/smoke-test.ts` | Testing |