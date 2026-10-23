import Link from "next/link";
import { Masthead } from "@/components/masthead";
import { Story } from "@/components/story";
import { ProjectByline, RoleByline, roleDetails } from "@/components/bylines";
import { getSite } from "@/lib/content";

export default function Home() {
  const { identity, education, experience, leadership, projects, skills, interests } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];

  const index = [
    ...(featured ? [{ label: featured.organization, page: "Experience", href: "/experience" }] : []),
    ...projects.map((project) => ({ label: project.name, page: "Projects", href: `/projects/${project.slug}` })),
    ...(leadership.length > 0 ? [{ label: "Leadership", page: "Experience", href: "/experience#leadership" }] : []),
    ...(skills.length > 0 ? [{ label: "Skills", page: "Experience", href: "/experience#skills" }] : []),
    ...(interests.length > 0 ? [{ label: "Interests", page: "Interests", href: "/interests" }] : []),
  ];

  return (
    <>
      <Masthead current="front" />
      <main id="main" className="sheet front">
        {featured && (
          <Story
            id={`story-${featured.slug}`}
            className="front-lead"
            size="lead"
            level={2}
            kicker={featured.organization}
            lead={featured.bullets[0]}
            body={featured.bullets.slice(1)}
            columns={2}
            dateline={featured.location}
            byline={<RoleByline role={featured} />}
            details={roleDetails(featured)}
            jump={{ href: "/experience", label: "Experience" }}
          />
        )}

        <aside className="rail" aria-label="Index">
          <section aria-labelledby="index-flag">
            <h2 id="index-flag" className="flag">
              Index
            </h2>
            <ul className="index">
              {index.map((entry) => (
                <li key={entry.href}>
                  <Link href={entry.href}>
                    <span className="index-label">{entry.label}</span>
                    <span className="index-leader" aria-hidden="true" />
                    <span className="index-page">{entry.page}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a href={identity.resumeHref}>
                  <span className="index-label">Resume</span>
                  <span className="index-leader" aria-hidden="true" />
                  <span className="index-page">PDF</span>
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="education-flag" className="education">
            <h2 id="education-flag" className="flag">
              Education
            </h2>
            <p className="education-school">{education.school}</p>
            <p className="education-line">
              {education.college}, {education.location}
            </p>
            <p className="education-line">{education.degree}</p>
            <dl className="agate">
              <div>
                <dt>Expected</dt>
                <dd>{education.expectedGraduation}</dd>
              </div>
              <div>
                <dt>GPA</dt>
                <dd>{education.gpa}</dd>
              </div>
              <div>
                <dt>Minor</dt>
                <dd>{education.minor}</dd>
              </div>
              <div>
                <dt>Specialization</dt>
                <dd>{education.specialization}</dd>
              </div>
            </dl>
            {education.coursework.length > 0 && (
              <p className="coursework">
                <span className="run-in">Coursework.</span> {education.coursework.join("; ")}.
              </p>
            )}
          </section>
          <section aria-labelledby="contact-flag" className="contact">
            <h2 id="contact-flag" className="flag">
              Contact
            </h2>
            <dl className="agate">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${identity.email}`}>{identity.email}</a>
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href={identity.github}>github.com/{identity.githubHandle}</a>
                </dd>
              </div>
              <div>
                <dt>Resume</dt>
                <dd>
                  <a href={identity.resumeHref}>PDF</a>
                </dd>
              </div>
            </dl>
          </section>
        </aside>

        {projects.length > 0 && (
          <div className="front-projects">
            {projects.map((project) => (
              <Story
                key={project.slug}
                id={`story-${project.slug}`}
                size="major"
                level={2}
                kicker={project.name}
                href={`/projects/${project.slug}`}
                lead={project.bullets[0]}
                body={project.bullets.slice(1)}
                columns={2}
                byline={<ProjectByline project={project} />}
                jump={{ href: `/projects/${project.slug}`, label: "Projects" }}
              />
            ))}
          </div>
        )}

        {leadership.length > 0 && (
          <section className="briefs" aria-labelledby="briefs-flag">
            <h2 id="briefs-flag" className="flag">
              Leadership in brief
            </h2>
            <div className="briefs-row">
              {leadership.map((role) => (
                <Story
                  key={role.slug}
                  id={`brief-${role.slug}`}
                  size="brief"
                  level={3}
                  kicker={role.organization}
                  lead={role.bullets[0]}
                  body={role.bullets.slice(1, 2)}
                  columns={2}
                  byline={<RoleByline role={role} />}
                  jump={{ href: "/experience#leadership", label: "Experience" }}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}