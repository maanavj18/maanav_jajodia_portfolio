import type { Project, Role } from "./content";

export type Figure = { label: string; value: string; source: string };
export type Segment = { text: string; figure: boolean };
export type SpecRow = { label: string; value: string };
export type Parts = { caption: string; kind: "layer" | "component"; items: string[] };

type ModelSource = { slug: string; dates: string; name?: string };
type Curated = { label: string; value: string; source?: string };

// Every value must appear verbatim in the entry's bullets in content/site.md.
// Rows whose source text is missing are dropped at render time.
const FIGURES: Record<string, Curated[]> = {
  "stroke-analysis": [
    { label: "frame rate", value: "30+ FPS" },
    { label: "latency", value: "under 50ms" },
    { label: "landmarks per frame", value: "501", source: "501 pose, face, and hand landmarks per frame" },
    { label: "frame buffer", value: "150+ frames" },
    { label: "rolling window", value: "5-second", source: "5-second rolling window" },
    { label: "assessment modules", value: "Arm Drift and Smile Asymmetry" },
    { label: "drift-scoring landmarks", value: "16", source: "across 16 anatomical landmarks" },
  ],
  flightscope: [
    { label: "travel APIs", value: "3+", source: "from 3+ travel APIs" },
    { label: "routes", value: "500+", source: "across 500+ routes" },
    { label: "price records", value: "50k+", source: "50k+ historical flight price records" },
    { label: "fare-drop alert", value: "15–30% below historical averages" },
  ],
  "sai-lab": [
    { label: "tree-crown segmentation", value: "0.79 F1 at IoU 0.5" },
    { label: "vs. DeepForest baseline", value: "11-point gain", source: "11-point gain over a DeepForest baseline" },
    { label: "CV papers reviewed", value: "50+", source: "50+ CV papers" },
    { label: "tree models compared", value: "10", source: "10 tree models" },
    { label: "HPC job-time reduction", value: "96 percent", source: "Reduced HPC job times by 96 percent" },
    { label: "OSC cluster runs", value: "under the 6-hour walltime" },
    { label: "COCO JSON images verified", value: "20,000+", source: "20,000+ COCO JSON images" },
    { label: "annotations", value: "42,000+", source: "42,000+ annotations" },
  ],
  "ai-club": [
    { label: "annual budget", value: "$8,000+", source: "$8,000+ annual budget" },
    { label: "HackAI prize pool", value: "$5,000+", source: "$5,000+ prize pool" },
    { label: "HackAI builders", value: "100+", source: "100+ builders" },
  ],
  "strategic-academic-services": [
    { label: "K–12 students", value: "10+", source: "10+ K–12 students" },
    { label: "SAT score", value: "1160 to 1480" },
    { label: "chess rating", value: "400+ ELO" },
  ],
};

const COMPONENTS: Record<string, string[]> = {
  flightscope: [
    "flight price data pipeline",
    "PostgreSQL relational database",
    "price trend analysis module",
    "notification engine",
  ],
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const modelNote =
  "Model code: initials from the slug, or from the product name when the slug is a single word, then the year and month the work started.";

export function typographic(text: string): string {
  return text.replace(/'/g, "’").replace(/(\d[\d,.+]*)\s+(?=[A-Za-z])/g, "$1\u00A0");
}

export function isLive(dates: string): boolean {
  return /present\s*$/i.test(dates);
}

export function modelNumber(entry: ModelSource): string {
  const parts = entry.slug.split("-").filter(Boolean);
  let letters: string;
  if (parts.length > 1) {
    letters = parts.map((part) => part[0]).join("");
  } else if (entry.name) {
    const caps = entry.name.match(/[A-Z]/g);
    letters = caps && caps.length > 1 ? caps.join("") : entry.slug.slice(0, 2);
  } else {
    letters = entry.slug.slice(0, 2);
  }
  const start = /([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/.exec(entry.dates);
  if (!start) return letters.toUpperCase();
  const month = MONTHS.indexOf(start[1].toLowerCase()) + 1;
  if (month < 1) return letters.toUpperCase();
  return `${letters.toUpperCase()}–${start[2].slice(2)}${String(month).padStart(2, "0")}`;
}

export function figuresFor(entry: Project | Role): Figure[] {
  const text = entry.bullets.join(" ");
  return (FIGURES[entry.slug] ?? [])
    .map(({ label, value, source = value }) => ({ label, value, source }))
    .filter(({ value, source }) => text.includes(source) && source.includes(value));
}

export function partsFor(project: Project): Parts | undefined {
  const text = project.bullets.join(" ");
  const layered = /((?:modular\s+)?\d+-layer architecture) \(([^)]+)\)/.exec(text);
  if (layered) {
    return {
      caption: layered[1],
      kind: "layer",
      items: layered[2].split(/,\s*/).map((item) => item.trim()).filter(Boolean),
    };
  }
  const named = (COMPONENTS[project.slug] ?? []).filter((item) => text.includes(item));
  if (named.length > 1) return { caption: "components", kind: "component", items: named };
  return undefined;
}

export function projectSpecRows(project: Project): SpecRow[] {
  const parts = partsFor(project);
  const rows: SpecRow[] = [
    { label: "model", value: modelNumber(project) },
    { label: "dates", value: project.dates },
    { label: "stack", value: project.stack.join(", ") },
  ];
  if (parts) {
    rows.push({
      label: parts.kind === "layer" ? "architecture" : "components",
      value: parts.items.join(", "),
    });
  }
  for (const figure of figuresFor(project)) {
    rows.push({ label: figure.label, value: figure.value });
  }
  return rows;
}

export function roleSpecRows(role: Role): SpecRow[] {
  const rows: SpecRow[] = [
    { label: "model", value: modelNumber(role) },
    { label: "dates", value: role.dates },
    { label: "location", value: role.location },
  ];
  if (role.institution) rows.push({ label: "institution", value: role.institution });
  for (const figure of figuresFor(role)) {
    rows.push({ label: figure.label, value: figure.value });
  }
  return rows;
}

export function markFigures(text: string, figures: Figure[]): Segment[] {
  const ranges: [number, number][] = [];
  for (const { value, source } of figures) {
    const at = text.indexOf(source);
    if (at < 0) continue;
    const start = at + source.indexOf(value);
    if (start < at) continue;
    ranges.push([start, start + value.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start < cursor) continue;
    if (start > cursor) segments.push({ text: text.slice(cursor, start), figure: false });
    segments.push({ text: text.slice(start, end), figure: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), figure: false });
  return segments.length > 0 ? segments : [{ text, figure: false }];
}
