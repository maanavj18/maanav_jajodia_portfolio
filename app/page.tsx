import { ProjectTable } from "@/components/project-table";
import { getSite } from "@/lib/content";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured);

  return (
    <>
      <h1>{identity.name}</h1>
      <p>{identity.headline}</p>
      <address>
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
        <a href={identity.github}>github.com/{identity.githubHandle}</a>
        <a href={identity.resumeHref}>Resume (PDF)</a>
      </address>

      {projects.length > 0 ? (
        <section className="space-30" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <ProjectTable projects={projects} labelledBy="projects-heading" />
        </section>
      ) : null}

      {featured ? (
        <section className="loud space-60" aria-labelledby="lab-heading">
          <h2 id="lab-heading">
            {featured.title}, {featured.organization}
          </h2>
          <dl className="inline-facts">
            {featured.institution ? (
              <div>
                <dt>Institution</dt>
                <dd>{featured.institution}</dd>
              </div>
            ) : null}
            <div>
              <dt>Location</dt>
              <dd>{featured.location}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd className="nums">{featured.dates}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      {featured ? (
        <section className="space-90" aria-labelledby="research-heading">
          <h2 id="research-heading">Research</h2>
          <ul>
            {featured.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-120" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <dl>
          <dt>School</dt>
          <dd>{education.school}</dd>
          <dt>College</dt>
          <dd>{education.college}</dd>
          <dt>Location</dt>
          <dd>{education.location}</dd>
          <dt>Degree</dt>
          <dd>{education.degree}</dd>
          <dt>Expected graduation</dt>
          <dd className="nums">{education.expectedGraduation}</dd>
          <dt>GPA</dt>
          <dd className="nums">{education.gpa}</dd>
          <dt>Minor</dt>
          <dd>{education.minor}</dd>
          <dt>Specialization</dt>
          <dd>{education.specialization}</dd>
          <dt>Coursework</dt>
          <dd>{education.coursework.join("; ")}</dd>
        </dl>
      </section>
    </>
  );
}
