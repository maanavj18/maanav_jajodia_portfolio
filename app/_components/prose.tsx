import type { ReactNode } from "react";

const ACRONYM = /\b([A-Z]{2,})(s)?\b/g;

/** Curly apostrophes for text that arrives with straight ones. */
export function typeset(text: string): string {
  return text.replace(/(\w)'(\w)/g, "$1’$2").replace(/s'(\s)/g, "s’$1");
}

/** Sets runs of capitals (UAV, HPC, COCO) in real small caps. Digits never enter a run. */
export function Prose({ text }: { text: string }) {
  const source = typeset(text);
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of source.matchAll(ACRONYM)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(source.slice(last, start));
    parts.push(
      <span className="term" key={start}>
        <span className="caps">{match[1]}</span>
        {match[2]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < source.length) parts.push(source.slice(last));
  return <>{parts}</>;
}

export function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
