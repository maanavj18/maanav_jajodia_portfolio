import { Fragment, type ReactNode } from "react";

export function plain(text: string): string {
  return text.replaceAll("'", "\u2019");
}

type MarkName = "circle" | "underline";

export function Figure({ children, mark }: { children: ReactNode; mark: MarkName }) {
  return (
    <span className={`mark mark-${mark}`}>
      <span className="mark-text">{children}</span>
      {mark === "circle" ? (
        <svg className="mark-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="50" cy="18" rx="47" ry="14" pathLength="100" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="mark-svg" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <path d="M1 6.5 C 22 3, 38 9, 58 5.5 S 84 3, 99 6" pathLength="100" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export function Marked({
  text,
  marks,
}: {
  text: string;
  marks: { phrase: string; mark: MarkName }[];
}) {
  const found = marks
    .map((mark) => ({ ...mark, index: text.indexOf(mark.phrase) }))
    .filter((mark) => mark.phrase.length > 0 && mark.index >= 0)
    .sort((a, b) => a.index - b.index);

  const nodes: ReactNode[] = [];
  let cursor = 0;

  found.forEach((mark, index) => {
    if (mark.index < cursor) return;
    if (mark.index > cursor) nodes.push(<Fragment key={`t-${cursor}`}>{plain(text.slice(cursor, mark.index))}</Fragment>);
    nodes.push(
      <Figure key={`${mark.phrase}-${index}`} mark={mark.mark}>
        {plain(mark.phrase)}
      </Figure>,
    );
    cursor = mark.index + mark.phrase.length;
  });

  if (cursor < text.length) nodes.push(<Fragment key={`t-${cursor}`}>{plain(text.slice(cursor))}</Fragment>);
  return <>{nodes}</>;
}

export function Bullet({
  text,
  note,
  circle,
  underline,
}: {
  text: string;
  note?: string;
  circle?: string;
  underline?: string;
}) {
  const marks = [
    circle ? { phrase: circle, mark: "circle" as const } : undefined,
    underline ? { phrase: underline, mark: "underline" as const } : undefined,
  ].filter((mark): mark is { phrase: string; mark: MarkName } =>
    Boolean(mark && text.includes(mark.phrase)),
  );
  const noteText = note && text.includes(note) ? note : undefined;

  return (
    <div className="margin-row">
      {noteText ? <p className="note">{noteText}</p> : <span className="note-gap" aria-hidden="true" />}
      <p className="prose">{marks.length > 0 ? <Marked text={text} marks={marks} /> : plain(text)}</p>
    </div>
  );
}
