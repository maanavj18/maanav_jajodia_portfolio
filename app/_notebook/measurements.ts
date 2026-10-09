/**
 * Figures lifted from the bullets in content/site.md for the measurement tables.
 * A row renders only while its `source` text still appears in that entry's bullets,
 * so editing site.md can never leave a stale figure on the page.
 */
export type Measurement = {
  source: string;
  value: string;
  unit?: string;
  caption: string;
};

export const MEASUREMENTS: Record<string, Measurement[]> = {
  "sai-lab": [
    { source: "0.79 F1 at IoU 0.5", value: "0.79", unit: "F1", caption: "at IoU 0.5, tree crowns on RGB UAV imagery" },
    { source: "96 percent", value: "96", unit: "%", caption: "cut in HPC job times on the OSC cluster" },
    { source: "20,000+ COCO JSON images", value: "20,000+", caption: "COCO JSON images verified" },
    { source: "42,000+ annotations", value: "42,000+", caption: "annotations in the training-ready datasets" },
  ],
  "stroke-analysis": [
    { source: "30+ FPS", value: "30+", unit: "FPS", caption: "real-time processing rate" },
    { source: "501 pose, face, and hand landmarks per frame", value: "501", caption: "pose, face, and hand landmarks per frame" },
    { source: "under 50ms latency", value: "<50", unit: "ms", caption: "latency" },
    { source: "150+ frames with a 5-second rolling window", value: "150+", caption: "frames held in a 5-second rolling window" },
    { source: "16 anatomical landmarks", value: "16", caption: "anatomical landmarks for drift scoring" },
  ],
  flightscope: [
    { source: "3+ travel APIs", value: "3+", caption: "travel APIs aggregated" },
    { source: "500+ routes", value: "500+", caption: "routes standardized for comparison" },
    { source: "50k+ historical flight price records", value: "50k+", caption: "historical flight price records in PostgreSQL" },
    { source: "15–30% below historical averages", value: "15–30", unit: "%", caption: "below historical average sets off an alert" },
  ],
};

export function measurementsFor(slug: string, bullets: string[]): Measurement[] {
  return (MEASUREMENTS[slug] ?? []).filter((row) => bullets.some((bullet) => bullet.includes(row.source)));
}

export function measurement(slug: string, bullets: string[], source: string): Measurement | undefined {
  return measurementsFor(slug, bullets).find((row) => row.source === source);
}
