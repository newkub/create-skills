---
title: Overview
description: Project overview and architecture for create-skills.
---

# Project Overview

`create-skills` is a **Bun-native CLI** for orchestrating external tools, MCP servers, subagents, and Devin skills from a single entry point. It is designed to be small, fast, and composable.

## Why create-skills?

Modern AI workflows mix many tools:

- General-purpose CLIs (`bun`, `git`, custom scripts)
- MCP servers that expose tools over stdio
- Subagent workers that receive task files and inbox messages
- Devin skills that encode repeatable workflows

`create-skills` unifies these under one command surface so you can run, call, spawn, delegate, and invoke without switching contexts.

## Key Concepts

- **Commands** are handled by `cac` in `src/presentation/cli.ts`.
- **Services** in `src/application/` orchestrate skills and subagents.
- **Adapters** in `src/adapters/` integrate with the OS and MCP.
- **Domain** in `src/domain/` parses skill files with zero side effects.
- **Shared** in `src/shared/` provides types, logger, and configuration.

## Architecture

```text
src/
├── presentation/      CLI entry point (cac + picocolors)
├── application/       skill-service, subagent-service
├── adapters/          process-adapter, MCP integration
├── domain/            skill parsing logic
├── shared/            types, logger, config
├── index.ts           public API
└── test/              bun:test suites
```

## Tech Stack

| Layer | Technology | Version | Description |
|-------|-------------|---------|-------------|
| Runtime | Bun | >= 1.3.14 | JavaScript runtime and test runner |
| Language | TypeScript | ESNext | Type-safe ESM development |
| Bundler | bunup | ^0.16.32 | Bun-first build tool |
| CLI Parser | cac | ^6.7.14 | Minimal argument parser |
| Colors | picocolors | ^1.1.1 | Zero-dependency terminal colors |

## License

MIT
