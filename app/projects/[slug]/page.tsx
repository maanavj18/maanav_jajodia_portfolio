import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapCanvas } from "@/components/map-canvas";
import { Sheet } from "@/components/sheet";
import { getProject, getSite } from "@/lib/content";
import { seedFromSlug } from "@/lib/relief";
import { leadingFigure } from "@/lib/sheet-geo";

type Props = { params: Promise<{ slug: string }> };

const SPOTS: Record<string, { pattern: RegExp; caption: string }> = {
  "stroke-analysis": { pattern: /501/, caption: "landmarks per frame" },
  flightscope: { pattern: /50k\+/, caption: "flight price records" },
};

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

  const spot = SPOTS[project.slug];
  const figure = spot ? leadingFigure(project.bullets, spot.pattern) : undefined;

  return (
    <Sheet
      title={project.name}
      current="projects"
      kicker={
        <Link className="label" href="/projects">
          Projects
        </Link>
      }
      lede={<p className="label">{project.dates}</p>}
    >
      <div className="dossier">
        <MapCanvas seed={seedFromSlug(project.slug)} size="sheet" coordinates scale elevations>
          <p className="survey-mark pos-mark">
            {figure && <span className="spot">{figure}</span>}
            {spot && <span className="label">{spot.caption}</span>}
          </p>
          </MapCanvas>
        <div className="notes">
          <h2 className="section-label">Stack</h2>
          <p>{project.stack.join(", ")}</p>
          {project.goal && (
            <>
              <h2 className="section-label">Goal</h2>
              <p>{project.goal}</p>
            </>
          )}
          <h2 className="section-label">Field notes</h2>
          <ul>
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          {(project.demoUrl || project.repoUrl) && (
            <>
              <h2 className="section-label">Links</h2>
              <ul>
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
            </>
          )}
        </div>
      </div>
    </Sheet>
  );
}