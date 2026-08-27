---
name: @wrikka/create-skills
description: Devin skill orchestration CLI - run, call, spawn, delegate, and invoke
related:
  - follow-create-devin-skills
  - follow-skills-map
  - improve-codebase
  - optimize-codebase
  - ask-me
---

## Goal

Agent guidance for the `@wrikka/create-skills` workspace.

## Scope

This workspace lives in `apps/cli/create-skills` within the monorepo.

## Execute

Run the following scripts from `apps/cli/create-skills`:

| Script | Command |
|---|---|
| `dev` | `bun run src/presentation/cli.ts` |
| `build` | `bunup` |
| `build:watch` | `bunup --watch` |
| `typecheck` | `tsc --noEmit` |
| `typecheck:watch` | `tsc --noEmit --watch` |
| `lint` | `biome check` |
| `lint:fix` | `biome check --write` |
| `format` | `biome check --write` |
| `test` | `bun test` |
| `test:watch` | `bun test --watch` |
| `test:coverage` | `bun test --coverage` |
| `scan` | `ast-grep scan` |
| `check` | `bun run lint && bun run typecheck && bun run scan` |
| `verify` | `bun run check && bun run test && bun run build` |
| `dev:docs` | `bunx --bun vitepress dev docs` |
| `build:docs` | `bunx --bun vitepress build docs` |
| `preview:docs` | `bunx --bun vitepress preview docs` |
| `clean` | `bunx rimraf dist node_modules` |
| `deps:analyze` | `bunx depcheck` |

### Architecture

| Tech | Skill |
|---|---|
| (external) | `tech: /learn-from-web` |
| bunup | `tech: /follow-bunup` |

### Skills

- follow-create-devin-skills
- follow-skills-map
- improve-codebase
- optimize-codebase
- ask-me

### Workspaces

- No direct workspace dependencies.

## Rules

- Keep under 250 lines.
- Map tech stack with `tech: /follow-<skill>`.
- Map workspace dependencies in `uses:`.
- Do not duplicate root conventions.

## Expected Outcome

- `@wrikka/create-skills` AGENTS.md is accurate and committed.
