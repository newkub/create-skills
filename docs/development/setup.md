---
title: Setup
description: Development environment setup for create-skills.
---

# Development Setup

## Clone and install

```bash
git clone git@github.com:newkub/create-skills.git
cd create-skills
bun install
```

## Run in dev mode

```bash
bun run dev -- --help
```

## Build

```bash
bun run build
```

The build outputs to `dist/` and bundles `cac` and `picocolors` so the published package has zero runtime dependencies.

## Test

```bash
bun run test
```

## Run all checks

```bash
bun run check       # lint + typecheck + ast-grep scan
bun run verify      # check + test + build
```
