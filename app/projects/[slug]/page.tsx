import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getSite } from "@/lib/content";
import { lines } from "@/lib/figures";
import { Lines, Meta, fit } from "../../_components/specimen";

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
      <header className="page-head wrap">
        <p className="crumb">
          <Link href="/projects">Projects</Link>
        </p>
        <div className="fit" style={fit(project.name)}>
          <h1 className="display display--page">{project.name}</h1>
        </div>
        <Meta lead={project.dates} rest={project.stack.join(", ")} />
      </header>

      {project.goal && (
        <section className="wrap block" aria-labelledby="goal">
          <h2 id="goal" className="label">
            Goal
          </h2>
          <p className="prose">{project.goal}</p>
        </section>
      )}

      <section className="wrap block" aria-labelledby="built">
        <h2 id="built" className="label">
          What I built
        </h2>
        <Lines items={lines(project.slug, project.bullets)} />
      </section>

      {(project.demoUrl || project.repoUrl) && (
        <section className="wrap block" aria-labelledby="links">
          <h2 id="links" className="label">
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
    </article>
  );
}