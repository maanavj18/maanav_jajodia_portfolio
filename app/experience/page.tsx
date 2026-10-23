import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { RoleExhibit, WallLabels } from "../components/exhibit";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Experience</h1>
      </header>

      {experience.length > 0 && (
        <section className="room room-first" aria-labelledby="room-research">
          <h2 id="room-research" className="room-title">
            Research
          </h2>
          {experience.map((role) => (
            <RoleExhibit key={role.slug} role={role} level="h3" />
          ))}
        </section>
      )}

      {leadership.length > 0 && (
        <section className="room room-tight" aria-labelledby="room-leadership">
          <h2 id="room-leadership" className="room-title">
            Leadership
          </h2>
          <WallLabels roles={leadership} level="h3" />
        </section>
      )}

      {skills.length > 0 && (
        <section className="room room-tight" aria-labelledby="room-skills">
          <h2 id="room-skills" className="room-title">
            Skills
          </h2>
          <div className="wall-text">
            <dl className="facts">
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