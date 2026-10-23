import type { Metadata } from "next";
import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Story } from "@/components/story";
import { RoleByline, roleDetails } from "@/components/bylines";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();

  return (
    <>
      <Masthead current="experience" />
      <main id="main" className="sheet inside">
        <h1 className="section-flag">Experience</h1>
        <p className="jump jump--from">
          <Link href="/">Continued from the front page</Link>
        </p>

        {experience.length > 0 && (
          <section id="research" aria-labelledby="research-flag" className="desk">
            <h2 id="research-flag" className="flag">
              Research
            </h2>
            {experience.map((role) => (
              <Story
                key={role.slug}
                id={`story-${role.slug}`}
                size="lead"
                level={3}
                kicker={role.organization}
                lead={role.bullets[0]}
                body={role.bullets.slice(1)}
                dateline={role.location}
                columns={2}
                byline={<RoleByline role={role} />}
                details={roleDetails(role)}
              />
            ))}
          </section>
        )}

        {leadership.length > 0 && (
          <section id="leadership" aria-labelledby="leadership-flag" className="desk">
            <h2 id="leadership-flag" className="flag">
              Leadership
            </h2>
            {leadership.map((role) => (
              <Story
                key={role.slug}
                id={`story-${role.slug}`}
                size="major"
                level={3}
                kicker={role.organization}
                lead={role.bullets[0]}
                body={role.bullets.slice(1)}
                dateline={role.location}
                columns={2}
                byline={<RoleByline role={role} />}
              />
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section id="skills" aria-labelledby="skills-flag" className="desk">
            <h2 id="skills-flag" className="flag">
              Skills
            </h2>
            <dl className="listings">
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