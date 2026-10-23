import { markFigures, typographic, type Figure } from "@/lib/specs";

export function Notes({ bullets, figures }: { bullets: string[]; figures: Figure[] }) {
  const typed = figures.map((figure) => ({
    ...figure,
    value: typographic(figure.value),
    source: typographic(figure.source),
  }));

  return (
    <ul className="notes">
      {bullets.map((bullet) => (
        <li key={bullet}>
          {markFigures(typographic(bullet), typed).map((segment, index) =>
            segment.figure ? (
              <span className="mono" key={index}>
                {segment.text}
              </span>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </li>
      ))}
    </ul>
  );
}
