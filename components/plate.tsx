import { GRID_FRACTIONS } from "@/lib/sheet-geo";
import type { Relief } from "@/lib/relief";

const LINES = GRID_FRACTIONS.map((fraction) => fraction * 1000);

export function Plate({ relief, cross = false }: { relief: Relief; cross?: boolean }) {
  return (
    <svg className="plate" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      {relief.woodland.map((d) => (
        <path key={d} className="woodland" d={d} />
      ))}
      <g className="graticule">
        {LINES.map((position) => (
          <path key={`v${position}`} d={`M${position} 0 V1000`} />
        ))}
        {LINES.map((position) => (
          <path key={`h${position}`} d={`M0 ${position} H1000`} />
        ))}
      </g>
      <g className="contours">
        {relief.contours.map((contour, index) => (
          <path
            key={`${contour.elevation}-${index}`}
            className={contour.index ? "contour index" : "contour intermediate"}
            d={contour.d}
            pathLength={1}
          />
        ))}
      </g>
      <path className="stream" d={relief.stream} />
      {cross && <path className="crosshair" d="M500 470 V530 M470 500 H530" />}
    </svg>
  );
}
