# Design runner prompt

Fill the `{{...}}` slots and send this as the full prompt to one `best-of-n-runner` subagent.

````text
You are building one complete visual design for Maanav Jajodia's portfolio website, on its own git branch. Other agents are building other designs in parallel ({{OTHER_NAMES}}); yours must look nothing like a generic developer portfolio and nothing like the others.

## Repo and branch

- You are in an isolated git worktree of the portfolio repo (remote: {{REMOTE_URL}}). Start from the latest `main`.
- Work on the branch `design/{{NAME}}`. If your worktree is on an auto-generated branch, run `git checkout -b design/{{NAME}}` (or `git branch -m design/{{NAME}}`) before committing.
- Main repo path, for reading reference files if they are missing from your worktree: {{MAIN_REPO_PATH}}

## Read first, in this order

1. `AGENTS.md`: product rules (pages, facts, deployment). Binding.
2. `.cursor/skills/portfolio-design-branch/SKILL.md`: single-branch workflow. Binding.
3. `.cursor/skills/portfolio-design-fleet/anti-slop.md`: banned patterns and craft guidance. Binding. Read all of it.
4. `content/site.md`: the only copy source.
5. `lib/content.ts`: the typed server-side loader. Use `getSite()` and `getProject()`; do not reparse the markdown.

## Your direction: {{NAME}}

{{DIRECTION_SECTION}}

Research notes for this direction:

{{DIRECTION_NOTES}}

## What you may change

Layout, typography, color, motion, component structure, CSS approach, fonts (via `next/font`), and small dependencies if they earn their weight. You may restructure `app/` components freely.

## What you may not change

- `content/site.md`, or any fact, metric, date, or name. Do not add copy that is not derived from it: no taglines, testimonials, stats, or bios that are not in the file. Short structural labels ("Projects", "Table 1", "Gate 2") are fine.
- The page set: `/`, `/projects`, `/projects/[slug]` for each project, `/experience` (Systems and AI Lab featured first, then Leadership), `/interests` only when interests exist, and the resume link to `identity.resumeHref`.
- Deployment: server-rendered Next.js on Vercel. Never set `output: 'export'`. Keep `lib/content.ts` behavior and `next.config.ts` tracing of `content/`.
- The phone number never appears. Goal, demo, and repo blocks stay hidden while unsupplied.

## Quality bar

- Responsive from 360px to 1600px wide. Check mobile layout deliberately; it is not a squeezed desktop.
- Accessible: semantic landmarks, one h1 per page, visible custom focus states, color contrast AA, all motion disabled or reduced under `prefers-reduced-motion`.
- Fast: no heavy animation libraries unless the direction truly needs one; no client components for content that can render on the server.
- Run the self-review checklist in `anti-slop.md` honestly and fix every "no".

## Verify

1. `npm install` (if `node_modules` is missing), then `npx next build`. Must pass with no type errors.
2. `npx next start -p {{PORT}}` and fetch `/`, `/projects`, `/projects/stroke-analysis`, `/projects/flightscope`, `/experience`, and `/Maanav_Jajodia_Resume.pdf`; each must return 200. `/interests` must return 404 while interests are empty. Stop the server when done.
3. If you have browser tools, screenshot the home page at desktop and mobile widths and fix anything broken.

## Finish

- Commit on `design/{{NAME}}` with a message saying why the design exists, for example "Present the portfolio as a museum exhibition so each project reads as one object."
- Push: `git push -u origin design/{{NAME}}`. If push fails for auth reasons, leave the commit in place and say so.
- Do not touch any other branch, and do not merge into `main`.

Reply with: branch name, commit SHA, whether push succeeded, a 2-sentence description of the design, fonts used, the main palette as hex values, and any checklist item you could not satisfy.
````
