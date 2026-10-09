import Link from "next/link";
import { getSite } from "@/lib/content";
import { Particulars, typeset } from "./_components/particulars";
import { SiteHeader } from "./_components/site-header";

export default function Home() {
  const { identity, education, experience, leadership, projects } = getSite();
  const featured = experience.find((role) => role.featured);

  return (
    <>
      <SiteHeader current="home" />
      <main id="main">
        <section className="masthead" aria-labelledby="name">
          <h1 id="name">{identity.name}</h1>
          <p className="headline">{identity.headline}</p>
          <address>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
            <a href={identity.resumeHref}>Resume (PDF)</a>
          </address>
        </section>

        <table className="index">
          <caption>Index</caption>
          <thead>
            <tr>
              <th scope="col">Entry</th>
              <th scope="col">Dates</th>
            </tr>
          </thead>
          {experience.length > 0 && (
            <tbody>
              <tr>
                <th scope="rowgroup" colSpan={2}>
                  Research
                </th>
              </tr>
              {experience.map((role) => (
                <tr key={role.slug}>
                  <td>
                    <Link href={`/experience#${role.slug}`}>{role.organization}</Link>, {role.title}
                  </td>
                  <td className="dates">{role.dates}</td>
                </tr>
              ))}
            </tbody>
          )}
          {projects.length > 0 && (
            <tbody>
              <tr>
                <th scope="rowgroup" colSpan={2}>
                  Projects
                </th>
              </tr>
              {projects.map((project) => (
                <tr key={project.slug}>
                  <td>
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link><span className="stack"> ({project.stack.join(", ")})</span>
                  </td>
                  <td className="dates">{project.dates}</td>
                </tr>
              ))}
            </tbody>
          )}
          {leadership.length > 0 && (
            <tbody>
              <tr>
                <th scope="rowgroup" colSpan={2}>
                  Leadership
                </th>
              </tr>
              {leadership.map((role) => (
                <tr key={role.slug}>
                  <td>
                    <Link href={`/experience#${role.slug}`}>{role.organization}</Link>, {role.title}
                  </td>
                  <td className="dates">{role.dates}</td>
                </tr>
              ))}
            </tbody>
          )}
          <tbody>
            <tr>
              <th scope="rowgroup" colSpan={2}>
                Education
              </th>
            </tr>
            <tr>
              <td>
                <Link href="#education">{education.school}</Link>, {education.degree}
              </td>
              <td className="dates">Expected {education.expectedGraduation}</td>
            </tr>
          </tbody>
        </table>

        {featured && (
          <section aria-labelledby="research">
            <h2 id="research">{featured.organization}</h2>
            <p className="byline">
              {[featured.title, featured.institution, featured.dates].filter(Boolean).join(", ")}
            </p>
            <ul>
              {featured.bullets.map((bullet) => (
                <li key={bullet}>{typeset(bullet)}</li>
              ))}
            </ul>
            <p>
              <Link href="/experience">All experience</Link>
            </p>
          </section>
        )}

        <section aria-labelledby="education">
          <h2 id="education">Education</h2>
          <Particulars
            rows={[
              ["School", education.school],
              ["College", education.college],
              ["Location", education.location],
              ["Degree", education.degree],
              ["Specialization", education.specialization],
              ["Minor", education.minor],
              ["GPA", education.gpa],
              ["Expected graduation", education.expectedGraduation],
              ["Coursework", education.coursework.join("; ")],
            ]}
          />
        </section>
      </main>
    </>
  );
}