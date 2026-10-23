import type { Metadata } from "next";
import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";
import { Plate } from "@/components/plate";
import { PullFigure } from "@/components/pull-figure";
import { Records } from "@/components/records";
import { Spread } from "@/components/spread";
import { getSite, type Role } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

function RolePlate({
  role,
  tilt,
  value,
  unit,
  level = "h2",
}: {
  role: Role;
  tilt: string;
  value?: string;
  unit?: string;
  level?: "h2" | "h3";
}) {
  const lead = role.bullets[0];
  const showPull = Boolean(value && unit && lead?.includes(value) && lead.includes(unit));

  return (
    <Plate
      level={level}
      size={level === "h2" ? "lg" : "md"}
      title={role.organization}
      tilt={tilt}
      meta={
        <>
          <p className="meta">{[role.title, role.institution, role.location].filter(Boolean).join(", ")}</p>
          <p className="meta num">{role.dates}</p>
        </>
      }
    >
      {showPull && value && unit && lead ? (
        <PullFigure bullet={lead} value={value} unit={unit} />
      ) : null}
      <Records items={showPull ? role.bullets.slice(1) : role.bullets} />
    </Plate>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, education, skills } = getSite();

  return (
    <>
      <div className="opener">
        <div className="masthead">
          <DisplayTitle as="h1" size="xl" weight={700} tilt="-1.7deg">
            Experience
          </DisplayTitle>
        </div>
        <Overprint />
      </div>

      <Spread>
        <div>
          {experience.map((role) => (
            <RolePlate key={role.slug} role={role} tilt="2.3deg" value="0.79" unit="F1" />
          ))}
        </div>
        <div>
          {leadership.length > 0 ? (
            <section>
              <h2 className="section-head">
                <DisplayTitle as="span" size="lg" tilt="-2.5deg">
                  Leadership
                </DisplayTitle>
              </h2>
              {leadership.map((role, index) => (
                <RolePlate
                  key={role.slug}
                  role={role}
                  level="h3"
                  tilt={index % 2 === 0 ? "2.4deg" : "-2.2deg"}
                  value={role.slug === "ai-club" ? "$8,000+" : "1480"}
                  unit={role.slug === "ai-club" ? "budget" : "SAT"}
                />
              ))}
            </section>
          ) : null}
        </div>
      </Spread>

      <Spread className="chapter-ruled spread-drop-left">
        <section>
          <h2 className="section-head">
            <DisplayTitle as="span" size="lg" tilt="1.9deg">
              Education
            </DisplayTitle>
          </h2>
          <p className="measure">
            {education.degree}, {education.school}. {education.college}, {education.location}. Expected&nbsp;
            <span className="num">{education.expectedGraduation}</span>.
          </p>
          <p className="measure follow">
            GPA&nbsp;<span className="num">{education.gpa}</span>. Minor in {education.minor}. Specialization in{" "}
            {education.specialization}.
          </p>
          {education.coursework.length > 0 ? (
            <>
              <p className="measure follow-loose">
                <span className="label">Coursework</span>
              </p>
              <Records items={education.coursework} />
            </>
          ) : null}
        </section>
        {skills.length > 0 ? (
          <section>
            <h2 className="section-head">
              <DisplayTitle as="span" size="lg" tilt="-1.8deg">
                Skills
              </DisplayTitle>
            </h2>
            <dl className="skill-index">
              {skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : (
          <div />
        )}
      </Spread>
    </>
  );
}
