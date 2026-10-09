import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Board } from "@/components/board";
import { DirectionArrow } from "@/components/pictograms";
import { getProject, getSite } from "@/lib/content";
import { projectDeparture, projectFigure, typographic } from "@/lib/departures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSite().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name } : { title: "No service" };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const figure = projectFigure(project);
  const row = { ...projectDeparture(project), href: undefined };

  return (
    <>
      <header className="sign">
        <p className="back">
          <Link href="/projects">
            <DirectionArrow direction="left" />
            Projects
          </Link>
        </p>
        <h1>{project.name}</h1>
      </header>
      <Board id={project.slug} caption="DEPARTURES" rows={[row]}>
        <article className="record" data-line="projects">
          {figure ? (
            <p className="figure">
              <span className="figure-value">{figure.value}</span>
              <span className="figure-unit">{figure.unit}</span>
            </p>
          ) : null}
          <h2>Notes</h2>
          <ul className="notes">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{typographic(bullet)}</li>
            ))}
          </ul>
          {project.goal ? (
            <section>
              <h2>Goal</h2>
              <p className="prose">{typographic(project.goal)}</p>
            </section>
          ) : null}
          {project.demoUrl || project.repoUrl ? (
            <section>
              <h2>Links</h2>
              <ul className="link-row">
                {project.demoUrl ? (
                  <li>
                    <a href={project.demoUrl}>Demo</a>
                  </li>
                ) : null}
                {project.repoUrl ? (
                  <li>
                    <a href={project.repoUrl}>Repository</a>
                  </li>
                ) : null}
              </ul>
            </section>
          ) : null}
        </article>
      </Board>
    </>
  );
}
