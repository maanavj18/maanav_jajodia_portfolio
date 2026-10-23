import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";
import { PullFigure } from "@/components/pull-figure";
import { Records } from "@/components/records";
import { Spread } from "@/components/spread";
import { getProject, getSite } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const figures: Record<string, { value: string; unit: string }> = {
  "stroke-analysis": { value: "30+", unit: "FPS" },
  flightscope: { value: "500+", unit: "routes" },
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

  const pull = figures[project.slug];
  const lead = project.bullets[0];
  const showPull = Boolean(pull && lead && lead.includes(pull.value) && lead.includes(pull.unit));

  return (
    <article>
      <p className="back">
        <Link href="/projects">Projects</Link>
      </p>
      <div className="masthead">
        <DisplayTitle as="h1" size="xl" weight={400} tilt="-1.5deg">
          {project.name}
        </DisplayTitle>
      </div>
      <Spread className="chapter-tight">
        <div>
          <p className="meta num">{project.dates}</p>
          <p className="stack">
            <span className="label">Stack</span>
            {project.stack.join(", ")}
          </p>
          {showPull && pull && lead ? (
            <PullFigure bullet={lead} value={pull.value} unit={pull.unit} />
          ) : null}
          <div className="detail-stamp">
            <Overprint />
          </div>
        </div>
        <div>
          <Records items={showPull ? project.bullets.slice(1) : project.bullets} />
          {project.goal ? (
            <section className="chapter-tight">
              <h2 className="section-head">
                <DisplayTitle as="span" size="md" tilt="1.6deg">
                  Goal
                </DisplayTitle>
              </h2>
              <p className="measure">{project.goal}</p>
            </section>
          ) : null}
          {project.demoUrl || project.repoUrl ? (
            <ul className="contacts">
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
          ) : null}
        </div>
      </Spread>
    </article>
  );
}
