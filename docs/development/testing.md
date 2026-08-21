---
title: Testing
description: Testing strategy for create-skills.
---

# Testing

## Unit tests

`test/cli.test.ts` uses `bun:test` and covers:

- Skill content parsing
- Skill listing
- Skill path resolution

```bash
bun run test
```

## Smoke test

`scripts/smoke-test.ts` exercises the CLI end-to-end:

- `list`
- `spawn`
- `run` with a safe Bun command

```bash
bun run scripts/smoke-test.ts
```

## Coverage

```bash
bun run test:coverage
```

## Manual verification

```bash
bun run build
./dist/presentation/cli.js --help
```
