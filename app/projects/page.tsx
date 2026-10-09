import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <section>
      <h1>Projects</h1>
      {projects.map((project) => (
        <article key={project.slug}>
          <h2>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h2>
          <p>
            {project.dates} · {project.stack.join(", ")}
          </p>
          <p>{project.bullets[0]}</p>
        </article>
      ))}
    </section>
  );
}
