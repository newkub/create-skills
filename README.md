# create-skills

> Devin skill orchestration CLI

`create-skills` is a small, zero-runtime-dependency CLI for orchestrating Devin skills, MCP servers, subagents, and other CLI tools.

## Get Started

```bash
bun run src/presentation/cli.ts -- --help
```

## Features

| Feature | Description |
|---------|-------------|
| `run <cli>` | Run any CLI with extra arguments |
| `call <mcp>` | Call an MCP server tool over stdio |
| `spawn <subagent>` | Create a new subagent task |
| `delegate-to <subagent>` | Send a task to an existing subagent |
| `invoke <skill>` | Load and preview a skill's `## Execute` section |
| `list` | List local and global skills |

## Usage

### Run a CLI

```bash
create-skills run bun -- --version
```

### Call an MCP server

Requires `.devin/mcp.json`:

```json
{
  "my-server": {
    "command": "npx",
    "args": ["-y", "@example/mcp-server"]
  }
}
```

```bash
create-skills call my-server --tool list-tools
```

### Spawn and delegate subagents

```bash
create-skills spawn agent-1 --task "review README"
create-skills delegate-to agent-1 --message "start review"
```

### Invoke a skill

```bash
create-skills invoke follow-create-bun-cli
create-skills invoke follow-write-devin-skills --local
```

## Project

- **Goal**: Provide a single CLI for running CLIs, calling MCPs, managing subagents, and invoking skills.
- **Scope**: Bun + TypeScript CLI with Clean Architecture.
- **Tech Stack**: Bun, TypeScript, `bunup`

## Development

```bash
bun run dev       # run CLI in dev mode
bun run build     # build with bunup
bun run test      # run tests
bun run scripts/smoke-test.ts  # smoke test
```

## License

MIT
