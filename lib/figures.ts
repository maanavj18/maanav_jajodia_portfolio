import "server-only";

// The display figure for each bullet, by entry slug and bullet index.
// Every figure must be a literal substring of its bullet in content/site.md;
// a figure that no longer matches is dropped rather than shown stale.
const PICKS: Record<string, (string | null)[]> = {
  "sai-lab": ["0.79 F1", "96 percent", "20,000+"],
  "ai-club": ["$8,000+", "$5,000+"],
  "strategic-academic-services": ["10+", "1480", null],
  "stroke-analysis": ["30+ FPS", "150+", "16"],
  flightscope: ["500+", "50k+", null, "15\u201330%"],
};

export type Token = { text: string; numeric: boolean };

export type Figure = { text: string; tokens: Token[] };

export type Line = { bullet: string; figure?: Figure };

export function toFigure(text: string): Figure {
  return {
    text,
    tokens: text.split(" ").map((part) => ({ text: part, numeric: /\d/.test(part) })),
  };
}

export function lines(slug: string, bullets: string[]): Line[] {
  const picks = PICKS[slug] ?? [];
  return bullets.map((bullet, index) => {
    const pick = picks[index];
    if (!pick || !bullet.includes(pick)) return { bullet };
    return { bullet, figure: toFigure(pick) };
  });
}