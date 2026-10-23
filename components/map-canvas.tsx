import type { ReactNode } from "react";
import { Plate } from "@/components/plate";
import { ScaleBar } from "@/components/scale-bar";
import { buildRelief, hydroAnchor } from "@/lib/relief";
import { LAT_TICKS, LON_TICKS } from "@/lib/sheet-geo";

export function MapCanvas({
  seed,
  size = "inset",
  coordinates = false,
  scale = false,
  elevations = false,
  children,
}: {
  seed: number;
  size?: "sheet" | "inset";
  coordinates?: boolean;
  scale?: boolean;
  elevations?: boolean;
  children?: ReactNode;
}) {
  const relief = buildRelief(seed);
  const anchor = hydroAnchor(seed);

  return (
    <figure className={`quad size-${size}${coordinates ? " with-coords" : ""}`}>
      {coordinates && (
        <>
          <p className="north">
            <svg className="north-arrow" viewBox="0 0 12 28" aria-hidden="true">
              <path d="M6 27 V3 M6 3 L1.5 10 M6 3 L10.5 10" />
            </svg>
            <span className="label">N</span>
          </p>
          <p className="lon-row nums">
            {LON_TICKS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </p>
          <p className="lat-col nums">
            {LAT_TICKS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </p>
        </>
      )}
      <div className="neatline">
        <div className="neatline-inner">
          <div className="plate-stage">
            <Plate relief={relief} cross={coordinates} />
            {elevations &&
              relief.contours.map((contour, index) =>
                contour.label ? (
                  <span
                    key={`${contour.elevation}-${index}`}
                    className="elev-label"
                    style={{
                      left: `${(contour.label.x / 1000) * 100}%`,
                      top: `${(contour.label.y / 1000) * 100}%`,
                    }}
                  >
                    {contour.elevation}
                  </span>
                ) : null,
              )}
            <p className="hydro-label hydro-on-plate" style={{ left: anchor.left, top: anchor.top }}>
              Hydrography
            </p>
            {coordinates && (
              <p className="point-label">
                <span className="label">GNIS 1080996</span>
              </p>
            )}
          </div>
          <div className="overlay">{children}</div>
        </div>
      </div>
      {scale ? (
        <ScaleBar />
      ) : (
        <p className="label interval inset-note">Contour interval 20&nbsp;ft. Inset plat.</p>
      )}
    </figure>
  );
}
