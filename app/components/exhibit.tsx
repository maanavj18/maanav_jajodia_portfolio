import Link from "next/link";
import type { ReactNode } from "react";
import { getSite, type Project, type Role } from "@/lib/content";
import { accession, type ChecklistEntry } from "@/lib/exhibits";
import { ArtworkImage, artworkFor, type Artwork } from "./artwork";

type Level = "h1" | "h2" | "h3";

type TombstoneLine = {
  label: string;
  value: string;
  kind?: "title" | "attribution" | "dimensions" | "accession";
};

function Tombstone({ lines }: { lines: TombstoneLine[] }) {
  return (
    <dl className="tombstone">
      {lines.map((line) => (
        <div key={line.label} className={line.kind ? `tomb-${line.kind}` : undefined}>
          <dt className="visually-hidden">{line.label}</dt>
          <dd>{line.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Placard({ lines, children }: { lines: TombstoneLine[]; children?: ReactNode }) {
  return (
    <>
      <Tombstone lines={lines} />
      {children && <div className="label-text">{children}</div>}
    </>
  );
}

function Exhibit({
  id,
  level: Heading,
  heading,
  art,
  lines,
  children,
}: {
  id: string;
  level: Level;
  heading: string;
  art?: Artwork;
  lines: TombstoneLine[];
  children?: ReactNode;
}) {
  return (
    <article className="exhibit" id={id} aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className="exhibit-title">
        {heading}
      </Heading>
      {art ? (
        <figure className="exhibit-object">
          <ArtworkImage art={art} />
          <figcaption className="placard">
            <Placard lines={lines}>{children}</Placard>
          </figcaption>
        </figure>
      ) : (
        <div className="exhibit-object is-text">
          <div className="placard">
            <Placard lines={lines}>{children}</Placard>
          </div>
        </div>
      )}
    </article>
  );
}

function projectLines(project: Project, art?: Artwork): TombstoneLine[] {
  const lines: (TombstoneLine | false)[] = [
    { label: "Title", value: project.name, kind: "title" },
    { label: "Date", value: project.dates },
    { label: "Medium", value: project.stack.join(", ") },
    { label: "Attribution", value: getSite().identity.name, kind: "attribution" },
    !!art && { label: "Dimensions", value: art.dimensions, kind: "dimensions" },
    { label: "Accession number", value: accession(`project:${project.slug}`), kind: "accession" },
  ];
  return lines.filter((line): line is TombstoneLine => Boolean(line));
}

function roleLines(role: Role, art?: Artwork): TombstoneLine[] {
  const lines: (TombstoneLine | false)[] = [
    { label: "Title", value: role.title, kind: "title" },
    { label: "Organization", value: [role.organization, role.institution].filter(Boolean).join(", ") },
    { label: "Place", value: role.location },
    { label: "Date", value: role.dates },
    { label: "Attribution", value: getSite().identity.name, kind: "attribution" },
    !!art && { label: "Dimensions", value: art.dimensions, kind: "dimensions" },
    { label: "Accession number", value: accession(`role:${role.slug}`), kind: "accession" },
  ];
  return lines.filter((line): line is TombstoneLine => Boolean(line));
}

export function ProjectExhibit({ project, level, full = false }: { project: Project; level: Level; full?: boolean }) {
  const art = artworkFor(project.slug, project.bullets);
  const label = full ? project.bullets : project.bullets.slice(0, 1);

  return (
    <Exhibit id={project.slug} level={level} heading={project.name} art={art} lines={projectLines(project, art)}>
      {label.map((bullet) => (
        <p key={bullet}>{bullet}</p>
      ))}
      {!full && (
        <p className="label-more">
          <Link href={`/projects/${project.slug}`}>Full label for {project.name}</Link>
        </p>
      )}
    </Exhibit>
  );
}

export function RoleExhibit({ role, level }: { role: Role; level: Level }) {
  const art = artworkFor(role.slug, role.bullets);
  return (
    <Exhibit id={role.slug} level={level} heading={role.organization} art={art} lines={roleLines(role, art)}>
      {role.bullets.map((bullet) => (
        <p key={bullet}>{bullet}</p>
      ))}
    </Exhibit>
  );
}

/** Placard-only exhibits for roles whose figures do not form a drawing. */
export function WallLabels({ roles, level }: { roles: Role[]; level: Level }) {
  return roles.map((role) => (
    <Exhibit key={role.slug} id={role.slug} level={level} heading={role.organization} lines={roleLines(role)}>
      {role.bullets.map((bullet) => (
        <p key={bullet}>{bullet}</p>
      ))}
    </Exhibit>
  ));
}

export function Checklist({
  entries,
  heading,
  level: Heading,
  id,
}: {
  entries: ChecklistEntry[];
  heading: string;
  level: Level;
  id: string;
}) {
  return (
    <nav className="checklist" aria-labelledby={id}>
      <Heading id={id} className="checklist-title">
        {heading}
      </Heading>
      <ol>
        {entries.map((entry) => (
          <li key={entry.key}>
            <Link href={entry.href} className="checklist-row">
              <span className="checklist-accession">{entry.accession}</span>
              <span className="checklist-name">{entry.title}</span>
              <span className="checklist-dates">{entry.dates}</span>
              <span className="checklist-detail">{entry.detail}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}