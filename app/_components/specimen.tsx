import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { Role } from "@/lib/content";
import { lines, type Figure, type Line } from "@/lib/figures";

export function fit(text: string): CSSProperties {
  const chars = Math.max(1, ...text.split(/\s+/).map((word) => word.length));
  return { "--chars": chars } as CSSProperties;
}

export function punctuate(text: string): string {
  return text.replaceAll("'", "\u2019");
}

// Advance estimate for Anybody at wdth 150 / wght 900, in em.
// Unit glyphs are set at 0.42em in CSS; keep the two in step.
const CHAR_EM = 0.95;
const UNIT_EM = 0.42;
const SPACE_EM = 0.3;

function figureEm(figure: Figure): number {
  const em = figure.tokens.reduce((sum, token, index) => {
    const gap = index > 0 ? SPACE_EM : 0;
    const scale = token.numeric ? 1 : UNIT_EM;
    return sum + gap + token.text.length * CHAR_EM * scale;
  }, 0);
  return Math.max(1, em * 1.16);
}

// The hidden copy is set at the widest axis values, so it holds the box open
// while the visible copy changes width and weight on top of it.
export function Morph({ children }: { children: ReactNode }) {
  return (
    <span className="morph">
      <span className="morph__rest" aria-hidden="true">
        {children}
      </span>
      <span className="morph__live">{children}</span>
    </span>
  );
}

function FigureText({ figure, scale }: { figure: Figure; scale: "display" | "index" }) {
  return (
    <span
      className={scale === "index" ? "figure figure--index" : "figure"}
      style={{ "--em": figureEm(figure) } as CSSProperties}
    >
      <Morph>
        {figure.tokens.map((token, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span className={token.numeric ? "figure__num" : "figure__unit"}>{token.text}</span>
          </Fragment>
        ))}
      </Morph>
    </span>
  );
}

export function SpecimenLine({
  figure,
  scale = "display",
  children,
}: {
  figure?: Figure;
  scale?: "display" | "index";
  children: ReactNode;
}) {
  return (
    <li className="line">
      {figure && (
        <p className="line__figure" aria-hidden="true">
          <FigureText figure={figure} scale={scale} />
          <span className="axis" />
        </p>
      )}
      <p className="line__caption">{children}</p>
    </li>
  );
}

function Caption({ line }: { line: Line }) {
  if (!line.figure) return <>{punctuate(line.bullet)}</>;
  const start = line.bullet.indexOf(line.figure.text);
  const end = start + line.figure.text.length;
  return (
    <>
      {punctuate(line.bullet.slice(0, start))}
      <strong>{line.figure.text}</strong>
      {punctuate(line.bullet.slice(end))}
    </>
  );
}

export function Lines({ items, scale = "display" }: { items: Line[]; scale?: "display" | "index" }) {
  return (
    <ul className="lines">
      {items.map((line) => (
        <SpecimenLine key={line.bullet} figure={line.figure} scale={scale}>
          <Caption line={line} />
        </SpecimenLine>
      ))}
    </ul>
  );
}

export function Meta({ lead, rest }: { lead: string; rest: string }) {
  return (
    <p className="meta">
      <span className="meta__lead">{lead}</span>
      {rest}
    </p>
  );
}

export function RoleBlock({ role, heading: Heading }: { role: Role; heading: "h2" | "h3" }) {
  const id = `role-${role.slug}`;
  return (
    <article className="role" aria-labelledby={id}>
      <header className="head">
        <div className="fit" style={fit(role.organization)}>
          <Heading id={id} className={Heading === "h2" ? "display" : "display display--role"}>
            {role.organization}
          </Heading>
        </div>
        <Meta
          lead={role.title}
          rest={[role.institution, role.location, role.dates].filter(Boolean).join(" \u00b7 ")}
        />
      </header>
      <Lines items={lines(role.slug, role.bullets)} />
    </article>
  );
}