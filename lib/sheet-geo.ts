/**
 * Columbus sheet point. USGS GNIS 1080996, populated place, Franklin County,
 * Ohio, NAD 83: 39.9611755, −82.9987942. Published DMS to the nearest second
 * is 39°57′40″ N, 082°59′56″ W (MyTopo GNIS reprint; TopoQuest rounds the
 * same point to N39.96118° W82.99879°). The neatline is a diagrammatic 7.5′
 * span centered on that point.
 */
export const SHEET_LAT = 39.9611755;
export const SHEET_LON = 82.9987942;

/** Half-span of a 7.5′ sheet, in degrees. */
const HALF_SPAN = 3.75 / 60;

/** Interior graticule lines, as fractions down and across the sheet. */
export const GRID_FRACTIONS = [0.25, 0.5, 0.75] as const;

const TICK_FRACTIONS = [0, 0.25, 0.5, 0.75, 1] as const;

function formatDms(value: number, hemisphere: "N" | "W"): string {
  const abs = Math.abs(value);
  let deg = Math.floor(abs + 1e-8);
  const minutesFull = (abs - deg) * 60;
  let min = Math.floor(minutesFull + 1e-8);
  let sec = Math.round((minutesFull - min) * 60);
  if (sec === 60) {
    sec = 0;
    min += 1;
  }
  if (min === 60) {
    min = 0;
    deg += 1;
  }
  const degText = hemisphere === "W" ? String(deg).padStart(3, "0") : String(deg);
  return `${degText}°${String(min).padStart(2, "0")}′${String(sec).padStart(2, "0")}″ ${hemisphere}`;
}

function formatDecimal(value: number, places: number, hemisphere: "N" | "W"): string {
  return `${value.toFixed(places)}° ${hemisphere}`;
}

function ticks(origin: number, hemisphere: "N" | "W"): string[] {
  return TICK_FRACTIONS.map((fraction) =>
    formatDecimal(origin + HALF_SPAN * (1 - 2 * fraction), 4, hemisphere),
  );
}

export const SHEET_LAT_DMS = formatDms(SHEET_LAT, "N");
export const SHEET_LON_DMS = formatDms(SHEET_LON, "W");
export const SHEET_LAT_DEC = formatDecimal(SHEET_LAT, 7, "N");
export const SHEET_LON_DEC = formatDecimal(SHEET_LON, 7, "W");

/** North to south, then west to east. Edges, quarters, and the sheet point. */
export const LAT_TICKS = ticks(SHEET_LAT, "N");
export const LON_TICKS = ticks(SHEET_LON, "W");

/** East–west ground distance of the 7.5′ sheet at the sheet latitude. */
export function eastWestKm(): number {
  const phi = (SHEET_LAT * Math.PI) / 180;
  const metersPerDegree =
    111412.84 * Math.cos(phi) - 93.5 * Math.cos(3 * phi) + 0.118 * Math.cos(5 * phi);
  return (metersPerDegree * (HALF_SPAN * 2)) / 1000;
}

export function leadingFigure(bullets: string[], pattern: RegExp): string | undefined {
  for (const bullet of bullets) {
    const match = pattern.exec(bullet);
    if (match) return match[0];
  }
  return undefined;
}
