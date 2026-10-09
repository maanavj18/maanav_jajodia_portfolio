import Link from "next/link";
import { Book } from "@/app/_notebook/book";
import { Bullet, Figure, plain } from "@/app/_notebook/copy";
import { specimenNo } from "@/app/_notebook/specimen";
import { getSite } from "@/lib/content";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const opening = featured?.bullets[0];

  return (
    <Book page={1} place="home">
      <div className="sheet">
        <div className="lede">
          <h1>{identity.name}</h1>
          <p className="headline">{plain(identity.headline)}</p>
          <ul className="contacts">
            <li>
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
            </li>
            <li>
              <a href={identity.github} rel="noreferrer">
                github.com/{identity.githubHandle}
              </a>
            </li>
            <li>
              <a href={identity.resumeHref}>Resume (PDF)</a>
            </li>
          </ul>
        </div>

        {featured && (
          <article className="entry follow" aria-labelledby="lab">
            <p className="dateline">
              <time>{featured.dates}</time>
              <span className="sep" aria-hidden="true">
                {" "}
                ·{" "}
              </span>
              <span className="locality">{featured.location}</span>
            </p>
            <h2 id="lab">
              <Link href="/experience">{featured.organization}</Link>
            </h2>
            <p className="rank">
              {featured.institution ? `${plain(featured.title)}, ${featured.institution}` : plain(featured.title)}
            </p>
          </article>
        )}

        {projects.length > 0 && (
          <section className="entry section-gap" aria-labelledby="project-index">
            <h2 id="project-index">Projects</h2>
            <ul className="specimen-index">
              {projects.map((project) => (
                <li key={project.slug} className="specimen-line">
                  <span className="specimen">No.&nbsp;{specimenNo(project.dates)}</span>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <time>{project.dates}</time>
                </li>
              ))}
            </ul>
          </section>
        )}

        {featured && opening && (
          <article className="entry follow" aria-labelledby="lab">
            <Bullet
              text={opening}
              circle="0.79 F1"
              underline="11-point"
              note="0.79 F1 at IoU 0.5"
            />
          </article>
        )}

        <article className="entry later">
          <h2>{education.school}</h2>
          <p className="dateline">
            <span className="specimen">Expected graduation</span>
            <time>{education.expectedGraduation}</time>
            <span className="sep" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
            <span className="locality">{education.location}</span>
          </p>
          <p className="rank">{education.college}</p>
          <p className="prose">
            {education.degree}. Minor in {education.minor}. Specialization in {education.specialization}.
          </p>
          <div className="margin-row">
            <p className="note">GPA {education.gpa}</p>
            <p className="prose">
              GPA <Figure mark="underline">{education.gpa}</Figure>
            </p>
          </div>
          {education.coursework.length > 0 && (
            <p className="prose">Coursework: {education.coursework.join("; ")}.</p>
          )}
        </article>
      </div>
    </Book>
  );
}
