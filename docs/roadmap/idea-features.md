---
title: Idea Features
description: New and extended feature ideas for create-skills.
---

# Idea Features

This page collects ideas for extending `create-skills` and adding new commands.

## Key Findings

- `create-skills` has solid basics but lacks resilience, onboarding, and quality tools.
- MCP support is limited to stdio; SSE/HTTP transport would expand compatibility.
- Subagent management is manual; priority, queue, and watch are needed for scale.
- The market trend is multi-agent CLI orchestration; most tools use Python/Node, not Bun.
- Opportunity: a Bun-native, fast, zero-install-feel orchestrator.

## Extends

| # | Priority | Impact | Feature | Description | Why | How To | Phase | Effort | Difficult | Scope | Interface | Target | Topics | Deps | Feature Deps | Routing | Components | Types | API | DB | Risk | Breaking | Estimate | MVP Score | KPI | UX/UI |
|---|----------|--------|---------|-------------|-----|--------|-------|--------|-----------|-------|-----------|--------|--------|------|--------------|---------|------------|-------|-----|----|------|----------|----------|-----------|-----|-------|
| 1 | P0 | 🔴 | `run --timeout --retry --exit-code` | รัน CLI พร้อม timeout, retry, กำหนด exit code policy | ปัจจุบัน run ธรรมดา ไม่มี resilience | เพิ่ม option ใน `run` แล้วส่งต่อให้ `process-adapter` | MVP | S | 🟢 | `src/presentation/cli.ts` | cli | dev | orchestration,cli | cac,Bun.spawn | - | `run <cli> -- --timeout 10s` | `RunCommand` | `RunOptions` | `runCommand` | - | 🟡 | no | 1d | 9 | error_rate | 🟢 |
| 2 | P0 | 🔴 | `list --filter --search --json` | ค้นหา skill ด้วย keyword และ output JSON | มี skill 568 ตัว หาไม่สะดวก | เพิ่ม option ใน `list` แล้ว filter ใน `skill-service` | MVP | S | 🟢 | `src/application/skill-service.ts` | cli | dev | search,ux | Bun.Glob | - | `list --search bun --json` | `SkillList` | `ListOptions` | `listAvailableSkills` | - | 🟢 | no | 1d | 9 | time_to_find | 🟢 |
| 3 | P0 | 🔴 | `invoke --format --execute` | แสดง skill ในรูปแบบ JSON/markdown และ run ตาม step | ได้แค่ preview ไม่สามารถนำไปใช้ต่อได้ | แยก renderer ใน `skill-service` และ add `--execute` dry-run | MVP | M | 🟡 | `src/application/skill-service.ts` | cli | dev | automation,productivity | Bun.file | - | `invoke follow-tasks --format json` | `SkillRenderer` | `RenderFormat` | `invokeSkill` | `.devin/skills` | 🟡 | no | 2d | 8 | reuse_rate | 🟡 |
| 4 | P0 | 🔴 | `spawn --priority --queue --template` | สร้าง subagent พร้อม priority, queue, template | ไม่มีการจัดการ subagent เยอะๆ | ขยาย `subagent-service` ให้มี queue metadata | MVP | M | 🟡 | `src/application/subagent-service.ts` | cli | dev | subagent,workflow | Bun.write | - | `spawn reviewer --priority 1 --template code-review` | `SubagentQueue` | `SubagentOptions` | `spawnSubagent` | `.devin/subagents` | 🟡 | no | 2d | 8 | throughput | 🟡 |
| 5 | P0 | 🔴 | `config` command | ตั้งค่า skills dir, mcp config, log level | ทุก path hardcode ไม่ยืดหยุ่น | สร้าง `config` command อ่าน/เขียน `.devin/config.json` | MVP | S | 🟢 | `src/presentation/cli.ts` | cli | dev | config,ux | Bun.file | #6 | `config get globalSkillsDir` | `ConfigCommand` | `Config` | `loadConfig` | `.devin/config.json` | 🟢 | no | 1d | 9 | setup_time | 🟢 |

## New

| # | Priority | Impact | Feature | Description | Why | How To | Phase | Effort | Difficult | Scope | Interface | Target | Topics | Deps | Feature Deps | Routing | Components | Types | API | DB | Risk | Breaking | Estimate | MVP Score | KPI | UX/UI |
|---|----------|--------|---------|-------------|-----|--------|-------|--------|-----------|-------|-----------|--------|--------|------|--------------|---------|------------|-------|-----|----|------|----------|----------|-----------|-----|-------|
| 6 | P0 | 🔴 | `init` command | สร้าง `.devin/mcp.json`, `.devin/skills`, `.devin/subagents` | onboarding ยากต้องสร้างเอง | สร้าง scaffold defaults ผ่าน `init` command | MVP | S | 🟢 | `src/presentation/cli.ts` | cli | dev | onboarding,scaffold | Bun.write | #5 | `init --mcp --subagents` | `InitCommand` | `ProjectScaffold` | `scaffoldProject` | `.devin` | 🟢 | no | 1d | 9 | first_run_success | 🟢 |
| 7 | P0 | 🔴 | `validate` command | ตรวจสอบ skill markdown format, references | skill ผิด format ทำให้ invoke ล้มเหลว | อ่าน `SKILL.md` แล้ว validate frontmatter + sections | MVP | M | 🟡 | `src/domain/skill.ts` | cli | dev | quality,lint | Bun.file | - | `validate` | `SkillValidator` | `ValidationResult` | `parseSkill` | `.devin/skills` | 🟡 | no | 2d | 8 | error_rate | 🟢 |

## Next Action

1. Start with `init` and `config` to set a foundation.
2. Add `run --timeout --retry` and `list --filter`.
3. Implement `validate` and `invoke --execute`.
4. Add MCP transport and queue features in v2.