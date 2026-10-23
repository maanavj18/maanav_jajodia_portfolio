import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flowFor, tableRows } from "@/lib/apparatus";
import { getProject, getSite } from "@/lib/content";
import { CiteBlock } from "../../_components/cite";
import { FlowFigure } from "../../_components/figures";
import { Prose } from "../../_components/prose";
import { ResultsTable } from "../../_components/results-table";
import { noteCounter } from "../../_components/sidenote";
import { statementId, Statements } from "../../_components/statements";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSite().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { identity, projects } = getSite();
  const others = projects.filter((other) => other.slug !== project.slug);
  const rows = tableRows(project.slug, project.bullets);
  const flow = flowFor(project.slug, project.bullets);
  const anchor = (statement: number) => `#${statementId("1", statement)}`;

  return (
    <article className="sheet">
      <header className="front front--page">
        <nav aria-label="Breadcrumb" className="crumb">
          <Link href="/projects">Projects</Link>
        </nav>
        <h1 className="title title--project">{project.name}</h1>
        <p className="affil">{project.dates}</p>
        <p className="keywords">
          <span className="runin">Keywords</span> <Prose text={project.stack.join("; ")} />
        </p>
        {project.goal && (
          <p className="goal">
            <span className="runin">Goal</span> <Prose text={project.goal} />
          </p>
        )}
      </header>

      <section id="work" className="section" aria-labelledby="work-heading">
        <h2 id="work-heading">
          <span className="hang secno">1</span> What I built
        </h2>
        <Statements
          prefix="1"
          slug={project.slug}
          bullets={project.bullets}
          cite={{
            next: noteCounter(),
            table: { id: "table-1", label: "Table 1" },
            source: (
              <>
                Source: {project.name}, {project.dates}.
              </>
            ),
          }}
        />
        <ResultsTable
          id="table-1"
          label="Table 1"
          caption={`${project.name} figures, by statement.`}
          rows={rows.map((row) => ({
            ...row,
            ref: { href: anchor(row.statement), label: `1.${row.statement}` },
          }))}
        />
        {flow && <FlowFigure id="figure-1" label="Figure 1" flow={flow} prefix="1" anchor={anchor} subject={project.name} />}
      </section>

      {(project.demoUrl || project.repoUrl) && (
        <section id="links" className="section" aria-labelledby="links-heading">
          <h2 id="links-heading">
            <span className="hang secno">2</span> Materials
          </h2>
          <ul className="materials">
            {project.demoUrl && (
              <li>
                <a href={project.demoUrl}>Demo</a>
              </li>
            )}
            {project.repoUrl && (
              <li>
                <a href={project.repoUrl}>Repository</a>
              </li>
            )}
          </ul>
        </section>
      )}

      <CiteBlock
        author={identity.name}
        title={project.name}
        path={`/projects/${project.slug}`}
        keySuffix={project.slug}
        date={project.dates}
        note={project.stack.join(", ")}
      />

      {others.length > 0 && (
        <nav className="see-also" aria-label="Other projects">
          <span className="runin">See also</span>{" "}
          {others.map((other, i) => (
            <span key={other.slug}>
              {i > 0 && "; "}
              <Link href={`/projects/${other.slug}`}>{other.name}</Link>, {other.dates}
            </span>
          ))}
          .
        </nav>
      )}
    </article>
  );
}
