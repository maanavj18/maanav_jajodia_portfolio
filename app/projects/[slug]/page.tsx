import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { Story } from "@/components/story";
import { ProjectByline, projectDetails } from "@/components/bylines";
import { getProject, getSite } from "@/lib/content";
import { splitLead } from "@/lib/headline";

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
      <Masthead current="projects" />
      <main id="main" className="sheet inside article">
        <p className="jump jump--from">
          <Link href="/projects">Continued from Projects</Link>
        </p>
        <Story
          id={`story-${project.slug}`}
          size="lead"
          level={1}
          kicker={project.name}
          lead={project.bullets[0]}
          body={project.bullets.slice(1)}
          byline={<ProjectByline project={project} />}
          details={projectDetails(project)}
        />
        {others.length > 0 && (
          <aside className="also" aria-labelledby="also-flag">
            <h2 id="also-flag" className="flag">
              Also in Projects
            </h2>
            <ul>
              {others.map((other) => (
                <li key={other.slug}>
                  <span className="kicker">{other.name}</span>
                  <Link href={`/projects/${other.slug}`} className="also-head">
                    {splitLead(other.bullets[0]).head}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
    </>
  );
}