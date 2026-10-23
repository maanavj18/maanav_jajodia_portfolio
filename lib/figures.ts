import "server-only";

// Display figures are matched out of the bullet text in content/site.md.
// If a sentence changes and a pattern stops matching, the figure disappears
// instead of showing a stale number.

export type Figure = {
  value: string;
  unit?: string;
  caption: string;
};

type Spec = {
  pattern: RegExp;
  unit?: string;
};

const SPECS: Record<string, Spec[]> = {
  "sai-lab": [
    { pattern: /(?<detail>RGB UAV imagery), reaching (?<value>0\.79) (?<caption>F1 at IoU 0\.5)/ },
    { pattern: /Reduced (?<caption>HPC job times) by (?<value>96) percent/, unit: "%" },
    { pattern: /(?<value>20,000\+) (?<caption>COCO JSON images)/ },
  ],
  "stroke-analysis": [
    { pattern: /(?<value>30\+) (?<unit>FPS) via a multithreaded (?<caption>MediaPipe Holistic pipeline)/ },
    { pattern: /(?<value>501) (?<caption>pose, face, and hand landmarks per frame)/ },
    { pattern: /(?<value>150\+) (?<caption>frames with a 5-second rolling window)/ },
  ],
  flightscope: [
    { pattern: /(?<value>50k\+) (?<caption>historical flight price records)/ },
    { pattern: /(?<value>500\+) (?<caption>routes)/ },
    { pattern: /(?<value>15[\u2013-]30)(?<unit>%) (?<caption>below historical averages)/ },
  ],
  "ai-club": [
    { pattern: /(?<value>\$8,000\+) (?<caption>annual budget)/ },
    { pattern: /(?<value>\$5,000\+) (?<caption>prize pool)/ },
  ],
  "strategic-academic-services": [
    { pattern: /(?<caption>SAT score) from (?<value>1160 to 1480)/ },
    { pattern: /(?<caption>chess rating) by (?<value>400\+) (?<unit>ELO)/ },
  ],
};

type Match = Figure & { start: number; end: number };

function captionFrom(groups: Record<string, string> | undefined): string {
  if (!groups) return "";
  return [groups.caption ?? groups.unit ?? "", groups.detail].filter(Boolean).join(", ");
}

function matches(source: string, bullets: string[]): Match[][] {
  const specs = SPECS[source] ?? [];
  return bullets.map((text) =>
    specs.flatMap(({ pattern, unit }) => {
      const found = pattern.exec(text);
      const value = found?.groups?.value;
      if (!found || !value) return [];
      const start = found.index + found[0].indexOf(value);
      return [
        {
          value,
          unit: unit ?? found.groups?.unit,
          caption: captionFrom(found.groups),
          start,
          end: start + value.length,
        },
      ];
    }),
  );
}

export function figuresFor(source: string, bullets: string[]): Figure[] {
  return matches(source, bullets)
    .flat()
    .map(({ value, unit, caption }) => ({ value, unit, caption }));
}

export function orderFigures(figures: Figure[], leading: string[]): Figure[] {
  const rank = (value: string) => {
    const index = leading.findIndex((item) => value.includes(item));
    return index < 0 ? leading.length : index;
  };
  return [...figures].sort((a, b) => rank(a.value) - rank(b.value));
}

export type Run = { text: string; figure: boolean };

export function markFigures(source: string, bullets: string[]): Run[][] {
  return matches(source, bullets).map((found, i) => {
    const text = bullets[i];
    const runs: Run[] = [];
    let cursor = 0;
    for (const { start, end } of [...found].sort((a, b) => a.start - b.start)) {
      if (start < cursor) continue;
      if (start > cursor) runs.push({ text: text.slice(cursor, start), figure: false });
      runs.push({ text: text.slice(start, end), figure: true });
      cursor = end;
    }
    if (cursor < text.length) runs.push({ text: text.slice(cursor), figure: false });
    return runs;
  });
}
