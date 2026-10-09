import type { CSSProperties } from "react";

export function SplitFlap({ text }: { text: string }) {
  return (
    <span className="split-flap" role="group" aria-label={text}>
      <span className="split-flap__tiles" aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="split-flap__char"
            style={{ "--i": index } as CSSProperties}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}
