import Link from "next/link";
import { Figure, Meta, Module } from "@/components/poster";
import { getSite } from "@/lib/content";
import { figuresFor } from "@/lib/figures";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const stroke = projects.find((project) => project.slug === "stroke-analysis");
  const [given, ...rest] = identity.name.split(" ");
  const family = rest.join(" ");

  const lab = featured ? figuresFor(featured.slug, featured.bullets) : [];
  const f1 = lab.find((figure) => figure.value === "0.79");
  const hpc = lab.find((figure) => figure.value === "96");
  const fps = stroke
    ? figuresFor(stroke.slug, stroke.bullets).find((figure) => figure.value === "30+")
    : undefined;

  return (
    <>
      <section
        className={`bill${f1 ? "" : " bill-no-hero"}${hpc || fps ? "" : " bill-no-pair"}`}
        aria-label={identity.name}
      >
        <p className="spine">{education.location}</p>
        <h1 className="bill-name">
          <span>{given}</span>
          {family ? <span>{family}</span> : null}
        </h1>
        <div className="lede">
          <p className="headline">{identity.headline}</p>
          <p className="audience">{identity.audience}</p>
        </div>
        {f1 ? (
          <Figure className="on-red figure-hero" value={f1.value} unit={f1.unit} caption={f1.caption} />
        ) : null}
        {featured ? (
          <article className="role">
            <h2>
              <Link href="/experience">{featured.organization}</Link>
            </h2>
            <p className="role-title">{featured.title}</p>
            <Meta parts={[featured.institution, featured.location, featured.dates]} />
          </article>
        ) : null}
        {hpc || fps ? (
          <div className="figure-pair">
            {hpc ? <Figure className="figure-side" value={hpc.value} unit={hpc.unit} caption={hpc.caption} /> : null}
            {fps ? <Figure className="figure-side" value={fps.value} unit={fps.unit} caption={fps.caption} /> : null}
          </div>
        ) : null}
        {projects.length > 0 ? (
          <div className="bill-projects">
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <h2>
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h2>
                  <p className="tabular meta-line">{project.dates}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <Module />

      <section className="credits" aria-labelledby="education-heading">
        <h2 id="education-heading" className="credits-title">
          education
        </h2>
        <dl className="credit-list">
          <div className="credit-row">
            <dt>school</dt>
            <dd>{education.school}</dd>
          </div>
          <div className="credit-row">
            <dt>college</dt>
            <dd>{education.college}</dd>
          </div>
          <div className="credit-row">
            <dt>location</dt>
            <dd>{education.location}</dd>
          </div>
          <div className="credit-row">
            <dt>degree</dt>
            <dd className="prose">{education.degree}</dd>
          </div>
          <div className="credit-row">
            <dt>minor</dt>
            <dd>{education.minor}</dd>
          </div>
          <div className="credit-row">
            <dt>specialization</dt>
            <dd>{education.specialization}</dd>
          </div>
          {education.coursework.length > 0 ? (
            <div className="credit-row">
              <dt>coursework</dt>
              <dd>
                <ul className="course-list">
                  {education.coursework.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
        <Figure
          className="on-red gpa-figure"
          value={education.gpa}
          caption={`GPA, expected graduation ${education.expectedGraduation}`}
        />
      </section>
    </>
  );
}
