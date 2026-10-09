export function YouAreHere() {
  return (
    <svg className="pictogram" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.25" fill="currentColor" />
    </svg>
  );
}

export function DirectionArrow({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <svg className="pictogram" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="M3.5 12 10 6.2v3.3H20.5v5H10v3.3L3.5 12z"
        fill="currentColor"
        transform={direction === "right" ? "scale(-1 1) translate(-24 0)" : undefined}
      />
    </svg>
  );
}
