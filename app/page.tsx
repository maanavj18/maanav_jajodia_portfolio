import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";
import { Plate } from "@/components/plate";
import { PullFigure } from "@/components/pull-figure";
import { Spread } from "@/components/spread";
import { getSite } from "@/lib/content";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured);

  return (
    <>
      <section className="cover">
        <div className="cover-grid">
          <div className="masthead">
            <DisplayTitle as="h1" size="xl" weight={400} tilt="-1.6deg" settle className="display-oneline">
              {identity.name}
            </DisplayTitle>
          </div>
          <p className="headline">{identity.headline}</p>
          <ul className="contacts">
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
          <Overprint />
        </div>
      </section>

      <Spread className="spread-drop-right">
        {featured ? (
          <Plate
            title={featured.organization}
            href="/experience"
            tilt="2.2deg"
            meta={
              <>
                <p className="meta">
                  {[featured.title, featured.institution, featured.location].filter(Boolean).join(", ")}
                </p>
                <p className="meta num">{featured.dates}</p>
              </>
            }
          >
            <PullFigure bullet={featured.bullets[0]} value="0.79" unit="F1" />
          </Plate>
        ) : null}
        <section>
          <h2 className="section-head">
            <DisplayTitle as="span" size="md" tilt="-2.4deg">
              Projects
            </DisplayTitle>
          </h2>
          {projects.map((project, index) => (
            <Plate
              key={project.slug}
              level="h3"
              size="md"
              title={project.name}
              href={`/projects/${project.slug}`}
              tilt={index % 2 === 0 ? "2.8deg" : "-2.1deg"}
              meta={<p className="meta num">{project.dates}</p>}
            >
              <p className="stack">{project.stack.join(", ")}</p>
              <p className="measure lede">{project.bullets[0]}</p>
            </Plate>
          ))}
        </section>
      </Spread>

      <section className="chapter-ruled">
        <h2 className="section-head">
          <DisplayTitle as="span" size="md" tilt="1.8deg">
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
      </section>
    </>
  );
}
