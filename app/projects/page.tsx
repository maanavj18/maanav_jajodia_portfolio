import type { Metadata } from "next";
import Link from "next/link";
import { Book } from "@/app/_notebook/book";
import { Bullet } from "@/app/_notebook/copy";
import { specimenNo } from "@/app/_notebook/specimen";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

const INDEX_MARKS: Record<string, { circle?: string; underline?: string; note?: string }> = {
  "stroke-analysis": {
    circle: "30+ FPS",
    underline: "50ms",
    note: "501 pose, face, and hand landmarks",
  },
  flightscope: {
    circle: "500+ routes",
    note: "3+ travel APIs",
  },
};

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <Book page={2} place="projects">
      <div className="sheet">
        <div className="lede">
          <h1>Projects</h1>
        </div>
        {projects.map((project, index) => {
          const marks = INDEX_MARKS[project.slug] ?? {};
          return (
            <article key={project.slug} className={index === 0 ? "entry follow" : "entry section-gap"}>
              <p className="dateline">
                <span className="specimen">No.&nbsp;{specimenNo(project.dates)}</span>
                <span className="sep" aria-hidden="true">
                  {" "}
                  ·{" "}
                </span>
                <time>{project.dates}</time>
              </p>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </h2>
              {project.stack.length > 0 && (
                <p className="materials">
                  <span className="specimen">Stack</span>
                  {project.stack.join(", ")}
                </p>
              )}
              {project.bullets[0] && (
                <Bullet
                  text={project.bullets[0]}
                  circle={marks.circle}
                  underline={marks.underline}
                  note={marks.note}
                />
              )}
            </article>
          );
        })}
      </div>
    </Book>
  );
}
