import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { RoleBlock, fit } from "../_components/specimen";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <header className="page-head wrap">
        <div className="fit" style={fit("Experience")}>
          <h1 className="display display--page">Experience</h1>
        </div>
      </header>

      {experience.length > 0 && (
        <section className="scene scene--ink" aria-labelledby="research">
          <div className="wrap">
            <h2 id="research" className="label">
              Research
            </h2>
            <div className="roles">
              {experience.map((role) => (
                <RoleBlock key={role.slug} role={role} heading="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      {leadership.length > 0 && (
        <section className="scene" aria-labelledby="leadership">
          <div className="wrap">
            <h2 id="leadership" className="label">
              Leadership
            </h2>
            <div className="roles">
              {leadership.map((role) => (
                <RoleBlock key={role.slug} role={role} heading="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="scene scene--short" aria-labelledby="skills">
          <div className="wrap">
            <h2 id="skills" className="label">
              Skills
            </h2>
            <dl className="skills">
              {skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
    </>
  );
}