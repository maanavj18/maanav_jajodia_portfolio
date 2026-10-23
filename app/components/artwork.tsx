import type { CSSProperties, ReactNode } from "react";

export type Artwork = {
  width: number;
  height: number;
  dimensions: string;
  description: string;
  drawing: ReactNode;
};

const TAU = Math.PI * 2;
const round = (n: number) => Math.round(n * 10) / 10;

function seeded(text: string): () => number {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function figure(text: string, pattern: RegExp, group = 1): number | undefined {
  const match = pattern.exec(text);
  return match ? Number(match[group].replace(/,/g, "")) : undefined;
}

function polyline(points: [number, number][]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

/** StrokeAnalysis: mirrored landmark traces across the rolling frame window, one side drifting. */
function driftStudy(seed: string, f: { landmarks: number; frames: number; seconds: number; points: number }): Artwork {
  const rand = seeded(seed);
  const width = 1000;
  const height = 600;
  const [x0, x1, cy] = [40, 960, 250];
  const pairs = Math.max(1, Math.floor(f.landmarks / 2));
  const step = 168 / Math.max(1, pairs - 1);
  const x = (i: number) => x0 + (i / Math.max(1, f.frames - 1)) * (x1 - x0);

  const traces: string[] = [];
  for (let p = 0; p < pairs; p++) {
    const offset = 16 + p * step;
    const drift = 0.35 + rand() * 0.65;
    const phase = rand() * TAU;
    const steady: [number, number][] = [];
    const drifting: [number, number][] = [];
    for (let i = 0; i < f.frames; i++) {
      const t = i / Math.max(1, f.frames - 1);
      const tremor = Math.sin(i / 9 + phase) * 1.2;
      steady.push([x(i), cy - offset + tremor + (rand() - 0.5) * 1.4]);
      drifting.push([x(i), cy + offset - tremor + (rand() - 0.5) * 1.4 + drift * 46 * t ** 1.8]);
    }
    traces.push(polyline(steady), polyline(drifting));
  }

  const bays = Array.from({ length: f.seconds + 1 }, (_, s) => round(x0 + (s / f.seconds) * (x1 - x0)));
  let minor = "";
  let major = "";
  for (let i = 0; i < f.points; i++) {
    const tx = round(x0 + (i / Math.max(1, f.points - 1)) * (x1 - x0));
    if (i % 50 === 0 || i === f.points - 1) major += `M${tx} 548v22`;
    else minor += `M${tx} 548v10`;
  }

  return {
    width,
    height,
    dimensions: `${f.landmarks} landmarks \u00d7 ${f.frames} frames`,
    description: `Generated drawing: ${f.landmarks} landmark traces, set as ${pairs} mirrored pairs, run across ${f.frames} frames divided into ${f.seconds} seconds. The lower line of each pair drifts downward. A scale of ${f.points} ticks runs along the base.`,
    drawing: (
      <>
        <g className="art-faint">
          {bays.map((bx) => (
            <line key={bx} x1={bx} x2={bx} y1={40} y2={500} />
          ))}
        </g>
        <g className="art-ink">
          {traces.map((points, i) => (
            <polyline key={i} className="art-ink trace" points={points} pathLength={1} />
          ))}
        </g>
        <path className="art-faint" d={minor} />
        <path className="art-ink" d={major} />
      </>
    ),
  };
}

/** FlightScope: one hairline per route, grouped by source, with the fare-drop alert band shaded. */
function fareBand(seed: string, f: { sources: number; routes: number; low: number; high: number }): Artwork {
  const rand = seeded(seed);
  const width = 1000;
  const height = 600;
  const [x0, x1, gap, y0, scale] = [40, 960, 40, 270, 560];
  const panel = (x1 - x0 - gap * (f.sources - 1)) / f.sources;
  const bandTop = y0 + (f.low / 100) * scale;
  const bandBottom = y0 + (f.high / 100) * scale;

  let faint = "";
  let ink = "";
  const panels: number[] = [];
  for (let s = 0; s < f.sources; s++) {
    const left = x0 + s * (panel + gap);
    panels.push(round(left));
    const count = Math.floor(f.routes / f.sources) + (s < f.routes % f.sources ? 1 : 0);
    let walk = 0;
    for (let j = 0; j < count; j++) {
      walk = walk * 0.86 + (rand() - 0.5) * 0.16;
      const change = Math.min(0.42, Math.max(-0.42, walk + (rand() - 0.5) * 0.14));
      const lx = round(left + ((j + 0.5) / count) * panel);
      const ly = round(y0 - change * scale);
      const drop = -change * 100;
      const segment = `M${lx} ${y0}V${ly}`;
      if (drop >= f.low && drop <= f.high) ink += segment;
      else faint += segment;
    }
  }

  return {
    width,
    height,
    dimensions: `${f.routes} routes \u00d7 ${f.sources} APIs`,
    description: `Generated drawing: ${f.routes} hairlines in ${f.sources} groups, one group per travel API. Each line rises or falls from its group\u2019s average; lines that end ${f.low}\u2013${f.high}% below it, inside the shaded band, are drawn in black.`,
    drawing: (
      <>
        {panels.map((left) => (
          <rect key={left} className="art-band" x={left} y={round(bandTop)} width={round(panel)} height={round(bandBottom - bandTop)} />
        ))}
        <path className="art-faint" d={faint} />
        <path className="art-ink" d={ink} />
        <g className="art-ink">
          {panels.map((left) => (
            <line key={left} x1={left} x2={round(left + panel)} y1={y0} y2={y0} />
          ))}
        </g>
      </>
    ),
  };
}

/** Systems and AI Lab: a field of tree crowns seen from above, with predicted outlines over matched crowns. */
function canopy(seed: string, f: { models: number; score: number; gain: number }): Artwork {
  const rand = seeded(seed);
  const size = 800;
  const n = Math.max(2, f.models);
  const cell = (size - 80) / n;
  const crowns = Array.from({ length: n * n }, (_, i) => ({
    cx: 40 + (i % n) * cell + cell / 2 + (rand() - 0.5) * cell * 0.36,
    cy: 40 + Math.floor(i / n) * cell + cell / 2 + (rand() - 0.5) * cell * 0.36,
    r: cell * (0.34 + rand() * 0.16),
  }));

  const order = crowns.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const matched = Math.round(f.score * crowns.length);
  const predictions = order.slice(0, matched).map((index, rank) => {
    const crown = crowns[index];
    const angle = rand() * TAU;
    const shift = crown.r * (0.1 + rand() * 0.18);
    return {
      cx: crown.cx + Math.cos(angle) * shift,
      cy: crown.cy + Math.sin(angle) * shift,
      r: crown.r * (0.92 + rand() * 0.14),
      heavy: rank < f.gain,
    };
  });

  return {
    width: size,
    height: size,
    dimensions: `${n} \u00d7 ${n} crowns`,
    description: `Generated drawing: a ${n} by ${n} field of tree crowns seen from above. ${matched} crowns, after the ${f.score} F1 score, carry a second black outline; ${f.gain} of them, after the ${f.gain}-point gain, are drawn heavier.`,
    drawing: (
      <>
        <g className="art-faint">
          {crowns.map((c, i) => (
            <circle key={i} cx={round(c.cx)} cy={round(c.cy)} r={round(c.r)} />
          ))}
        </g>
        <g className="art-ink">
          {predictions.map((c, i) => (
            <circle key={i} className={c.heavy ? "art-ink-heavy" : undefined} cx={round(c.cx)} cy={round(c.cy)} r={round(c.r)} />
          ))}
        </g>
      </>
    ),
  };
}

/** Fallback: one rule per figure in the label, its length set by the figure's magnitude. */
function ledger(seed: string, text: string): Artwork | undefined {
  const values = [...text.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => Number(m[0].replace(/,/g, "")));
  if (values.length === 0) return undefined;
  const top = Math.log10(Math.max(...values) + 1) || 1;
  const width = 1000;
  const height = 80 + values.length * 24;
  return {
    width,
    height,
    dimensions: `${values.length} figures`,
    description: `Generated drawing: ${values.length} horizontal rules, one for each figure in the label, each as long as its figure is large.`,
    drawing: (
      <g className="art-ink">
        {values.map((value, i) => (
          <line key={`${seed}-${i}`} x1={40} x2={round(40 + (Math.log10(value + 1) / top) * 920)} y1={52 + i * 24} y2={52 + i * 24} />
        ))}
      </g>
    ),
  };
}

/** Picks a drawing by the figures a project or role actually reports in `site.md`. */
export function artworkFor(seed: string, bullets: string[]): Artwork | undefined {
  const text = bullets.join(" ");

  const landmarks = figure(text, /across (\d+) anatomical landmarks/);
  const frames = figure(text, /(\d+)\+? frames/);
  const seconds = figure(text, /(\d+)-second/);
  const points = figure(text, /(\d+) pose, face, and hand landmarks/);
  if (landmarks && frames && seconds && points) return driftStudy(seed, { landmarks, frames, seconds, points });

  const sources = figure(text, /(\d+)\+? travel APIs/);
  const routes = figure(text, /([\d,]+)\+? routes/);
  const low = figure(text, /(\d+)\u2013(\d+)% below/, 1);
  const high = figure(text, /(\d+)\u2013(\d+)% below/, 2);
  if (sources && routes && low !== undefined && high !== undefined) return fareBand(seed, { sources, routes, low, high });

  const models = figure(text, /(\d+) tree models/);
  const score = figure(text, /(0\.\d+) F1/);
  const gain = figure(text, /(\d+)-point gain/);
  if (models && score && gain !== undefined) return canopy(seed, { models, score, gain });

  return ledger(seed, text);
}

export function ArtworkImage({ art }: { art: Artwork }) {
  return (
    <div className="artwork" style={{ "--aspect": `${art.width / art.height}` } as CSSProperties}>
      <svg viewBox={`0 0 ${art.width} ${art.height}`} role="img" aria-label={art.description} focusable="false">
        {art.drawing}
      </svg>
    </div>
  );
}