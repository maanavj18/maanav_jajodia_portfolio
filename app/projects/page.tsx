import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { lines } from "@/lib/figures";
import { Lines, Meta, fit } from "../_components/specimen";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <>
      <header className="page-head wrap">
        <div className="fit" style={fit("Projects")}>
          <h1 className="display display--page">Projects</h1>
        </div>
      </header>
      <div className="wrap index">
        {projects.map((project) => {
          const lead = lines(project.slug, project.bullets).find((line) => line.figure);
          return (
            <article key={project.slug} className="entry" aria-labelledby={`project-${project.slug}`}>
              <header className="head">
                <div className="fit" style={fit(project.name)}>
                  <h2 id={`project-${project.slug}`} className="display display--role">
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h2>
                </div>
                <Meta lead={project.dates} rest={project.stack.join(", ")} />
              </header>
              {lead && <Lines items={[lead]} scale="index" />}
            </article>
          );
        })}
      </div>
    </>
  );
}