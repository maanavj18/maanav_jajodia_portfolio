import { useId } from "react";

export function Overprint({ className = "" }: { className?: string }) {
  const id = `riso-screen-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className={["overprint", className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg className="slab slab-pink" viewBox="0 0 240 190">
        <circle cx="104" cy="96" r="82" />
      </svg>
      <svg className="slab slab-screen" viewBox="0 0 240 190">
        <defs>
          <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="3.2" cy="3.2" r="2.55" fill="currentColor" />
          </pattern>
        </defs>
        <circle cx="64" cy="90" r="38" fill={`url(#${id})`} />
      </svg>
      <svg className="slab slab-blue" viewBox="0 0 240 190">
        <rect x="100" y="44" width="128" height="118" />
      </svg>
    </div>
  );
}
