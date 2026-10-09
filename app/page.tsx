import Link from "next/link";
import { getSite } from "@/lib/content";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured);

  return (
    <>
      <section>
        <h1>{identity.name}</h1>
        <p>{identity.headline}</p>
        <ul className="inline-list">
          <li>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </li>
          <li>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </li>
          <li>
            <a href={identity.resumeHref}>Resume (PDF)</a>
          </li>
        </ul>
      </section>

      {featured && (
        <section>
          <h2>Research</h2>
          <h3>
            {featured.title}, {featured.organization}
          </h3>
          <p>
            {featured.institution} · {featured.dates}
          </p>
          <ul>
            {featured.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <Link href="/experience">All experience</Link>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link> · {project.dates} ·{" "}
                {project.stack.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>Education</h2>
        <p>
          {education.school}, {education.college}. {education.degree}, expected {education.expectedGraduation}.
        </p>
        <p>
          GPA {education.gpa} · Minor in {education.minor} · Specialization in {education.specialization}
        </p>
      </section>
    </>
  );
}
