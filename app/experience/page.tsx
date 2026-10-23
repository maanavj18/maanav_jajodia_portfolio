import type { Metadata } from "next";
import { LiveMark } from "@/components/live-mark";
import { Notes } from "@/components/notes";
import { SpecTable } from "@/components/spec-table";
import { getSite, type Role } from "@/lib/content";
import { figuresFor, isLive, modelNumber, roleSpecRows, typographic, type SpecRow } from "@/lib/specs";

export const metadata: Metadata = { title: "experience" };

function RoleSheet({ role, heading }: { role: Role; heading: "h2" | "h3" }) {
  const titleId = `${role.slug}-title`;
  const Title = heading;
  return (
    <article className="unit">
      <p className="model">{modelNumber(role)}</p>
      <div>
        <div className="title-row">
          <Title id={titleId}>{role.organization}</Title>
          {isLive(role.dates) ? <LiveMark /> : null}
        </div>
        <p className="role-title">{typographic(role.title)}</p>
        <p className="when">{role.dates}</p>
        <SpecTable labelledBy={titleId} rows={roleSpecRows(role)} />
        <Notes bullets={role.bullets} figures={figuresFor(role)} />
      </div>
    </article>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();
  const skillRows: SpecRow[] = skills.map((group) => ({
    label: group.label.toLowerCase(),
    value: group.items.join(", "),
  }));

  return (
    <>
      <header className="page-head">
        <h1>experience</h1>
      </header>

      {experience.length > 0 ? (
        <section className="group" aria-labelledby="research">
          <h2 id="research">research</h2>
          {experience.map((role) => (
            <RoleSheet key={role.slug} role={role} heading="h3" />
          ))}
        </section>
      ) : null}

      {leadership.length > 0 ? (
        <section className="group" aria-labelledby="leadership">
          <h2 id="leadership">leadership</h2>
          {leadership.map((role) => (
            <RoleSheet key={role.slug} role={role} heading="h3" />
          ))}
        </section>
      ) : null}

      {skillRows.length > 0 ? (
        <section className="group" aria-labelledby="skills">
          <h2 id="skills">skills</h2>
          <SpecTable labelledBy="skills" rows={skillRows} />
        </section>
      ) : null}
    </>
  );
}