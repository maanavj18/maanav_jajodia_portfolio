---
name: portfolio-design-branch
description: >-
  Builds one portfolio UI on its own git branch for the Vercel-hosted Next.js
  site. Use when creating or revising a design branch, comparing layouts, or
  launching a subagent to design the portfolio.
---

# Portfolio design branch

Read [AGENTS.md](../../../AGENTS.md) and use `content/site.md` as the only copy source. Follow the personal `career-profile` skill if a fact is unclear. Do not invent facts.

## Workflow

1. Confirm `main` already contains the Next.js App Router app and `content/site.md`.
2. Create or check out `design/<short-name>` from `main`. Use a direction name from [../portfolio-design-fleet/directions.md](../portfolio-design-fleet/directions.md) unless Maanav names another.
3. Change presentation only: layout, type, color, motion, components. Follow [../portfolio-design-fleet/anti-slop.md](../portfolio-design-fleet/anti-slop.md).
4. Keep server rendering. Do not set `output: 'export'` or add a static-host config. The app must stay deployable on Vercel with the default Next.js build.
5. Load copy from `content/site.md` on the server. Leave that file unchanged.
6. Build every page in AGENTS.md. Skip interests when none are listed. Skip goal, demo, and repo blocks while they say "not supplied".
7. Verify in the browser with `next dev`: home, both project pages, experience, and the resume link target. Then run `next build`.

One subagent owns one branch. Do not edit another design branch in the same task.
