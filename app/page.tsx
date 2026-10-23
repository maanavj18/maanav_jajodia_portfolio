import Link from "next/link";
import { f1Scale, leadFigureEnd, leadPhrase, tableRows } from "@/lib/apparatus";
import { getSite } from "@/lib/content";
import { CiteBlock } from "./_components/cite";
import { ScaleFigure } from "./_components/figures";
import { Prose } from "./_components/prose";
import { ResultsTable } from "./_components/results-table";
import { noteCounter, Sidenote } from "./_components/sidenote";
import { statementId, Statements } from "./_components/statements";

export default function Home() {
  const { identity, education, experience, projects, skills } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const next = noteCounter();

  const libraries = skills.find((group) => group.label === "Libraries")?.items ?? [];
  const keywords = [education.specialization, education.minor, ...libraries].filter(Boolean);

  const research = featured ? 1 : 0;
  const projectsNo = research + 1;
  const educationNo = projectsNo + (projects.length > 0 ? 1 : 0);
  const projectNo = (i: number) => `${projectsNo}.${i + 1}`;

  const scale = featured ? f1Scale(featured.bullets) : undefined;
  const rows = featured ? tableRows(featured.slug, featured.bullets) : [];

  const cited = [
    ...(featured
      ? [
          {
            phrase: leadPhrase(featured.slug, featured.bullets),
            note: (
              <>
                {featured.title}, <Prose text={featured.organization} />, {featured.dates}. See{" "}
                <a href="#research">§{research}</a>.
              </>
            ),
          },
        ]
      : []),
    ...projects.map((project, i) => ({
      phrase: leadPhrase(project.slug, project.bullets),
      note: (
        <>
          {project.name}, {project.dates}. See <a href={`#${project.slug}`}>§{projectNo(i)}</a>.
        </>
      ),
    })),
  ].filter((entry) => entry.phrase);

  return (
    <article className="sheet">
      <header className="front">
        <h1 className="title">{identity.name}</h1>
        <p className="affil">
          {education.college}, {education.school}, <Prose text={education.location} />
        </p>
        <p className="corr">
          <span className="runin">Correspondence</span> <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <span className="sep" aria-hidden="true">
            {" · "}
          </span>
          <a href={identity.github}>github.com/{identity.githubHandle}</a>
          <span className="sep" aria-hidden="true">
            {" · "}
          </span>
          <a href={identity.resumeHref}>Resume (PDF)</a>
        </p>
      </header>

      <section className="abstract" aria-labelledby="abstract-heading">
        <p>
          <span className="runin" id="abstract-heading">
            Abstract
          </span>{" "}
          <Prose text={identity.headline} />{" "}
          {featured && (
            <>
              Section <a href="#research">{research}</a> reports the {featured.title} role in the{" "}
              <Prose text={featured.organization} />
              {projects.length > 0 ? "; " : ". "}
            </>
          )}
          {projects.length > 0 && (
            <>
              <a href="#projects">§{projectsNo}</a> describes{" "}
              {projects.map((project, i) => (
                <span key={project.slug}>
                  {i > 0 && (i === projects.length - 1 ? " and " : ", ")}
                  {project.name} (<a href={`#${project.slug}`}>§{projectNo(i)}</a>)
                </span>
              ))}
              ;{" "}
            </>
          )}
          <a href="#education">§{educationNo}</a> gives education.
        </p>
        {cited.length > 0 && (
          <p>
            <span className="runin">Selected figures</span>{" "}
            {cited.map((entry, i) => (
              <span key={entry.phrase}>
                <Prose text={entry.phrase ?? ""} />
                <Sidenote n={next()}>{entry.note}</Sidenote>
                {i < cited.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
        )}
        {keywords.length > 0 && (
          <p className="keywords">
            <span className="runin">Keywords</span>{" "}
            {keywords.map((word, i) => (
              <span key={word}>
                {i > 0 && "; "}
                <Prose text={word} />
              </span>
            ))}
          </p>
        )}
      </section>

      {featured && (
        <section id="research" className="section" aria-labelledby="research-heading">
          <h2 id="research-heading">
            <span className="hang secno">{research}</span> Research
          </h2>
          <h3 className="role">
            {featured.title}, <Prose text={featured.organization} />
          </h3>
          <p className="meta">
            {[featured.institution, featured.location].filter(Boolean).join(", ")}. {featured.dates}.
          </p>
          <Statements prefix={`${research}`} slug={featured.slug} bullets={featured.bullets} />
          <ResultsTable
            id="table-1"
            label="Table 1"
            caption={`${featured.organization} results, by statement.`}
            rows={rows.map((row) => ({
              ...row,
              ref: { href: `#${statementId(`${research}`, row.statement)}`, label: `${research}.${row.statement}` },
            }))}
          />
          {scale && (
            <ScaleFigure
              id="figure-1"
              label="Figure 1"
              scale={scale}
              statementHref={`#${statementId(`${research}`, scale.statement)}`}
              statementLabel={`${research}.${scale.statement}`}
            />
          )}
          <p className="xref">
            Leadership roles continue in <Link href="/experience#leadership">Experience, §2</Link>.
          </p>
        </section>
      )}

      {projects.length > 0 && (
        <section id="projects" className="section" aria-labelledby="projects-heading">
          <h2 id="projects-heading">
            <span className="hang secno">{projectsNo}</span> Projects
          </h2>
          {projects.map((project, i) => {
            const lead = project.bullets[0];
            const end = lead ? leadFigureEnd(project.slug, lead) : undefined;
            return (
              <article key={project.slug} id={project.slug} className="entry" aria-labelledby={`${project.slug}-heading`}>
                <h3 id={`${project.slug}-heading`} className="entry-title">
                  <span className="hang subno">{projectNo(i)}</span>{" "}
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h3>
                <p className="meta">
                  {project.dates}. <Prose text={project.stack.join(", ")} />.
                </p>
                {lead && (
                  <p>
                    {end !== undefined ? (
                      <>
                        <Prose text={lead.slice(0, end)} />
                        <Sidenote n={next()}>
                          Statement 1.1 of the <Link href={`/projects/${project.slug}`}>{project.name}</Link> page,
                          which tabulates the remaining figures in Table 1.
                        </Sidenote>
                        <Prose text={lead.slice(end)} />
                      </>
                    ) : (
                      <Prose text={lead} />
                    )}
                  </p>
                )}
              </article>
            );
          })}
        </section>
      )}

      <section id="education" className="section" aria-labelledby="education-heading">
        <h2 id="education-heading">
          <span className="hang secno">{educationNo}</span> Education
        </h2>
        <p>
          {education.degree}
          {education.coursework.length > 0 && (
            <Sidenote n={next()}>
              Coursework: <Prose text={education.coursework.join("; ")} />.
            </Sidenote>
          )}
          , {education.college}, {education.school}, <Prose text={education.location} />. Expected{" "}
          {education.expectedGraduation}.
        </p>
        <p>
          <Prose text="GPA" /> {education.gpa}. Minor in {education.minor}; specialization in{" "}
          {education.specialization}.
        </p>
      </section>

      <CiteBlock author={identity.name} title="Portfolio" path="/" />
    </article>
  );
}
