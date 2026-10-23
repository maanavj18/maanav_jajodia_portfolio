import { markFigures } from "@/lib/figures";

export function Module() {
  return (
    <div className="module" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function ColumnBed() {
  return (
    <div className="column-bed" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function Figure({
  value,
  unit,
  caption,
  className = "",
}: {
  value: string;
  unit?: string;
  caption: string;
  className?: string;
}) {
  const glued = unit === "%";
  const long = value.length + (unit?.length ?? 0) >= 7;
  return (
    <figure className={`figure ${className}`.trim()}>
      <p className={long ? "figure-num figure-num-long" : "figure-num"}>
        {value}
        {unit ? <span className="figure-unit">{glued ? unit : `\u00A0${unit}`}</span> : null}
      </p>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Meta({ parts }: { parts: (string | undefined)[] }) {
  const lines = parts.filter((part): part is string => Boolean(part));
  if (lines.length === 0) return null;
  return (
    <p className="meta">
      {lines.map((line, index) => (
        <span className="tabular" key={`${line}-${index}`}>
          {line}
        </span>
      ))}
    </p>
  );
}

export function Prose({ source, bullets }: { source: string; bullets: string[] }) {
  const marked = markFigures(source, bullets);
  return (
    <ul className="prose-list">
      {marked.map((line, index) => (
        <li key={bullets[index]}>
          {line.map((run, runIndex) =>
            run.text ? (
              run.figure ? (
                <span className="inline-figure" key={runIndex}>
                  {run.text}
                </span>
              ) : (
                <span key={runIndex}>{run.text}</span>
              )
            ) : null,
          )}
        </li>
      ))}
    </ul>
  );
}
