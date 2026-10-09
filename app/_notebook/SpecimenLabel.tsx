import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/content";
import type { SpecimenLeaf } from "./folios";

type Props = {
  project: Project;
  leaf: SpecimenLeaf;
  heading: "h1" | "h2" | "h3";
  /** Link the name to the specimen's own page. */
  linked?: boolean;
  collector?: string;
  remarks?: ReactNode;
  size?: "plate" | "slip";
};

export function SpecimenLabel({ project, leaf, heading: Heading, linked, collector, remarks, size = "slip" }: Props) {
  return (
    <div className={`specimen specimen--${size}`}>
      <p className="specimen__header">
        Specimen <span className="specimen__no">No. {leaf.specimen}</span>
      </p>
      <Heading className="specimen__name">
        {linked ? <Link href={leaf.href}>{project.name}</Link> : project.name}
      </Heading>
      <dl className="specimen__fields">
        <div>
          <dt>Collected</dt>
          <dd className="specimen__dates">{project.dates}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
        </div>
        {collector && (
          <div>
            <dt>Coll.</dt>
            <dd>{collector}</dd>
          </div>
        )}
        {remarks && (
          <div className="specimen__remarks">
            <dt>Remarks</dt>
            <dd>{remarks}</dd>
          </div>
        )}
      </dl>
      {linked && (
        <p className="specimen__ref" aria-hidden="true">
          p.&nbsp;{leaf.folio}
        </p>
      )}
    </div>
  );
}
