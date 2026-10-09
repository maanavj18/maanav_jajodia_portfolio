import type { Metadata } from "next";
import { RoleEntry } from "@/components/role-entry";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <h1>Experience</h1>
      {experience.length > 0 ? (
        <section className="space-30" aria-labelledby="research-heading">
          <h2 id="research-heading">Research</h2>
          {experience.map((role) => (
            <RoleEntry key={role.slug} role={role} />
          ))}
        </section>
      ) : null}
      {leadership.length > 0 ? (
        <section className="space-90" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading">Leadership</h2>
          {leadership.map((role, index) => (
            <div key={role.slug}>
              {index > 0 ? <hr className="break" /> : null}
              <RoleEntry role={role} />
            </div>
          ))}
        </section>
      ) : null}
      {skills.length > 0 ? (
        <section className="space-120" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          <table className="skills" aria-labelledby="skills-heading">
            <thead>
              <tr>
                <th scope="col">Group</th>
                <th scope="col">Items</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((group) => (
                <tr key={group.label}>
                  <th scope="row">{group.label}</th>
                  <td>{group.items.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </>
  );
}
