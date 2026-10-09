# Design directions

Twelve directions. Each one is a different answer to "what kind of object is this portfolio?" Two directions that end up looking alike have both failed. If a direction drifts toward a generic dark-mode developer site, pull it back to its object.

Font names are starting points. `anti-slop.md` wins if it bans one. Every direction must stay readable for a recruiter skimming for 20 seconds: name, headline, featured role, and projects must be findable without hunting.

## research-editorial

- Object: a published research paper or journal issue.
- Type: a text serif with real italics and small caps (Source Serif 4, Newsreader, EB Garamond). Numerals in old-style for prose, lining in tables.
- Color: warm off-white paper, near-black ink, one muted accent used only for links and figure numbers.
- Layout: abstract block on home, numbered sections (1. Research, 2. Projects), marginalia or sidenotes on wide screens, footnote-style citations for metrics, figure/table captions ("Table 1. SAI Lab results").
- Signature: sidenotes that collapse inline on mobile; a "cite this" block.
- Avoid: faux LaTeX screenshots, parchment textures.

## product-case-study

- Object: an industrial product launch, in the tradition of Braun, Dieter Rams, and Teenage Engineering manuals.
- Type: a tight grotesk with a mono for specs (Archivo, or IBM Plex Sans + Plex Mono).
- Color: light grey body, black, one signal color (safety orange or Braun green) for live elements.
- Layout: each project is a "product" with a model number, a spec table (stack, dates, throughput figures from site.md), and a modular "exploded view" built from CSS shapes showing its architecture layers.
- Signature: spec tables with tabular numerals; knob/switch-like nav states.
- Avoid: glossy 3D renders, glass cards.

## technical-index

- Object: a man page and plain-text directory index.
- Type: one monospace family only (JetBrains Mono, IBM Plex Mono, Berkeley-style alternatives such as Commit Mono or Martian Mono).
- Color: paper white or ink black, no gradients, links underlined.
- Layout: NAME / SYNOPSIS / DESCRIPTION / SEE ALSO sections; dense tables sortable by date; everything fits a 100-character measure.
- Signature: full keyboard navigation (j/k to move, Enter to open, `/` to filter), visible in a footer key legend.
- Avoid: fake terminal windows with traffic-light dots, typing animations, green-on-black.

## swiss-poster

- Object: an International Typographic Style concert poster.
- Type: one neo-grotesk at extreme sizes (Schibsted Grotesk or Hanken Grotesk).
- Color: white, black, one flat red.
- Layout: strict 12-column grid that is visible in structure, huge asymmetric name set flush-left, rotated or vertical labels, numbers as graphic elements (0.79, 96%).
- Signature: the grid itself; section transitions that shift the composition rather than fade.
- Avoid: centered hero, rounded corners.

## field-notebook

- Object: a researcher's bound field notebook from tree-crown survey work.
- Type: a humanist serif or typewriter face for body; a handwriting face only for short annotations.
- Color: cream graph-paper grid drawn in CSS, pencil grey, one ink color (field-book blue or red-pen).
- Layout: dated entries, specimen-label cards for projects, margin annotations that point at metrics, page-number footers.
- Signature: hand-drawn-style SVG underlines and circles around key figures, kept sparse.
- Avoid: coffee stains, torn-paper PNGs, more than one handwriting font.

## cartographic-survey

- Object: a topographic or aerial survey map (ties to the UAV imagery research).
- Type: a condensed sans for labels with letter-spacing, a clean serif for body.
- Color: map palette (contour brown, water blue, vegetation green, paper) used with discipline.
- Layout: home is a map sheet with a legend, scale bar, grid references, and coordinates for Columbus, OH; sections are map regions or inset panels; projects are surveyed "sites".
- Signature: generated SVG contour lines (procedural, not a stock image) and a legend that doubles as navigation.
- Avoid: an interactive slippy map library, Google Maps embeds.

## transit-wayfinding

- Object: airport and transit signage (ties to FlightScope).
- Type: a signage sans with high legibility (Atkinson Hyperlegible, Public Sans, or similar), plus a split-flap or dot-matrix treatment for headers.
- Color: signage black and yellow, or dark navy with white, with one route color per section.
- Layout: a departures board listing roles and projects with dates as "times" and status columns; pictogram-style section markers; gate numbers as section numbers.
- Signature: split-flap character animation on headings, triggered once and respecting reduced motion.
- Avoid: airplane emoji, boarding-pass gimmick cards for everything.

## risograph-zine

- Object: a two-color risograph-printed zine.
- Type: a chunky display face with personality paired with a plain body face.
- Color: two spot inks that overprint (fluorescent pink + federal blue, or yellow + teal) using `mix-blend-mode: multiply`, plus paper.
- Layout: cut-and-paste collage, rotated blocks, halftone dot patterns via CSS/SVG, slight misregistration offsets, page-spread pagination.
- Signature: real overprint color mixing where shapes overlap.
- Avoid: grunge textures from stock packs, unreadable rotated body text.

## museum-placard

- Object: a quiet gallery or museum exhibition.
- Type: a refined sans or serif at small sizes for placards, very large for the exhibit title.
- Color: gallery white walls, warm grey, near-black, almost no accent.
- Layout: each project and role is an "exhibit" with a placard (title, dates, medium = stack, accession number), enormous whitespace, one object per viewport.
- Signature: placard typography and measured pacing; abstract generated artwork as the "object" for each project.
- Avoid: dark luxury gold, parallax galleries.

## broadsheet-newspaper

- Object: a broadsheet newspaper front page.
- Type: a high-contrast headline serif, a text serif for columns, a small sans for datelines.
- Color: newsprint off-white, black, optional single spot color.
- Layout: masthead with edition date, multi-column grid with column rules, headlines and decks for each role/project, jump lines ("continued on Projects"), a sidebar index.
- Signature: real multi-column text flow with column rules and hyphenation.
- Avoid: fake ads, "Breaking News" banners.

## web-brutalist

- Object: raw, honest HTML in the tradition of early web documents and brutalist web design.
- Type: system font stack or Times/Arial defaults chosen on purpose, set big.
- Color: default-blue underlined links, visited purple, black on white, one loud background block.
- Layout: visible borders and tables, no hover polish, content first, page weight under 50 KB of CSS/JS.
- Signature: deliberate rawness with exacting spacing; it should read as a decision, not laziness.
- Avoid: neo-brutalist SaaS (thick shadows, pastel cards); that pattern is now its own cliché.

## kinetic-type

- Object: a motion-led type specimen where typography is the only graphic.
- Type: one variable font with wide axes (Fraunces, Recursive, Roboto Flex, or Anybody) animated on weight, width, or slant.
- Color: two colors only, high contrast, can be dark or light.
- Layout: full-viewport typographic scenes, scroll-driven axis changes, metrics that animate their own glyphs.
- Signature: scroll-linked variable-font motion via CSS scroll-driven animations or a small client component; static and fully readable with `prefers-reduced-motion`.
- Avoid: GSAP-heavy scroll hijacking, cursor followers, marquee strips of skills.
