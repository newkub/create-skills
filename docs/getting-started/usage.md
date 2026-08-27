---
title: Usage
description: Common usage examples for create-skills.
---

# Usage

## Run a CLI

```bash
create-skills run bun -- --version
```

Everything after `--` is passed to the target CLI.

## Call an MCP server

Requires `.devin/mcp.json`:

```bash
create-skills call my-server --tool list-tools
```

You can also pass tool parameters:

```bash
create-skills call my-server --tool do-thing --params '{"key":"value"}'
```

## Spawn and delegate to subagents

```bash
create-skills spawn agent-1 --task "review README"
create-skills delegate-to agent-1 --message "start review"
```

## Invoke a skill

```bash
create-skills invoke follow-create-bun-cli
create-skills invoke follow-create-devin-skills --local
```

## List skills

```bash
create-skills list
```

## Use as a library

```typescript
import { runCommand, callMcp, invokeSkill } from "@wrikka/create-skills";
import { createLogger } from "@wrikka/create-skills";

const logger = createLogger();

await runCommand("bun", ["--version"], logger);
const result = await callMcp("my-server", "list-tools", {}, logger);
```