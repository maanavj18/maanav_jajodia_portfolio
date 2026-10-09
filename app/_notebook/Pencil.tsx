import type { CSSProperties, ReactNode } from "react";

export type Mark = {
  phrase: string;
  kind: "circle" | "underline";
  /** Position in the page's drawing sequence. Keep at most three marks per page. */
  order: number;
};

export type Annotation = {
  /** Text that must appear in the source bullet for the note to render. */
  anchor: string;
  /** A restatement of that bullet's facts, under about twelve words. */
  note: string;
};

const STROKES = {
  circle: {
    viewBox: "0 0 120 52",
    d: "M 14 34 C 5 21, 29 6, 62 5 C 95 4, 117 13, 115 27 C 113 42, 86 49, 57 48 C 27 47, 4 40, 7 25 C 9 16, 23 10, 38 8",
  },
  underline: {
    viewBox: "0 0 100 10",
    d: "M 2 6 C 20 3.5, 41 7.5, 61 5.5 S 89 3.5, 98 6.5",
  },
} as const;

export function Pencil({ kind, order, children }: { kind: Mark["kind"]; order: number; children: ReactNode }) {
  const stroke = STROKES[kind];
  return (
    <mark className={`pencil pencil--${kind}`} style={{ "--order": order } as CSSProperties}>
      {children}
      <svg className="pencil__stroke" viewBox={stroke.viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={stroke.d} pathLength={1} />
      </svg>
    </mark>
  );
}

/** Wraps the first occurrence of each phrase in a pencil mark. Phrases missing from the text are skipped. */
export function marked(text: string, marks: Mark[] = []): ReactNode[] {
  const pending = marks.filter((mark) => text.includes(mark.phrase));
  const out: ReactNode[] = [];
  let rest = text;

  while (rest.length > 0) {
    let next: Mark | undefined;
    let at = Infinity;
    for (const mark of pending) {
      const index = rest.indexOf(mark.phrase);
      if (index >= 0 && index < at) {
        at = index;
        next = mark;
      }
    }
    if (!next) {
      out.push(rest);
      break;
    }
    if (at > 0) out.push(rest.slice(0, at));
    out.push(
      <Pencil key={next.phrase} kind={next.kind} order={next.order}>
        {next.phrase}
      </Pencil>,
    );
    rest = rest.slice(at + next.phrase.length);
    pending.splice(pending.indexOf(next), 1);
  }
  return out;
}

export function MarginNote({ children, pointing = "left" }: { children: ReactNode; pointing?: "left" | "up" }) {
  return (
    <p className={`margin-note margin-note--${pointing}`}>
      <svg className="margin-note__arrow" viewBox="0 0 40 20" aria-hidden="true" focusable="false">
        <path d="M 38 15 C 29 6, 17 5, 5 10" />
        <path d="M 12 4 L 4 10.5 L 12.5 15.5" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

export function noteFor(text: string, annotations: Annotation[] = []): string | undefined {
  return annotations.find((annotation) => text.includes(annotation.anchor))?.note;
}
