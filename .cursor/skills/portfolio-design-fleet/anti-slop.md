# Anti-slop rules for portfolio design branches

Read this before you write any UI. `directions.md` tells you what object your branch is. This file tells you what you may not ship. When a font or pattern is banned here, that ban beats `directions.md`. A banned pattern is allowed only when section 4 names it as part of your direction's object.

Why defaults leak: models sample the high-probability center of web design (Anthropic calls this "distributional convergence"). Words like "premium" or "unique" just pull a different average from the same pool. Only concrete constraints move you off it. If two of the twelve branches look alike, both have failed.

## 1. Banned patterns

Check the rendered page, not what you meant to build. Adrian Krebs scored 1,590 Show HN pages against 16 tells and counted 4 or more as heavy slop. Your target is zero.

### Type
- [ ] Any font on the section 2 banned list, including as body text under a distinctive display face.
- [ ] One serif italic "accent" word inside an otherwise sans hero headline.
- [ ] A timid scale: neighboring sizes within 1.2x everywhere (16/18/20/24) and only weights 400 vs 600.
- [ ] Title Case On Every Heading.
- [ ] A small uppercase, letter-spaced (often mono) eyebrow label above every section heading.
- [ ] Faux styles: browser-synthesized bold, italic, or small caps. Set `font-synthesis: none` and load the real styles.

### Color and surface
- [ ] Violet or indigo near the primary color: `#7c3aed`, `#6366f1`, Tailwind `violet-*`, `indigo-*`, `purple-*`, or any purple-to-blue or cyan-to-violet gradient.
- [ ] Gradient text (`bg-clip-text text-transparent`) on any heading.
- [ ] Untouched Tailwind/shadcn palette names in code (`slate-*`, `zinc-*`, `gray-*`, `blue-600` buttons). Define your own CSS variables named after your object (`--ink`, `--paper`, `--contour`).
- [ ] Dark-by-default with mid-grey body text and one neon accent. Any body text below 4.5:1 contrast.
- [ ] Glassmorphism: `backdrop-blur` on cards or navbars.
- [ ] Colored glows, colored `box-shadow`, or blurred gradient blobs and orbs behind content.
- [ ] Component-library spectacle: aurora, spotlight, beams, meteors, sparkles, 3D marquee, shimmer borders. Aceternity's own docs call its original spotlight "used a bit too much these days."
- [ ] A decorative dot-grid or line-grid background. Exception: the grid is the object's material (graph paper, map grid, a visible column grid) and content aligns to it.
- [ ] Sparkle (✨) icons or "AI" glyphs used as decoration.

### Components and layout
- [ ] Centered hero: a pill badge above the H1, centered headline and subhead, two equal pill buttons.
- [ ] A `h-screen`/`100vh` hero that ignores the header height, or that pushes name, headline, and role below the fold on a 1366×768 screen.
- [ ] Three or four equal cards with an icon on top, especially icons inside rounded squares.
- [ ] Icon-library imports (`lucide-react`, `@heroicons/*`, `react-icons`) or emoji used as bullets, section icons, or nav icons. Draw the few glyphs you need as SVG in your object's visual language, or use none.
- [ ] `rounded-2xl` + `shadow-lg`/`shadow-xl` cards as the default container, or cards inside cards. Test: if removing the border, background, radius, and shadow loses no meaning, it should not be a card.
- [ ] A colored top or left border stripe on cards or blockquotes. A designer Krebs quoted called it "almost as reliable a sign of AI-generated design as em-dashes for text."
- [ ] A bento grid of unequal tiles for projects or skills.
- [ ] A stat banner ("3+ projects", "10K+", "99.9%") or any round invented figure.
- [ ] Decorative "01 / 02 / 03" or "Step 1, 2, 3". Numbers are allowed only as real identifiers that are referenced elsewhere: section numbers cited in text, model numbers, gate numbers, accession numbers.
- [ ] A vertical experience timeline made of dots on a line. Exception: a transit strip map whose stops are real entries.
- [ ] Skill progress bars, percentages, star ratings, or a wall of technology logos or chips.
- [ ] Testimonial carousels, "trusted by" logo strips, marquees, or any carousel without a narrative reason.
- [ ] Browser-window or phone mockup frames in a split hero.
- [ ] A fake terminal: traffic-light dots, blinking cursor, `$ whoami`, green on black.
- [ ] A four-column footer, "Built with ❤️", or a social-icon row as the only contact.
- [ ] A contact form. Public contact is email and GitHub only.
- [ ] Decorative 3D (Three.js `OrbitControls` objects, floating shapes).
- [ ] Metronome rhythm: every section has the same `py-24`, the same `max-w-7xl`, and the same heading, paragraph, button.

### Motion
- [ ] Fade-up-on-scroll on every block, or one `ease-in-out 0.3s` used for everything.
- [ ] Typewriter, typing, or text-scramble effects on the name or headline.
- [ ] Cursor followers, custom cursor blobs, magnetic buttons.
- [ ] Scroll hijacking (Lenis or Locomotive smooth scroll, scroll-jacked pinned sections), or autoplaying sound or video.
- [ ] Any animation without a `prefers-reduced-motion: reduce` path that leaves all content visible and final.

### Copy (labels, captions, alt text, and empty states count too)
- [ ] "Hi, I'm Maanav 👋", "Welcome to my portfolio", or any greeting as the opener.
- [ ] passionate, crafting, pixel-perfect, seamless, cutting-edge, innovative, transformative, leverage, elevate, unlock, delve, tapestry, vibrant, landscape, realm, pivotal, ever-evolving, "modern, scalable, performant", "in today's fast-paced world".
- [ ] Vague CTAs: "Get Started", "Learn More", "Let's build something amazing together".
- [ ] More than one em dash per paragraph, or em dashes used for fake punch in a tagline. Use periods and commas.
- [ ] Reflexive lists of exactly three adjectives ("fast, reliable, and scalable").
- [ ] Any metric, date, role, employer, or link that is not in `content/site.md`. No "coming soon" sections; hide empty ones.
- [ ] A failed name-swap test: if another CS student could paste their name over the hero and publish it unchanged, rewrite it with specifics from `site.md` (UAV imagery, tree-crown segmentation, MediaPipe, the actual numbers).

## 2. Overused fonts

Evidence: Keifont's scan of 6,925 sites puts Inter on 17.7% of them, followed by Geist (5.0%), Geist Mono (3.9%), JetBrains Mono (3.2%), Poppins, DM Sans, Montserrat, Manrope, IBM Plex Mono, and Roboto. The most common pairings are Geist + Geist Mono and Inter + JetBrains Mono. Krebs' designers named Space Grotesk, Instrument Serif, and Geist as the recurring LLM combinations. Anthropic's widely copied frontend prompt recommends Space Grotesk, JetBrains Mono, Playfair Display, IBM Plex, Bricolage Grotesque, and Newsreader, so Claude-based agents now converge on those too.

**Banned. Do not load these.**

| Font | Why it reads as templated |
|---|---|
| Inter | 17.7% of sites; the default LLM pick |
| Geist, Geist Mono | Vercel/Next.js/shadcn default; numbers 2 and 3 by usage |
| Roboto, Open Sans, Lato, unchosen Arial/Helvetica | Android, Bootstrap, and template defaults; on Anthropic's own ban list |
| Montserrat, Poppins | Wix and Squarespace template fonts |
| DM Sans, DM Mono, Manrope, Plus Jakarta Sans, Outfit, Sora | the startup-SaaS sans cluster; often paired with Inter |
| Space Grotesk | the model's "edgy default"; Anthropic warns the model drifts back to it |
| Instrument Serif, Instrument Sans | the "premium SaaS" default, including the italic accent-word trick |
| Satoshi, Clash Display | the default "designer portfolio" picks from Fontshare |
| Playfair Display, Cormorant Garamond | the default "elegant serif" in templates |

**Caution. Use only if section 4 assigns it to your direction.** JetBrains Mono, IBM Plex Sans and Mono, Space Mono (the code-aesthetic defaults); Bricolage Grotesque, Newsreader, Fraunces (pushed by copied AI design prompts and rising fast). `directions.md` lists several of these as starting points; use the section 4 pick instead.

## 3. What distinctive sites do instead

1. **One object, one layout primitive, repeated.** Clean sites pick one strong layout primitive and repeat it until it becomes the signature. Pick yours (spec table, placard, departures row, map inset) and set every role and project in it.
2. **Real content is the visual.** Set the actual figures from `site.md` at display size with units and captions. Let project names and metrics carry the page. A decorative gradient or abstract shape is not a visual idea.
3. **A type scale with intent.** Choose a ratio and write it as tokens: about 1.2 for dense index or table directions, 1.333 to 1.5 for editorial, and a jump of 3x or more between body and display for poster and kinetic directions. Use extreme weights (100/200 against 800/900), not 400 against 600. Use two families at most; one is often better.
4. **Measure.** Keep body text at 45 to 90 characters per line (Butterick). Put `max-width: 60ch` to `72ch` on prose blocks, not on the whole page.
5. **Rhythm.** Derive spacing from the body line-height (for example, 17px × 1.5 gives a 25.5px unit; space in multiples of it). Keep spacing tight inside a group and wide between groups. Uniform 8px everywhere is not rhythm.
6. **Grid tension.** Use asymmetric splits (5/7 or 3/9 of 12), flush-left ragged-right text, and labels, numbers, or notes that hang into the margin. Center one element on purpose, never by default.
7. **Restrained color.** One ground, one ink, and one accent with exactly one job (links, live state, or figure numbers). Name every token after where it comes from (`--riso-federal-blue: #3D5588`). Pick light or dark for your direction; a theme toggle is not a substitute for deciding.
8. **Typographic details** (all checkable in DevTools):
   - `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs (Chrome 117+, harmless elsewhere).
   - `font-variant-numeric: tabular-nums` on tables, dates, and metric columns; `oldstyle-nums` in serif prose; `lining-nums` in headings.
   - `font-variant-caps: all-small-caps` for acronyms (CSE, UAV, ML), but only when the font has real `smcp`/`c2sc`. Check at wakamaifondue.com. Google Fonts files can drop OpenType features, so when you need them, download the foundry files and load them with `next/font/local`.
   - `hanging-punctuation: first last` works only in Safari. Add it as an enhancement, and use a negative `text-indent` on pull quotes that open with a quote mark.
   - Use curly quotes and apostrophes (’ “ ”), en dashes for ranges (2024–2025), × for dimensions, and `&nbsp;` between a number and its unit.
   - Style links with tuned `text-decoration-thickness` and `text-underline-offset`. Keep a visited state wherever the object allows one.
   - Set `font-optical-sizing: auto` for fonts with an `opsz` axis. Set `hyphens: auto` with `<html lang="en">` on justified or multi-column text.
9. **Custom focus states.** Style `:focus-visible` in the object's language (an ink outline with offset, a highlighter block, an inverted placard). Never remove it. Add a skip link to main content.
10. **Motion with meaning.** One orchestrated moment beats scattered micro-interactions. Every motion should report something: a sort, a filter, a flap settling on a value, an axis following scroll position. Prefer CSS transitions and scroll-driven animations (`animation-timeline: view()`) over JS libraries. Under reduced motion, render the final state.
11. **The 20-second path.** Name, headline, the Systems and AI Lab role, and both projects are visible, or one obvious step away, in the first viewport at 1366×768 and at 390×844. Distinctive never means hidden.
12. **Fonts in Next.js.** Use `next/font/google` for Google families, loading only the weights and axes you use. Use `next/font/local` for Fontshare, Velvetyne, or foundry files, and commit the woff2 files with their license.

## 4. Per-direction notes

### research-editorial
- Refs: Tufte CSS, https://edwardtufte.github.io/tufte-css/ (sidenotes that toggle on mobile through a checkbox); Gwern, "Sidenotes in Web Design," https://gwern.net/sidenote (a comparison of implementations).
- Type: Source Serif 4 alone, using its `opsz` axis for display versus caption sizes (Google Fonts). For true small caps and old-style figures, self-host from https://github.com/adobe-fonts/source-serif. By design, `smcp` switches digits to small-cap figures (issue #125), so exclude digits from small-cap runs.
- Do: number sections and cite them in the text ("see §2"). Put table captions above tables and figure captions below figures. Footnote markers on metrics should link to a sidenote that gives the source.
- Risk: cloning Tufte CSS (ET Book, `#fffff8`, ⊕ toggles). Tufte CSS describes itself as "a starting point, not a design goal." Make the measure, caption system, and cite block your own.

### product-case-study
- Refs: teenage engineering, OP–1 field, https://teenage.engineering/products/op-1 (lowercase voice, dense spec lists, model numbers like "OP–1"); Vitsœ on Dieter Rams' ten principles, https://www.vitsoe.com/us/about/good-design.
- Type: Archivo (Google Fonts; use the `wdth` axis, semi-condensed for labels) with Azeret Mono (Google Fonts; has `tnum` and slashed `zero`) for specs.
- Do: derive model numbers from project slugs. Build spec tables with hairline rules and tabular figures. Use the signal color only for live or interactive elements.
- Risk: an Apple-style launch page (giant centered render, "Introducing", glow) or a bento grid of spec tiles. Specs belong in tables, not tiles.

### technical-index
- Refs: Commit Mono, https://commitmono.com/ (the whole site runs on the keyboard, with the key legend on the page); U.S. Graphics Company, https://usgraphics.com/ ("Dense, not sparse"; "Expose state and inner workings").
- Type: Commit Mono only (OFL; download from commitmono.com and self-host with `next/font/local`), weights 400 and 700. Skip JetBrains Mono and IBM Plex Mono.
- Do: use a real `<table>` with `<th scope>` and `aria-sort`. `/` focuses the filter, `j`/`k` move a visible row cursor, and shortcuts are ignored while an input has focus.
- Risk: hacker-terminal cosplay (green on black, `$ whoami`, a blinking cursor, ASCII banners). A man page is a document, not a shell.

### swiss-poster
- Refs: Swissted, https://www.swissted.com/ (punk concert bills redrawn as International Typographic Style posters).
- Type: Schibsted Grotesk only (Google Fonts, by Bakken & Bæck, 400–900 with italics). Set the name at 900, up to roughly 20vw, with tracking around -0.04em; set body at 400.
- Do: make the 12-column grid visible in the structure through alignment or column rules. Use real figures from `site.md` as graphic elements next to their labels. Set rotated labels with `writing-mode: vertical-rl`. Section changes should shift the composition, not fade it.
- Risk: "Swiss-lite," a bold sans and a red accent dropped into a standard centered container. If the grid is not visible, this is not the direction. Zero border radius.

### field-notebook
- Refs: Smithsonian Field Book Project, https://siarchives.si.edu/about/field-book-project, and its digitized books at https://www.biodiversitylibrary.org/collection/SIFieldbooks. Copy their real entry structure: date, locality, specimen numbers.
- Type: Alegreya for body and Alegreya SC for specimen labels (Google Fonts; a calligraphic humanist serif with true italics). Use Kalam Light or Regular (Google Fonts) only for annotations under about 12 words.
- Do: draw the graph paper with `repeating-linear-gradient`, aligned to the line-height. Draw SVG circles and underlines once with `stroke-dasharray`, on no more than three key figures per page.
- Risk: scrapbook skeuomorphism (tape, polaroids, stains, paper textures) and handwriting used for headings or body text.

### cartographic-survey
- Refs: USGS US Topo Map Symbol Guide, https://www.usgs.gov/ngp-standards-and-specifications/us-topo-map-symbol-guide (brown contours, with heavier labeled index contours; blue water; the contour interval printed under the scale bar). USGS hydrography spec, https://www.usgs.gov/ngp-standards-and-specifications/us-topo-cartographic-specifications-hydrography (water labels are Charis SIL Italic, RGB 101/137/191, with a light halo).
- Type: Barlow Condensed caps (Google Fonts) at +0.08em to +0.12em tracking for labels and the legend. Charis SIL (Google Fonts) for body, with annotations in italic hydrography blue `#6589BF`, as USGS does.
- Do: generate contours on the server (for example, marching squares over seeded noise) and output SVG. Make every fifth line an index contour. The legend is the navigation. Include a real scale bar, and verify the Columbus coordinates rather than estimating them.
- Risk: the trendy topo-lines wallpaper, a static contour texture behind an ordinary site. The contours must form a map with a legend.

### transit-wayfinding
- Refs: Mijksenaar's Schiphol wayfinding, https://www.mijksenaar.com/project/amsterdam-schiphol-airport/ (iconic yellow for primary information, other colors for secondary). NYCTA Graphics Standards Manual (Vignelli and Noorda, 1970), https://standardsmanual.com/products/nyctacompactedition (white on black, route discs in ten colors).
- Type: Atkinson Hyperlegible Next (Google Fonts, 2025, seven weights with italics) for everything people read. Doto (Google Fonts; a 6×10 dot matrix with `wght` and `ROND` axes) only for board headers and times at 24px or larger.
- Do: build the departures board as a real `<table>` whose status values derive from `site.md` dates. Give each color exactly one category, everywhere. For split-flap, render the final text on the server, animate it once on the client, and put the final string in `aria-label`. Reduced motion means no flaps.
- Risk: travel gimmicks (✈ emoji, boarding-pass cards, "Now boarding" copy, navy and gold). Real signage is calm.

### risograph-zine
- Refs: Riso inks on stencil.wiki, https://www.stencil.wiki/wiki/Category:Riso_inks, and Issue Press, https://issue.press/printing/colors. They agree on Fluorescent Pink `#FF48B0`, Riso-Federal Blue `#3D5588`, Yellow `#FFE800`, and Teal `#00838A`.
- Type: Outward (Velvetyne, OFL; self-host) for display only. Velvetyne requires credit, so the colophon must read "Outward by Raoul Audouin, distributed by velvetyne.fr." Karla (Google Fonts) for body.
- Do: put each ink on its own layer with `mix-blend-mode: multiply` over off-white paper (multiply disappears on dark grounds). Misregistration is a fixed 1–3px offset, not jitter. Make halftones with `radial-gradient` or SVG patterns.
- Risk: neo-brutalist SaaS (thick borders, hard offset shadows, pastel rounded cards) or stock grunge. Body text stays straight; only display blocks rotate.

### museum-placard
- Refs: the Getty's museum label guide (PDF), https://www.getty.edu/education/museum_educators/downloads/aaim_completeguide.pdf. Its tombstone order is title, culture, place made, date, media, attribution, dimensions, credit, accession number; labels run 30–140 words. Also Cooper Hewitt's typeface, https://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/.
- Type: Cooper Hewitt only (OFL, by Chester Jenkins for the Smithsonian design museum; self-host from https://github.com/cooperhewitt/cooperhewitt-typeface). Thin or Light at exhibit-title size, Book or Medium on placards.
- Do: fill placard fields in tombstone order (medium = stack). Accession numbers use the museum `YEAR.SEQ` form (`2025.1`), derived from `site.md` dates. Show one exhibit per viewport, plus an index a recruiter can scan in one scroll.
- Risk: luxury minimalism (black and gold, slow parallax, so much whitespace that content needs hunting) or "generative art" that is just a gradient blob. Each project's artwork must be derived from that project's data.

### broadsheet-newspaper
- Refs: Freedom Forum, Today's Front Pages, https://frontpages.freedomforum.org/ (hundreds of current front pages; study the masthead, decks, column rules, and jump lines).
- Type: Libre Caslon Display for headlines, Libre Caslon Text for columns, and Libre Franklin for datelines, bylines, and the index (all Google Fonts, by Impallari Type; Franklin descends from the classic American newspaper grotesque).
- Do: use CSS `columns` with `column-rule`, and `hyphens: auto` with `lang="en"`. Justify only when hyphenation is on. Add `break-inside: avoid` on figures, collapse to one column on mobile, and put the edition date in a `<time>`.
- Risk: costume newspaper (blackletter masthead pastiche, sepia paper, "BREAKING," fake ads, fake weather), or "columns" that are really a card grid with no text flowing between them.

### web-brutalist
- Refs: David Bryant Copeland, Brutalist Web Design, https://brutalist-web.design/ (links are underlined, buttons look like buttons, only links and buttons respond to clicks, the back button works, performance is a feature). Brutalist Websites gallery, https://brutalistwebsites.com/.
- Type: no web fonts. Use `Times, "Times New Roman", serif` or `system-ui`, set large (body 20px or more), and say in a colophon that the choice is deliberate. This is the only direction allowed to use system fonts.
- Do: keep default link colors (the `LinkText`/`VisitedText` system colors), visible table borders, and one loud background block. Measure CSS+JS weight in DevTools (50 KB or less).
- Risk: neo-brutalism (thick borders, offset shadows, pastel cards, rounded corners), which is now its own template. The second risk is real laziness; spacing and line length must be exact.

### kinetic-type
- Refs: Bramus, Scroll-driven Animations, https://scroll-driven-animations.style/. Recursive, https://www.recursive.design/ (glyph widths stay constant across weight, casual, and slant, so animating them causes no reflow). Etcetera Type, Anybody, https://etceteratype.co/pages/anybody (`wdth` 50–150, `wght` 100–900).
- Type: one family. Use Anybody (Google Fonts) if the motion is width, or Recursive (Google Fonts; `MONO`, `CASL`, `wght`, `slnt`, `CRSV`) if the motion is weight, casual, or slant without layout shift. Fraunces is on the caution list.
- Do: drive `font-variation-settings` or `font-stretch` with `animation-timeline: view()` or `scroll()`. Reserve each animated line's box (fixed height, `contain: layout`) so width changes don't shove content around. With reduced motion, or in browsers without scroll timelines, show the readable final state.
- Risk: template award-site motion (Lenis smooth scroll, GSAP SplitText on every heading, a skills marquee, a cursor blob). Use one variable-font idea, applied to the type that matters: the name and the metrics.

## 5. Self-review checklist

Answer every question before you call the design done. Any "no" means fix it first.

1. Did you grep for the banned fonts, `violet|indigo|purple`, `bg-clip-text`, `backdrop-blur`, `rounded-2xl`, `shadow-lg`, `lucide-react`, `heroicons`, `slate-|zinc-`, and emoji, and find none outside a section 4 exception?
2. With the name blurred, could someone who has seen the other eleven branches name your object from a single screenshot?
3. Does the name-swap test pass, meaning the first viewport can't belong to someone else just by changing the name?
4. Within 20 seconds at 1366×768 and at 390px wide, can a reader find the name, headline, Systems and AI Lab role, and both projects?
5. Does every metric, date, name, and link trace back to `content/site.md`, with no invented stats, placeholders, or "coming soon"?
6. Are there at most two font families, each from Google Fonts or self-hosted with its license committed?
7. Is body text at 45–90 characters per line, with display type at least 3× body size somewhere on the page?
8. Are `tabular-nums` on numeric columns, `text-wrap: balance`/`pretty` on headings and paragraphs, and `font-synthesis: none` all in place, with no faux bold, italic, or small caps?
9. Does each color token have one named job, and does all text pass WCAG AA (4.5:1 for body, 3:1 for large text)?
10. Is there one repeated layout primitive, with section spacing deliberately varied rather than identical?
11. Does every animation communicate state or reading order, and does reduced motion show the complete final content?
12. Is every interactive element a real `<a>` or `<button>` with a custom `:focus-visible` style, and can a keyboard reach everything?
13. Did you read all copy aloud and remove greetings, banned words, extra em dashes, and three-adjective lists?
14. Would the design still hold up with every shadow, gradient, and border radius removed?
15. Does `next build` pass without `output: 'export'`, with every font loaded through `next/font`?

## Sources

- Krebs, AI design patterns in Show HN: https://www.adriankrebs.ch/blog/design-slop/
- Anthropic, frontend design skills: https://claude.com/blog/improving-frontend-design-through-skills
- OpenAI, frontend guidance: https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4
- Font usage across 6,925 sites: https://keifont.com/most-used-fonts
- Slop tells and audits: https://github.com/funboy322/avoid-ai-design, https://uxskill.laithjunaidy.com/what-is-ai-slop.html, https://dris1153.github.io/perfect-ui/, https://publishd.app/blog/make-ai-built-site-not-look-ai, https://ui.aceternity.com/components/spotlight-new
- Portfolio anti-patterns: https://renellherisson.com/writing/rewriting-my-portfolio-in-nextjs-16, https://dev.to/zansuken/most-developer-portfolios-get-rejected-in-7-seconds-heres-what-i-learned-fixing-mine-280p
- Copy tells: https://tracysheen.com/resources/ai-words-to-avoid, https://www.7daystolaunch.studio/vibe-coding/ai-slop
- Typography: https://practicaltypography.com/line-length.html, https://developer.chrome.com/blog/css-text-wrap-pretty, https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation
- Galleries for more references: https://www.hoverstat.es/, https://www.siteinspire.com/websites/category/typography, https://www.typewolf.com/google-fonts
