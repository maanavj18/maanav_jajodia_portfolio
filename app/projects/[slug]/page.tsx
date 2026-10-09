import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getSite } from "@/lib/content";
import { Particulars, typeset } from "../../_components/particulars";
import { SiteHeader } from "../../_components/site-header";

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
  const others = getSite().projects.filter((other) => other.slug !== project.slug);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <p className="trail">
          <Link href="/projects">Projects</Link> / {project.name}
        </p>
        <h1>{project.name}</h1>
        <Particulars
          rows={[
            ["Dates", project.dates],
            ["Stack", project.stack.join(", ")],
            ["Demo", project.demoUrl && <a href={project.demoUrl}>{project.demoUrl}</a>],
            ["Repository", project.repoUrl && <a href={project.repoUrl}>{project.repoUrl}</a>],
          ]}
        />

        {project.goal && (
          <section aria-labelledby="goal">
            <h2 id="goal">Goal</h2>
            <p>{typeset(project.goal)}</p>
          </section>
        )}

        <section aria-labelledby="built">
          <h2 id="built">What I built</h2>
          <ul>
            {project.bullets.map((bullet) => (
              <li key={bullet}>{typeset(bullet)}</li>
            ))}
          </ul>
        </section>

        {others.length > 0 && (
          <nav className="trail" aria-label="Other projects">
            {others.length === 1 ? "Other project: " : "Other projects: "}
            {others.map((other, i) => (
              <span key={other.slug}>
                {i > 0 && ", "}
                <Link href={`/projects/${other.slug}`}>{other.name}</Link>
              </span>
            ))}
          </nav>
        )}
      </main>
    </>
  );
}