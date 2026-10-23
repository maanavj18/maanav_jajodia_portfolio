export function PullFigure({
  bullet,
  value,
  unit,
}: {
  bullet: string;
  value: string;
  unit: string;
}) {
  if (!bullet.includes(value) || !bullet.includes(unit)) {
    return <p className="measure">{bullet}</p>;
  }

  return (
    <figure className="pull">
      <div className="pull-row" aria-hidden="true">
        <p className="pull-value">
          <span className="ink ink-pink">{value}</span>
          <span className="ink ink-blue">{value}</span>
        </p>
        <p className="pull-unit">{unit}</p>
      </div>
      <figcaption className="measure">{bullet}</figcaption>
    </figure>
  );
}
