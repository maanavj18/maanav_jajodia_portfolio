import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getSite } from "@/lib/content";
import { accession } from "@/lib/exhibits";
import { ProjectExhibit } from "../../components/exhibit";

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

  const { projects } = getSite();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  return (
    <>
      <p className="crumb">
        <Link href="/projects">Projects</Link>
        <span aria-hidden="true"> / </span>
        <span className="numeric">{accession(`project:${project.slug}`)}</span>
      </p>

      <ProjectExhibit project={project} level="h1" full />

      {project.goal && (
        <section className="wall-text" aria-labelledby="goal">
          <h2 id="goal" className="room-title">
            Goal
          </h2>
          <p className="wall-text-lead">{project.goal}</p>
        </section>
      )}

      {(project.demoUrl || project.repoUrl) && (
        <section className="wall-text" aria-labelledby="links">
          <h2 id="links" className="room-title">
            Links
          </h2>
          <ul className="contact">
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

      {next && (
        <nav className="next-exhibit" aria-label="Next exhibit">
          <Link href={`/projects/${next.slug}`}>
            <span className="next-label">
              Next exhibit, <span className="numeric">{accession(`project:${next.slug}`)}</span>
            </span>
            <span className="next-title">{next.name}</span>
          </Link>
        </nav>
      )}
    </>
  );
}