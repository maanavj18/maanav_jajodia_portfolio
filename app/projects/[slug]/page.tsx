import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getSite } from "@/lib/content";

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

  return (
    <article>
      <p className="back">
        <a href="/projects">Projects</a>
      </p>
      <h1>{project.name}</h1>
      <dl>
        <dt>Dates</dt>
        <dd className="nums">{project.dates}</dd>
        <dt>Stack</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      {project.goal ? (
        <section className="space-60">
          <h2>Goal</h2>
          <p>{project.goal}</p>
        </section>
      ) : null}

      <section className="space-60">
        <h2>Work</h2>
        <ul>
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      {project.demoUrl || project.repoUrl ? (
        <section className="space-90">
          <h2>Links</h2>
          <ul>
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
  );
}
