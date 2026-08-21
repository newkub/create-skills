---
title: Installation
description: Install create-skills globally or in your project.
---

# Installation

`create-skills` is a Bun package published as `@wrikka/create-skills`. You can install it globally, in a project, or run it directly with `bunx`.

## Requirements

- [Bun](https://bun.sh) >= 1.3.14
- A `.devin/` workspace if you want local skills or subagents

## Install globally

```bash
bun add -g @wrikka/create-skills
```

After installation the `create-skills` command is available:

```bash
create-skills --help
```

## Install in a project

```bash
bun add --dev @wrikka/create-skills
```

## Run without installing

```bash
bunx @wrikka/create-skills --help
```

## Optional: configure MCP servers

Create `.devin/mcp.json` if you want to call MCP servers:

```json
{
  "my-server": {
    "command": "npx",
    "args": ["-y", "@example/mcp-server"]
  }
}
```

## Optional: local skills

Place skill files in `.devin/skills/<name>/SKILL.md` to make them discoverable by the `invoke` and `list` commands.
