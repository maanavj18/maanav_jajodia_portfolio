# Maanav Jajodia — Portfolio

Personal site for software engineering and machine learning research roles. Pages are server-rendered from [`content/site.md`](content/site.md) with the Next.js App Router and deployed on Vercel.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Name, headline, email, GitHub, resume, featured research, education, and projects |
| `/projects` | Project index |
| `/projects/[slug]` | One project (slug is the `###` heading in `content/site.md`) |
| `/experience` | Research first, then leadership |
| `/interests` | Shown only when the Interests list has at least one item |
| `/Maanav_Jajodia_Resume.pdf` | Resume PDF in `public/` |

Public contact is email and GitHub. The phone number is left out on purpose.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build, the same one Vercel runs
npm start       # serve that build
```

## Edit the site

Facts live in [`content/site.md`](content/site.md). The app reads that file on the server in [`lib/content.ts`](lib/content.ts). Change the markdown, then refresh; do not hard-code copy into components.

The file is a small outline, not free-form Markdown:

- `##` starts a section: Identity, Education, Experience, Leadership, Projects, Interests, Skills.
- `###` starts an entry. The heading is the slug used in URLs (`sai-lab`, `stroke-analysis`).
- `- Label: value` is a field. Labels are case-insensitive.
- A `-` line without a label is a bullet.

Fields named Goal, Demo URL, and Repo URL are omitted from the page while their value is `not supplied`. Replace that text with a real value to show the block. An empty Interests list hides `/interests` and its nav link.

The resume link is `Resume href` under Identity. The file it points at is [`public/Maanav_Jajodia_Resume.pdf`](public/Maanav_Jajodia_Resume.pdf). Replace that PDF when the resume changes, and keep the path in `content/site.md` in sync.

## Deploy

The production app runs on Vercel’s Node runtime. Leave `output: 'export'` unset so pages stay server-rendered. `next.config.ts` includes `content/` in the server file trace so `site.md` is available at runtime.

Pushing `main` to the connected Git repository is enough for Vercel to build with `next build`.
