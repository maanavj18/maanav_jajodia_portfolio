# Portfolio

Company-facing site for Maanav Jajodia. Audience is software engineering and ML/research hiring, without locking the story to one industry.

Facts live in `content/site.md`. The cross-chat source of truth is the personal `career-profile` skill (`profile.md`). If a fact changes, update that profile first, then `content/site.md`.

## Stack

- Next.js App Router, deployed on Vercel.
- The production app is server-rendered on Vercel's Node runtime. Do not set `output: 'export'`. Do not target GitHub Pages or any static-only host.
- Pages and project data load on the server from `content/site.md`. Interactive demos, when URLs or embeds exist, use Server Components or Route Handlers on that same runtime.
- Local preview is `next dev`. A production check is `next build`, the default Next.js build Vercel runs.

## Pages

- Home: name, headline, email, GitHub, resume link.
- Projects index and one detail page per project slug.
- Experience: Systems and AI Lab is the featured role. Leadership follows it.
- Interests: render only when `interests` is non-empty.
- Resume: link `contact.resumeHref`. The PDF is copied into `public/Maanav_Jajodia_Resume.pdf` when the app is scaffolded. Leave the original file in place.

Headline to use until Maanav replaces it:

> Computer Science and Engineering student at Ohio State, specializing in AI, with research in the Systems and AI Lab.

## Facts

- Render text from `content/site.md`. Do not invent metrics, dates, employers, coursework, or links.
- Goal, demo URL, and repo URL stay "not supplied" until Maanav provides them. Omit those blocks until then.
- Do not add public GitHub repos that are absent from the resume.
- Do not publish the phone number. Public contact is email and GitHub.
- Hide a section when its list is empty.

## Design branches

Each UI is a git branch named `design/<short-name>`, cut from `main` after the Next.js app exists. One subagent per branch. Maanav picks a winner; later rounds branch from that winner.

A design branch may change layout, typography, color, motion, and component structure. It may not change:

- `content/site.md` or any metric, date, or name in it
- the page set above
- the Vercel / server-rendered Next.js deployment

First round: the twelve directions in `.cursor/skills/portfolio-design-fleet/directions.md`, one branch each (`design/research-editorial`, `design/product-case-study`, `design/technical-index`, and nine more).

Read `.cursor/skills/portfolio-design-branch/SKILL.md` before building a branch, and `.cursor/skills/portfolio-design-fleet/anti-slop.md` before making any visual decision. To run a whole round, follow `.cursor/skills/portfolio-design-fleet/SKILL.md`.
