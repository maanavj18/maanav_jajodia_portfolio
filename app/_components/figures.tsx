import type { Flow, Scale } from "@/lib/apparatus";
import { Prose } from "./prose";

const pct = (x: number) => `${(x * 100).toFixed(2)}%`;

/** The F1 result placed on a 0–1 axis; the thick segment is the gain over the baseline. */
export function ScaleFigure({
  id,
  label,
  scale,
  statementHref,
  statementLabel,
}: {
  id: string;
  label: string;
  scale: Scale;
  statementHref: string;
  statementLabel: string;
}) {
  const from = Math.max(0, scale.value - scale.gain);
  const description = `Axis from 0 to 1. A mark at ${scale.label}, preceded by a segment showing the ${scale.gainLabel}.`;

  return (
    <figure id={id} className="figure">
      <div className="scale" role="img" aria-label={description}>
        <span className="scale-value" style={{ left: pct(scale.value) }}>
          {scale.label}
        </span>
        <span className="scale-axis" />
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <span key={t} className="scale-tick" style={{ left: pct(t) }} />
        ))}
        <span className="scale-gain" style={{ left: pct(from), width: pct(scale.value - from) }} />
        <span className="scale-base" style={{ left: pct(from) }} />
        <span className="scale-mark" style={{ left: pct(scale.value) }} />
        {[0, 0.5, 1].map((t) => (
          <span key={t} className="scale-num" style={{ left: pct(t) }}>
            {t}
          </span>
        ))}
      </div>
      <p className="scale-key" aria-hidden="true">
        <span className="scale-swatch" /> {scale.gainLabel}
      </p>
      <figcaption>
        <span className="fig-no">{label}.</span>{" "}
        <span className="caption-text">
          <Prose text="F1 at IoU 0.5" /> for the tree-crown segmentation model in{" "}
          <a href={statementHref}>statement {statementLabel}</a>, on an axis from 0 to 1. The heavy segment
          spans the {scale.gainLabel}.
        </span>
      </figcaption>
    </figure>
  );
}

/** An ordered chain of named parts, read top to bottom. */
export function FlowFigure({
  id,
  label,
  flow,
  prefix,
  anchor,
  subject,
}: {
  id: string;
  label: string;
  flow: Flow;
  prefix: string;
  anchor: (statement: number) => string;
  subject: string;
}) {
  const many = flow.statements.length > 1;
  const first = flow.statements[0];
  const last = flow.statements.at(-1) ?? first;

  return (
    <figure id={id} className="figure">
      <ol className="flow">
        {flow.nodes.map((node) => (
          <li key={node.label}>
            <span className="flow-label">
              <Prose text={node.label} />
            </span>
            {many && (
              <a className="flow-ref" href={anchor(node.statement)}>
                {prefix}.{node.statement}
              </a>
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        <span className="fig-no">{label}.</span>{" "}
        <span className="caption-text">
          {flow.kind === "layers" ? (
            <>
              The {flow.nodes.length} layers of the {subject} architecture, in the order given in{" "}
              <a href={anchor(first)}>
                statement {prefix}.{first}
              </a>
              .
            </>
          ) : (
            <>
              Components of {subject} as named in{" "}
              <a href={anchor(first)}>
                statements {prefix}.{first}–{prefix}.{last}
              </a>
              , in the order described.
            </>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
