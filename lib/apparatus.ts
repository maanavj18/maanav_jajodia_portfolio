import "server-only";

/*
 * Scholarly apparatus: tables, figures, and citations built from the bullets
 * in content/site.md. Every string here must appear verbatim in the bullet it
 * points at; anything that no longer matches is dropped instead of rendered.
 */

export type Datum = { quantity: string; value: string };

export type TableRow = Datum & { statement: number };

const DATA: Record<string, Datum[]> = {
  "sai-lab": [
    { quantity: "F1 at IoU 0.5", value: "0.79" },
    { quantity: "gain over a DeepForest baseline", value: "11-point" },
    { quantity: "CV papers", value: "50+" },
    { quantity: "tree models", value: "10" },
    { quantity: "Reduced HPC job times by", value: "96 percent" },
    { quantity: "walltime", value: "6-hour" },
    { quantity: "COCO JSON images", value: "20,000+" },
    { quantity: "annotations", value: "42,000+" },
  ],
  "ai-club": [
    { quantity: "annual budget", value: "$8,000+" },
    { quantity: "prize pool", value: "$5,000+" },
    { quantity: "builders", value: "100+" },
  ],
  "strategic-academic-services": [
    { quantity: "K–12 students", value: "10+" },
    { quantity: "SAT score", value: "1160 to 1480" },
    { quantity: "grades", value: "C to A" },
    { quantity: "chess rating", value: "400+ ELO" },
  ],
  "stroke-analysis": [
    { quantity: "FPS", value: "30+" },
    { quantity: "pose, face, and hand landmarks per frame", value: "501" },
    { quantity: "latency", value: "under 50ms" },
    { quantity: "architecture", value: "5-layer" },
    { quantity: "frames", value: "150+" },
    { quantity: "rolling window", value: "5-second" },
    { quantity: "automated neurological assessment modules", value: "2" },
    { quantity: "anatomical landmarks", value: "16" },
  ],
  flightscope: [
    { quantity: "travel APIs", value: "3+" },
    { quantity: "routes", value: "500+" },
    { quantity: "historical flight price records", value: "50k+" },
    { quantity: "below historical averages", value: "15–30%" },
  ],
};

function locate(bullet: string, { quantity, value }: Datum) {
  const q = bullet.indexOf(quantity);
  const v = bullet.indexOf(value);
  if (q < 0 || v < 0) return undefined;
  return { start: Math.min(q, v), end: Math.max(q + quantity.length, v + value.length) };
}

export function tableRows(slug: string, bullets: string[]): TableRow[] {
  const rows: TableRow[] = [];
  for (const datum of DATA[slug] ?? []) {
    const statement = bullets.findIndex((bullet) => locate(bullet, datum));
    if (statement >= 0) rows.push({ ...datum, statement: statement + 1 });
  }
  return rows;
}

/** Where a statement's lead figure ends, so a note marker can follow it. */
export function leadFigureEnd(slug: string, bullet: string): number | undefined {
  for (const datum of DATA[slug] ?? []) {
    const hit = locate(bullet, datum);
    if (hit) return hit.end;
  }
  return undefined;
}

/** The first figure of an entry, as the contiguous phrase it appears in. */
export function leadPhrase(slug: string, bullets: string[]): string | undefined {
  for (const datum of DATA[slug] ?? []) {
    for (const bullet of bullets) {
      const hit = locate(bullet, datum);
      if (hit) return bullet.slice(hit.start, hit.end);
    }
  }
  return undefined;
}

export type FlowNode = { label: string; statement: number };

export type Flow = { nodes: FlowNode[]; statements: number[]; kind: "layers" | "components" };

export function flowFor(slug: string, bullets: string[]): Flow | undefined {
  if (slug === "stroke-analysis") {
    const index = bullets.findIndex((bullet) => bullet.includes("5-layer architecture"));
    const layers = index >= 0 ? /\(([^)]+)\)/.exec(bullets[index]) : null;
    if (!layers) return undefined;
    const nodes = layers[1].split(",").map((label) => ({ label: label.trim(), statement: index + 1 }));
    return { nodes, statements: [index + 1], kind: "layers" };
  }

  if (slug === "flightscope") {
    const labels = [
      "travel APIs",
      "flight price data pipeline",
      "PostgreSQL relational database",
      "NumPy-based price trend analysis module",
      "notification engine",
    ];
    const nodes: FlowNode[] = [];
    for (const label of labels) {
      const index = bullets.findIndex((bullet) => bullet.includes(label));
      if (index >= 0) nodes.push({ label, statement: index + 1 });
    }
    if (nodes.length < 3) return undefined;
    const statements = [...new Set(nodes.map((node) => node.statement))].sort((a, b) => a - b);
    return { nodes, statements, kind: "components" };
  }

  return undefined;
}

export type Scale = { value: number; label: string; gain: number; gainLabel: string; statement: number };

/** The tree-crown F1 result on a 0–1 axis, with its gain over the baseline. */
export function f1Scale(bullets: string[]): Scale | undefined {
  const index = bullets.findIndex((bullet) => bullet.includes("F1 at IoU 0.5"));
  if (index < 0) return undefined;
  const bullet = bullets[index];
  const score = /(\d\.\d+) F1 at IoU 0\.5/.exec(bullet);
  const gain = /\((\d+)-point (gain over a DeepForest baseline)\)/.exec(bullet);
  if (!score || !gain) return undefined;
  return {
    value: Number(score[1]),
    label: score[1],
    gain: Number(gain[1]) / 100,
    gainLabel: `${gain[1]}-point ${gain[2]}`,
    statement: index + 1,
  };
}

export function citationKey(name: string, suffix?: string): string {
  const family = name.split(" ").at(-1)?.toLowerCase() ?? "author";
  return suffix ? `${family}-${suffix}` : family;
}

export function invertedName(name: string): string {
  const parts = name.split(" ");
  const family = parts.pop();
  return `${family}, ${parts.join(" ")}`;
}

export function rangeLabel(numbers: number[], prefix: string): string {
  if (numbers.length === 1) return `${prefix}.${numbers[0]}`;
  return `${prefix}.${numbers[0]}–${prefix}.${numbers.at(-1)}`;
}
