import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Figure, Module } from "@/components/poster";
import { getSite } from "@/lib/content";
import { figuresFor } from "@/lib/figures";

export const metadata: Metadata = { title: "Projects" };

function leadFigure(slug: string, bullets: string[]) {
  const figures = figuresFor(slug, bullets);
  return figures.find((figure) => figure.value === "30+" || figure.value === "50k+") ?? figures[0];
}

export default function ProjectsPage() {
  const { education, projects } = getSite();

  return (
    <>
      <header className="page-title">
        <p className="spine">{education.location}</p>
        <h1>projects</h1>
      </header>
      {projects.map((project, index) => {
        const figure = leadFigure(project.slug, project.bullets);
        const flip = index % 2 === 1;
        return (
          <Fragment key={project.slug}>
            <article className={flip ? "program-row program-row-flip" : "program-row"}>
              <div className="program-copy">
                <h2>
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h2>
                <p className="tabular meta-line">{project.dates}</p>
                {project.bullets[0] ? <p className="prose">{project.bullets[0]}</p> : null}
                {project.stack.length > 0 ? (
                  <ul className="stack-inline">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {figure ? (
                <Figure
                  className="on-red figure-block"
                  value={figure.value}
                  unit={figure.unit}
                  caption={figure.caption}
                />
              ) : null}
            </article>
            {index === 0 && projects.length > 1 ? <Module /> : null}
          </Fragment>
        );
      })}
    </>
  );
}
