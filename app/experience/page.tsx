import type { Metadata } from "next";
import { getSite, type Role } from "@/lib/content";
import { Particulars, typeset } from "../_components/particulars";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = { title: "Experience" };

function RoleEntry({ role }: { role: Role }) {
  return (
    <section id={role.slug} className="entry" aria-labelledby={`${role.slug}-name`}>
      <h3 id={`${role.slug}-name`}>{typeset(role.organization)}</h3>
      <Particulars
        rows={[
          ["Title", role.title],
          ["Institution", role.institution],
          ["Location", role.location],
          ["Dates", role.dates],
        ]}
      />
      <ul>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{typeset(bullet)}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <SiteHeader current="experience" />
      <main id="main">
        <h1>Experience</h1>
        {experience.length > 0 && (
          <section aria-labelledby="research">
            <h2 id="research">Research</h2>
            {experience.map((role) => (
              <RoleEntry key={role.slug} role={role} />
            ))}
          </section>
        )}
        {leadership.length > 0 && (
          <section aria-labelledby="leadership">
            <h2 id="leadership">Leadership</h2>
            {leadership.map((role) => (
              <RoleEntry key={role.slug} role={role} />
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section aria-labelledby="skills">
            <h2 id="skills">Skills</h2>
            <dl className="skills">
              {skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>
    </>
  );
}