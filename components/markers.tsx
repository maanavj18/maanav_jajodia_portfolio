export function Marker({ kind }: { kind: "benchmark" | "site" | "sheet" }) {
  if (kind === "benchmark") {
    return (
      <svg className="marker" viewBox="0 0 16 14" aria-hidden="true">
        <path d="M8 1.2 14.6 13 H1.4 Z" />
      </svg>
    );
  }
  if (kind === "site") {
    return (
      <svg className="marker" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="1.4" y="1.4" width="11.2" height="11.2" />
      </svg>
    );
  }
  return (
    <svg className="marker" viewBox="0 0 18 13" aria-hidden="true">
      <rect x="1" y="1" width="16" height="11" />
      <rect x="3.2" y="3" width="11.6" height="7" />
    </svg>
  );
}

export function Swatch({ kind }: { kind: "index" | "intermediate" | "water" | "woodland" }) {
  return (
    <svg className={`swatch swatch-${kind}`} viewBox="0 0 44 14" aria-hidden="true">
      {kind === "woodland" ? (
        <rect x="1" y="2" width="42" height="10" />
      ) : (
        <path d="M1 10 C 8 2, 15 12, 23 6 S 36 3, 43 8" />
      )}
    </svg>
  );
}