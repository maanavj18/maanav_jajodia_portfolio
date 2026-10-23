import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Exploded } from "@/components/exploded";
import { LiveMark } from "@/components/live-mark";
import { Notes } from "@/components/notes";
import { SpecTable } from "@/components/spec-table";
import { getProject, getSite } from "@/lib/content";
import { figuresFor, isLive, modelNumber, partsFor, projectSpecRows, typographic } from "@/lib/specs";

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

  const parts = partsFor(project);
  const figures = figuresFor(project);

  return (
    <article className="product">
      <header className="page-head">
        <p className="xref">
          <Link href="/projects">products</Link>
        </p>
        <h1>
          <span className="model">{modelNumber(project)}</span>
          <span>{project.name}</span>
          {isLive(project.dates) ? <LiveMark /> : null}
        </h1>
      </header>

      <div className="product-layout">
        <section aria-labelledby="specs">
          <h2 id="specs">specifications</h2>
          <SpecTable labelledBy="specs" rows={projectSpecRows(project)} />
        </section>
        {parts ? <Exploded parts={parts} /> : null}
      </div>

      <section className="notes-block" aria-labelledby="notes">
        <h2 id="notes">notes</h2>
        <Notes bullets={project.bullets} figures={figures} />
      </section>

      {project.goal ? (
        <section className="notes-block" aria-labelledby="goal">
          <h2 id="goal">goal</h2>
          <p>{typographic(project.goal)}</p>
        </section>
      ) : null}

      {project.demoUrl || project.repoUrl ? (
        <section className="notes-block" aria-labelledby="links">
          <h2 id="links">links</h2>
          <ul className="contacts">
            {project.demoUrl ? (
              <li>
                <a href={project.demoUrl}>demo</a>
              </li>
            ) : null}
            {project.repoUrl ? (
              <li>
                <a href={project.repoUrl}>repository</a>
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}
    </article>
  );
}