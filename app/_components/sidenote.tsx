import type { ReactNode } from "react";

export type NoteCounter = () => number;

export function noteCounter(): NoteCounter {
  let n = 0;
  return () => ++n;
}

/*
 * Margin note on wide screens. Below the wide breakpoint the note is hidden
 * and the marker toggles it open inline through the visually hidden checkbox.
 */
export function Sidenote({ n, children }: { n: number; children: ReactNode }) {
  const id = `note-${n}`;
  return (
    <>
      <input type="checkbox" id={id} className="sn-toggle" aria-label={`Show note ${n}`} />
      <label htmlFor={id} className="sn-ref" aria-hidden="true">
        {n}
      </label>
      <span className="sidenote" role="note">
        <span className="sn-num">{n}</span> {children}
      </span>
    </>
  );
}
