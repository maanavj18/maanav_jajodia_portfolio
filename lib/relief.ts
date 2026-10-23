type Pt = [number, number];

export type Contour = {
  d: string;
  index: boolean;
  elevation: number;
  label?: { x: number; y: number };
};

export type Relief = {
  contours: Contour[];
  woodland: string[];
  stream: string;
};

const WIDTH = 1000;
const HEIGHT = 1000;
const COLS = 70;
const ROWS = 70;

function hash(ix: number, iy: number, seed: number): number {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1440671);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function valueNoise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = fade(x - x0);
  const ty = fade(y - y0);
  const v00 = hash(x0, y0, seed);
  const v10 = hash(x0 + 1, y0, seed);
  const v01 = hash(x0, y0 + 1, seed);
  const v11 = hash(x0 + 1, y0 + 1, seed);
  return v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty;
}

function fbm(x: number, y: number, seed: number): number {
  const a = valueNoise(x * 2.1 + 1.3, y * 2.1 + 0.6, seed);
  const b = valueNoise(x * 4.4 + 8.1, y * 4.4 + 2.7, seed + 17);
  const c = valueNoise(x * 8.5 + 3.4, y * 8.5 + 5.2, seed + 53);
  return a * 0.58 + b * 0.3 + c * 0.12;
}

/** Valley centerline. Contours and the stream share this curve. */
function streamCenterX(y: number, seed: number): number {
  const t = Math.min(1, Math.max(0, (y - 40) / 920));
  const unit = ((seed >>> 0) % 997) / 997;
  const base = 620 + unit * 210;
  const x = base + Math.sin(t * Math.PI + unit * 1.7) * 64 + Math.sin(t * 4.8) * 14;
  return Math.min(930, Math.max(90, x));
}

function heightAt(x: number, y: number, seed: number): number {
  const nx = x / WIDTH;
  const ny = y / HEIGHT;
  const slope = (1 - ny) * 0.22 + (1 - nx) * 0.05;
  const dx = x - streamCenterX(y, seed);
  const valley = Math.exp(-(dx * dx) / (2 * 24 * 24)) * 0.4;
  return slope + fbm(nx, ny, seed) * 0.74 - valley;
}

function woodsAt(x: number, y: number, seed: number): number {
  const nudge = (seed % 90) - 45;
  const blobs = [
    { x: 210 + nudge, y: 240, rx: 160, ry: 130 },
    { x: 300 - nudge, y: 800, rx: 180, ry: 120 },
  ];
  let value = 0;
  for (const blob of blobs) {
    const dx = (x - blob.x) / blob.rx;
    const dy = (y - blob.y) / blob.ry;
    value += Math.exp(-(dx * dx + dy * dy));
  }
  value += (fbm(x / WIDTH, y / HEIGHT, seed + 91) - 0.5) * 0.28;
  return value;
}

function lerp(x0: number, y0: number, x1: number, y1: number, v0: number, v1: number, level: number): Pt {
  const delta = v1 - v0;
  const t = delta === 0 ? 0.5 : (level - v0) / delta;
  return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
}

function segmentsInCell(
  level: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  v00: number,
  v10: number,
  v11: number,
  v01: number,
): [Pt, Pt][] {
  let code = 0;
  if (v00 >= level) code |= 1;
  if (v10 >= level) code |= 2;
  if (v11 >= level) code |= 4;
  if (v01 >= level) code |= 8;
  if (code === 0 || code === 15) return [];

  const top = lerp(x0, y0, x1, y0, v00, v10, level);
  const right = lerp(x1, y0, x1, y1, v10, v11, level);
  const bottom = lerp(x0, y1, x1, y1, v01, v11, level);
  const left = lerp(x0, y0, x0, y1, v00, v01, level);
  const centerHigh = (v00 + v10 + v11 + v01) / 4 >= level;

  if (code === 5) {
    return centerHigh
      ? [
          [top, right],
          [bottom, left],
        ]
      : [
          [left, top],
          [right, bottom],
        ];
  }
  if (code === 10) {
    return centerHigh
      ? [
          [left, top],
          [right, bottom],
        ]
      : [
          [top, right],
          [bottom, left],
        ];
  }

  const table: Record<number, [Pt, Pt]> = {
    1: [left, top],
    2: [top, right],
    3: [left, right],
    4: [right, bottom],
    6: [top, bottom],
    7: [left, bottom],
    8: [bottom, left],
    9: [top, bottom],
    11: [bottom, right],
    12: [left, right],
    13: [top, right],
    14: [left, top],
  };
  return [table[code]];
}

function chain(segments: [Pt, Pt][]): Pt[][] {
  const quant = 0.05;
  const keyOf = (p: Pt) => `${Math.round(p[0] / quant)}:${Math.round(p[1] / quant)}`;
  const adjacent = new Map<string, number[]>();
  segments.forEach((segment, index) => {
    for (const point of segment) {
      const key = keyOf(point);
      const list = adjacent.get(key);
      if (list) list.push(index);
      else adjacent.set(key, [index]);
    }
  });

  const used = new Array<boolean>(segments.length).fill(false);
  const lines: Pt[][] = [];

  for (let index = 0; index < segments.length; index += 1) {
    if (used[index]) continue;
    used[index] = true;
    const line: Pt[] = [segments[index][0], segments[index][1]];

    const extend = (atStart: boolean) => {
      for (let guard = 0; guard < segments.length + 2; guard += 1) {
        const end = atStart ? line[0] : line[line.length - 1];
        const candidates = adjacent.get(keyOf(end)) ?? [];
        const nextIndex = candidates.find((candidate) => !used[candidate]);
        if (nextIndex === undefined) return;
        used[nextIndex] = true;
        const [a, b] = segments[nextIndex];
        const next = keyOf(a) === keyOf(end) ? b : a;
        if (atStart) line.unshift(next);
        else line.push(next);
      }
    };

    extend(false);
    extend(true);
    lines.push(line);
  }

  return lines;
}

function chaikinOpen(points: Pt[]): Pt[] {
  let current = points;
  for (let pass = 0; pass < 2; pass += 1) {
    if (current.length < 3) return current;
    const next: Pt[] = [current[0]];
    for (let i = 0; i < current.length - 1; i += 1) {
      const a = current[i];
      const b = current[i + 1];
      next.push([0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]]);
      next.push([0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]);
    }
    next.push(current[current.length - 1]);
    current = next;
  }
  return current;
}

function chaikinClosed(points: Pt[]): Pt[] {
  let current = points;
  for (let pass = 0; pass < 2; pass += 1) {
    const next: Pt[] = [];
    for (let i = 0; i < current.length; i += 1) {
      const a = current[i];
      const b = current[(i + 1) % current.length];
      next.push([0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]]);
      next.push([0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]);
    }
    current = next;
  }
  return current;
}

function decimate(points: Pt[], max: number): Pt[] {
  if (points.length <= max) return points;
  const step = Math.ceil(points.length / max);
  const out: Pt[] = [];
  for (let i = 0; i < points.length; i += step) out.push(points[i]);
  const last = points[points.length - 1];
  const end = out[out.length - 1];
  if (end[0] !== last[0] || end[1] !== last[1]) out.push(last);
  return out;
}

function lengthOf(points: Pt[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  return total;
}

function pointAt(points: Pt[], distance: number): Pt {
  let run = 0;
  for (let i = 1; i < points.length; i += 1) {
    const step = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    if (run + step >= distance) {
      const t = step === 0 ? 0 : (distance - run) / step;
      return [
        points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t,
        points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t,
      ];
    }
    run += step;
  }
  return points[points.length - 1];
}

function closedEnds(points: Pt[]): boolean {
  if (points.length < 4) return false;
  const a = points[0];
  const b = points[points.length - 1];
  return Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.6;
}

function toPath(points: Pt[], closed: boolean): string {
  const commands = points.map((point, index) => {
    const prefix = index === 0 ? "M" : "L";
    return `${prefix}${point[0].toFixed(1)} ${point[1].toFixed(1)}`;
  });
  if (closed) commands.push("Z");
  return commands.join("");
}

function finishLine(line: Pt[]): { d: string; points: Pt[] } | undefined {
  let points = line;
  let closed = closedEnds(points);
  if (closed) points = points.slice(0, -1);
  if (points.length < 4) return undefined;
  points = closed ? chaikinClosed(points) : chaikinOpen(points);
  points = decimate(points, 160);
  if (lengthOf(points) < 70) return undefined;
  return { d: toPath(points, closed), points };
}

function march(sample: (x: number, y: number) => number, level: number): { d: string; points: Pt[] }[] {
  const segments: [Pt, Pt][] = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const x0 = (col / COLS) * WIDTH;
      const x1 = ((col + 1) / COLS) * WIDTH;
      const y0 = (row / ROWS) * HEIGHT;
      const y1 = ((row + 1) / ROWS) * HEIGHT;
      segments.push(
        ...segmentsInCell(
          level,
          x0,
          y0,
          x1,
          y1,
          sample(x0, y0),
          sample(x1, y0),
          sample(x1, y1),
          sample(x0, y1),
        ),
      );
    }
  }
  return chain(segments)
    .map(finishLine)
    .filter((line): line is { d: string; points: Pt[] } => Boolean(line));
}

function labelPoint(points: Pt[]): Pt {
  const total = lengthOf(points);
  for (const fraction of [0.35, 0.5, 0.65, 0.2, 0.8]) {
    const point = pointAt(points, total * fraction);
    if (point[0] > 80 && point[0] < 920 && point[1] > 80 && point[1] < 920) return point;
  }
  return pointAt(points, total * 0.5);
}

function buildStream(seed: number): string {
  const points: Pt[] = [];
  for (let i = 0; i <= 26; i += 1) {
    const y = 28 + (i / 26) * 944;
    points.push([streamCenterX(y, seed), y]);
  }
  return toPath(decimate(chaikinOpen(points), 80), false);
}

export function hydroAnchor(seed: number): { left: string; top: string } {
  const y = 64;
  const x = streamCenterX(y, seed);
  return { left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` };
}
export function seedFromSlug(slug: string): number {
  let hashValue = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    hashValue ^= slug.charCodeAt(i);
    hashValue = Math.imul(hashValue, 16777619);
  }
  return hashValue >>> 0;
}

export function buildRelief(seed: number): Relief {
  const sample = (x: number, y: number) => heightAt(x, y, seed);
  let min = Infinity;
  let max = -Infinity;
  for (let row = 0; row <= ROWS; row += 4) {
    for (let col = 0; col <= COLS; col += 4) {
      const value = sample((col / COLS) * WIDTH, (row / ROWS) * HEIGHT);
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  const contours: Contour[] = [];
  const count = 10;
  for (let step = 1; step <= count; step += 1) {
    const level = min + ((max - min) * (step + 0.5)) / (count + 1);
    const index = step % 5 === 0;
    const elevation = 700 + step * 20;
    const lines = march(sample, level).sort((a, b) => lengthOf(b.points) - lengthOf(a.points));
    lines.forEach((line, lineIndex) => {
      const label = index && lineIndex === 0 ? labelPoint(line.points) : undefined;
      contours.push({
        d: line.d,
        index,
        elevation,
        label: label ? { x: label[0], y: label[1] } : undefined,
      });
    });
  }

  const woodland = march((x, y) => woodsAt(x, y, seed), 0.62).map((line) => line.d);

  return { contours, woodland, stream: buildStream(seed) };
}
