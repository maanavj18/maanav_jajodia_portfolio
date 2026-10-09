import type { Metadata } from "next";
import { getSite, type Role } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

function RoleEntry({ role }: { role: Role }) {
  return (
    <article>
      <h3>
        {role.title}, {role.organization}
      </h3>
      <p>
        {[role.institution, role.location, role.dates].filter(Boolean).join(" · ")}
      </p>
      <ul>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <h1>Experience</h1>
      {experience.length > 0 && (
        <section>
          <h2>Research</h2>
          {experience.map((role) => (
            <RoleEntry key={role.slug} role={role} />
          ))}
        </section>
      )}
      {leadership.length > 0 && (
        <section>
          <h2>Leadership</h2>
          {leadership.map((role) => (
            <RoleEntry key={role.slug} role={role} />
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <dl>
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}
