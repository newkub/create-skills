---
title: Architecture
description: Architecture and conventions for create-skills.
---

# Architecture

`create-skills` follows **Clean Architecture** with four layers.

## Layer Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│  Presentation                                               │
│  src/presentation/cli.ts (cac + picocolors)                 │
├─────────────────────────────────────────────────────────────┤
│  Application                                                │
│  skill-service.ts, subagent-service.ts                      │
├─────────────────────────────────────────────────────────────┤
│  Adapters                                                   │
│  process-adapter.ts (Bun.spawn, MCP stdio)                  │
├─────────────────────────────────────────────────────────────┤
│  Domain                                                     │
│  skill.ts (parsing, path resolution)                        │
├─────────────────────────────────────────────────────────────┤
│  Shared                                                     │
│  types.ts, logger.ts, config.ts                             │
└─────────────────────────────────────────────────────────────┘
```

## Directory Layout

```text
src/
├── index.ts                 # public API exports
├── presentation/
│   └── cli.ts               # cac CLI wiring
├── application/
│   ├── skill-service.ts     # invoke/list logic
│   └── subagent-service.ts  # spawn/delegate logic
├── adapters/
│   └── process-adapter.ts   # run and MCP adapters
├── domain/
│   └── skill.ts             # skill parsing and discovery
├── shared/
│   ├── types.ts             # TypeScript interfaces
│   ├── logger.ts            # console logger
│   └── config.ts            # paths and constants
└── test/
    └── cli.test.ts          # bun:test suites
```

## Conventions

- TypeScript ESM with `type: "module"`
- Keep files under 250 lines
- Use Bun native APIs instead of `node:*` modules
- Domain logic is pure and side-effect free
- Application layer orchestrates adapters and domain
- Presentation layer owns CLI wiring and output
