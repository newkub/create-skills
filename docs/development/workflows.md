---
title: Workflows
description: Development workflows and slash commands.
---

# Workflows

## Daily development loop

1. Edit source in `src/`
2. Run `bun run dev -- <command>` to test the CLI
3. Run `bun run test` to verify behavior
4. Run `bun run check` for lint, typecheck, and scan
5. Commit with `git commit`

## Quality gates

| Command | Purpose |
|---------|---------|
| `bun run lint` | Biome lint and format check |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run scan` | `ast-grep scan` |
| `bun run test` | Bun test runner |
| `bun run build` | bunup bundle |
| `bun run verify` | all of the above in order |

## Slash commands used in this project

The project relies on Devin global skills such as:

- `/follow-create-bun-cli` — Bun CLI conventions
- `/use-bun-native-api` — prefer Bun APIs
- `/follow-create-devin-skills` — skill authoring guidance
- `/update-readme` — README maintenance
- `/update-docs` — VitePress documentation

## Release workflow

1. Update `README.md` and `docs/`
2. Run `bun run verify`
3. Commit and push to `newkub/create-skills`
4. Update parent monorepo submodule pointer if applicable