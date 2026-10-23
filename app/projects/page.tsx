import type { Metadata } from "next";
import Link from "next/link";
import { LiveMark } from "@/components/live-mark";
import { SpecTable } from "@/components/spec-table";
import { getSite } from "@/lib/content";
import { isLive, modelNote, modelNumber, projectSpecRows } from "@/lib/specs";

export const metadata: Metadata = { title: "products" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <>
      <header className="page-head">
        <h1>products</h1>
        <p className="model-note">{modelNote}</p>
      </header>
      <div className="line-sheets">
        {projects.map((project) => {
          const titleId = `${project.slug}-title`;
          return (
            <article key={project.slug} className="unit">
              <p className="model">{modelNumber(project)}</p>
              <div>
                <div className="title-row">
                  <h2 id={titleId}>
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h2>
                  {isLive(project.dates) ? <LiveMark /> : null}
                </div>
                <SpecTable labelledBy={titleId} rows={projectSpecRows(project)} />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}