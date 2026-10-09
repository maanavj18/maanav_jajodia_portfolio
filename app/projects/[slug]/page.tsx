import type { Metadata } from "next";
import Link from "next/link";
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
      <p>
        <Link href="/projects">Projects</Link>
      </p>
      <h1>{project.name}</h1>
      <p>{project.dates}</p>
      <ul className="inline-list">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {project.goal && (
        <section>
          <h2>Goal</h2>
          <p>{project.goal}</p>
        </section>
      )}

      <section>
        <h2>What I built</h2>
        <ul>
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      {(project.demoUrl || project.repoUrl) && (
        <section>
          <h2>Links</h2>
          <ul className="inline-list">
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
    </article>
  );
}
