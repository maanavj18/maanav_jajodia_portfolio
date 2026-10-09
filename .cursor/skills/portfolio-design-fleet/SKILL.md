---
name: portfolio-design-fleet
description: >-
  Orchestrates a round of many distinct portfolio UIs: one research subagent
  on AI-slop UI patterns, then one isolated subagent per design branch, then
  push and Vercel preview deploys. Use when Maanav asks for multiple portfolio
  designs, a new design round, ten or more UIs, or wants every design deployed.
disable-model-invocation: true
---

# Portfolio design fleet

Runs a full design round for the Next.js portfolio. Each design subagent follows the single-branch rules in [../portfolio-design-branch/SKILL.md](../portfolio-design-branch/SKILL.md); this skill adds research, fan-out, and deploy.

Files in this skill:

- [directions.md](directions.md): the design directions, one per branch.
- [anti-slop.md](anti-slop.md): research output. Banned patterns, overused fonts, per-direction references, self-review checklist.
- [runner-prompt.md](runner-prompt.md): prompt template for each design subagent.

## Workflow

```
- [ ] 1. Preflight main
- [ ] 2. Research (refresh anti-slop.md if missing or older than this round)
- [ ] 3. Commit and push main
- [ ] 4. Launch one design subagent per direction
- [ ] 5. Review results against each other
- [ ] 6. Push branches and collect preview URLs
- [ ] 7. Report to Maanav
```

### 1. Preflight main

`main` must contain the Next.js App Router app, `lib/content.ts` (server-side parser for `content/site.md`), every page in AGENTS.md, and `public/Maanav_Jajodia_Resume.pdf`. Run `npx next build` on `main`. Fix main before any branch is cut; design branches must not each repair the same base bug.

### 2. Research

Launch one `generalPurpose` subagent with web access. It reads `directions.md` and writes `anti-slop.md` with five sections: banned patterns, overused fonts, what distinctive sites do instead, per-direction notes with verified reference URLs and font pairings, and a self-review checklist. It must cite only sources it actually found. Run it in the background while doing preflight.

Skip this step if `anti-slop.md` exists and Maanav did not ask for fresh research.

### 3. Commit and push main

Commit the skill files (including `anti-slop.md`) to `main` and push so every branch inherits them.

### 4. Launch design subagents

- One `best-of-n-runner` subagent per direction, all launched in a single message with `run_in_background: true`. Each runs in its own git worktree, so branches never collide.
- Fill [runner-prompt.md](runner-prompt.md) for each direction. Paste the direction's section from `directions.md` and its per-direction notes from `anti-slop.md` into the prompt; also give the absolute paths so the runner can read both files in full.
- Give every runner a unique dev port (3101, 3102, ...) so parallel `next dev` and `next start` servers don't clash.
- Branch name is `design/<direction-name>`.

### 5. Review

When runners finish, compare them side by side. Two designs that share a layout skeleton, palette family, or font have failed the round; resume the weaker runner with a specific correction. Run the self-review checklist from `anti-slop.md` against any result that looks generic.

### 6. Push and deploy

Push every `design/*` branch to `origin`. If the GitHub repo is connected to Vercel, every pushed branch gets its own preview deployment automatically; find each URL in the commit status on GitHub (`https://api.github.com/repos/<owner>/<repo>/commits/<branch>/status`, context `Vercel`). If the repo is not connected, Maanav imports it once at vercel.com/new (framework preset Next.js, no overrides); the branches then deploy on their next push. Never set `output: 'export'` to make deployment easier.

### 7. Report

One line per branch: name, one-sentence concept, preview URL or "not deployed". Then the two or three strongest, with a reason each.

## Rules

- `content/site.md` is read-only for every subagent. No invented facts, metrics, links, or testimonials.
- One subagent owns one branch.
- Later rounds branch from the winner Maanav picks; add new sections to `directions.md` for them instead of rewriting the old ones.
