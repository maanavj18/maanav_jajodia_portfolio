import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { getSite } from "@/lib/content";
import { lines, toFigure } from "@/lib/figures";
import { Lines, Meta, Morph, RoleBlock, SpecimenLine, fit } from "./_components/specimen";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured);
  const words = identity.name.split(" ");
  const nameplate = {
    "--name-chars": identity.name.length,
    "--word-chars": Math.max(...words.map((word) => word.length)),
  } as CSSProperties;

  return (
    <>
      <section className="hero wrap" aria-labelledby="name">
        <div className="nameplate" style={nameplate}>
          <h1 id="name" className="nameplate__name">
            {words.map((word, index) => (
              <Fragment key={word}>
                {index > 0 && " "}
                <Morph>{word}</Morph>
              </Fragment>
            ))}
          </h1>
          <p className="axis" aria-hidden="true" />
        </div>

        <div className="hero__body">
          <div>
            <p className="lead">{identity.headline}</p>
            <ul className="contact">
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
          </div>

          <nav className="contents" aria-label="Research and projects">
            <ul>
              {featured && (
                <li>
                  <Link href="/experience">
                    <span className="contents__kind">Research</span>
                    <span className="contents__title">
                      {featured.organization}
                      <span className="contents__sub">{featured.title}</span>
                    </span>
                    <span className="contents__dates">{featured.dates}</span>
                  </Link>
                </li>
              )}
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>
                    <span className="contents__kind">Project</span>
                    <span className="contents__title">
                      {project.name}
                      <span className="contents__sub">{project.stack.join(", ")}</span>
                    </span>
                    <span className="contents__dates">{project.dates}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {featured && (
        <section className="scene scene--full scene--ink" aria-label="Research">
          <div className="wrap">
            <RoleBlock role={featured} heading="h2" />
            <p className="more">
              <Link href="/experience">All experience</Link>
            </p>
          </div>
        </section>
      )}

      {projects.map((project, index) => (
        <section
          key={project.slug}
          className={index % 2 === 0 ? "scene scene--full" : "scene scene--full scene--ink"}
          aria-labelledby={`scene-${project.slug}`}
        >
          <div className="wrap">
            <header className="head">
              <div className="fit" style={fit(project.name)}>
                <h2 id={`scene-${project.slug}`} className="display">
                  {project.name}
                </h2>
              </div>
              <Meta lead={project.dates} rest={project.stack.join(", ")} />
            </header>
            <Lines items={lines(project.slug, project.bullets)} />
            <p className="more">
              <Link href={`/projects/${project.slug}`}>{project.name} project page</Link>
            </p>
          </div>
        </section>
      ))}

      <section className="scene scene--short" aria-labelledby="scene-education">
        <div className="wrap">
          <header className="head">
            <div className="fit" style={fit("Education")}>
              <h2 id="scene-education" className="display display--role">
                Education
              </h2>
            </div>
            <Meta lead={education.school} rest={`${education.college} \u00b7 ${education.location}`} />
          </header>
          <ul className="lines">
            <SpecimenLine figure={toFigure(education.gpa.split("/")[0] || education.gpa)}>
              GPA <strong>{education.gpa}</strong>. {education.degree}, expected {education.expectedGraduation}.
              Minor in {education.minor}. Specialization in {education.specialization}.
            </SpecimenLine>
            {education.coursework.length > 0 && (
              <SpecimenLine>Coursework: {education.coursework.join(", ")}.</SpecimenLine>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}