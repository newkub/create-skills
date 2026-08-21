---
layout: home

title: create-skills
hero:
  name: create-skills
  text: Orchestrate skills, MCPs, and subagents
  tagline: A Bun-native CLI for running CLIs, calling MCP servers, managing subagents, and invoking Devin skills.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View Features
      link: /project/features
features:
  - title: CLI Orchestration
    details: Run any CLI with extra arguments from a single command.
  - title: MCP Support
    details: Call MCP server tools over stdio with JSON-RPC.
  - title: Subagent Management
    details: Spawn and delegate tasks to subagents using file-based inboxes.
  - title: Skill Invocation
    details: Discover and preview Devin skills from local or global directories.
  - title: Clean Architecture
    details: Domain, application, adapters, and presentation are clearly separated.
  - title: Bun Native
    details: Uses Bun APIs instead of node:* modules.
---

## What is create-skills?

`create-skills` is a small, fast CLI that brings together the tools used by Devin and other AI coding agents: **skills**, **MCP servers**, **subagents**, and ordinary **CLI programs**. It is built with **Bun**, **TypeScript**, **cac**, and **picocolors**, and bundles to **zero runtime dependencies**.

Use it to run a tool, call an MCP server, start a subagent, or quickly look up a skill's `## Execute` section.
