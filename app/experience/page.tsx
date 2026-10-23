import type { Metadata } from "next";
import { MapCanvas } from "@/components/map-canvas";
import { Marker } from "@/components/markers";
import { Sheet } from "@/components/sheet";
import { getSite, type Role } from "@/lib/content";
import { leadingFigure } from "@/lib/sheet-geo";

export const metadata: Metadata = { title: "Experience" };

const EXPERIENCE_SEED = 88121;
const POSITIONS = ["pos-nw", "pos-se", "pos-sw"];

function RoleRecord({ role, heading }: { role: Role; heading: "h2" | "h3" }) {
  const Title = heading;
  return (
    <article id={role.slug} className="role">
      <Title>{role.organization}</Title>
      <p>
        {role.title}
        {role.institution ? `, ${role.institution}` : ""}
        {`, ${role.location}`}
      </p>
      <p className="label">{role.dates}</p>
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
  const stations = [...experience, ...leadership];
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const f1 = featured ? leadingFigure(featured.bullets, /0\.79/) : undefined;

  return (
    <Sheet title="Experience" current="experience">
      <div className="stations">
        <MapCanvas seed={EXPERIENCE_SEED} size="sheet" coordinates scale elevations>
          {stations.map((role, index) => (
            <a key={role.slug} className={`feature ${POSITIONS[index] ?? "pos-mark"}`} href={`#${role.slug}`}>
              <Marker kind="benchmark" />
              {index === 0 && f1 && <span className="spot">{f1}</span>}
              {index === 0 && <span className="label">F1 at IoU 0.5</span>}
              <p className="place">{role.organization}</p>
              <p>{role.title}</p>
              <p className="label">{role.dates}</p>
            </a>
          ))}
          </MapCanvas>
        {experience.map((role) => (
          <RoleRecord key={role.slug} role={role} heading="h2" />
        ))}
        {leadership.length > 0 && (
          <section className="leadership" aria-labelledby="leadership-title">
            <h2 id="leadership-title" className="section-label">
              Leadership
            </h2>
            {leadership.map((role) => (
              <RoleRecord key={role.slug} role={role} heading="h3" />
            ))}
          </section>
        )}
        {skills.length > 0 && (
          <section aria-labelledby="skills-title">
            <h2 id="skills-title" className="section-label">
              Skills
            </h2>
            <dl className="skills">
              {skills.map((group) => (
                <div key={group.label}>
                  <dt className="label">{group.label}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </Sheet>
  );
}