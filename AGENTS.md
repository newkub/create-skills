# AGENTS.md

## Goal

Create-skills is a Bun CLI for orchestrating Devin skills, MCP servers, subagents, and CLI execution.

## Scope

- `src/presentation/cli.ts` — CLI entry point using `cac`
- `src/domain/` — pure skill parsing logic
- `src/application/` — orchestration for skills and subagents
- `src/adapters/` — process and MCP adapters
- `src/shared/` — types, logger, config
- `test/` — Bun tests
- `scripts/` — smoke test and helper scripts

## Key Commands

- `bun run dev` — run CLI in dev mode
- `bun run build` — build with `bunup`
- `bun run test` — run tests
- `bun run check` — lint, typecheck, scan
- `bun run scripts/smoke-test.ts` — smoke test

## Conventions

- TypeScript ESM, `type: "module"`
- Clean Architecture: domain → application → adapters → presentation
- Use `cac` for CLI parsing and `picocolors` for output
- Use Bun native APIs (`Bun.file`, `Bun.write`, `Bun.spawn`, `Bun.Glob`) instead of `node:*` modules
- Keep files under 250 lines
