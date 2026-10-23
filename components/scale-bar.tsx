import { eastWestKm } from "@/lib/sheet-geo";

const BAR_KM = 4;

export function ScaleBar() {
  const widthKm = eastWestKm();
  const widthPercent = (BAR_KM / widthKm) * 100;
  const km = widthKm.toFixed(2);

  return (
    <div className="scale-block">
      <div className="scale" style={{ width: `${widthPercent}%` }}>
        <div className="scale-nums" aria-hidden="true">
          <span>0</span>
          <span>2</span>
          <span>4 km</span>
        </div>
        <div
          className="scale-track"
          role="img"
          aria-label={`Scale bar, 4 kilometers of ${km} kilometers east to west on this 7.5 minute sheet`}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <p className="label interval">Contour interval 20&nbsp;ft. Graticule 1.875′.</p>
      <p className="scale-note">
        4&nbsp;km of {km}&nbsp;km east to west on this 7.5′ sheet.
      </p>
    </div>
  );
}
