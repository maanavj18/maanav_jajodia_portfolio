import type { Metadata } from "next";
import Link from "next/link";
import { flowFor, tableRows } from "@/lib/apparatus";
import { getSite } from "@/lib/content";
import { Prose } from "../_components/prose";

export const metadata: Metadata = { title: "Projects" };

function count(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <article className="sheet">
      <header className="front front--page">
        <h1 className="title title--page">Projects</h1>
      </header>

      <ol className="toc" aria-label="Project reports">
        {projects.map((project) => {
          const rows = tableRows(project.slug, project.bullets).length;
          const figures = flowFor(project.slug, project.bullets) ? 1 : 0;
          const apparatus = [
            count(project.bullets.length, "statement", "statements"),
            rows > 0 && `${count(rows, "figure", "figures")} in Table 1`,
            figures > 0 && "Figure 1",
          ].filter(Boolean);

          return (
            <li key={project.slug} className="toc-entry">
              <div className="toc-line">
                <h2 className="toc-title">
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h2>
                <span className="leader" aria-hidden="true" />
                <span className="toc-dates">{project.dates}</span>
              </div>
              <p className="keywords">
                <span className="runin">Keywords</span> <Prose text={project.stack.join("; ")} />
              </p>
              {project.bullets[0] && (
                <p className="toc-lead">
                  <Prose text={project.bullets[0]} />
                </p>
              )}
              <p className="meta">{apparatus.join(" · ")}</p>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
