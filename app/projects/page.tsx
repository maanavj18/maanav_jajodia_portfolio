import type { Metadata } from "next";
import { ProjectTable } from "@/components/project-table";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <>
      <h1 id="projects-heading">Projects</h1>
      <ProjectTable projects={projects} labelledBy="projects-heading" />
      {projects.map((project, index) => (
        <section key={project.slug} className={index === 0 ? "space-60" : "space-120"}>
          <h2>
            <a href={`/projects/${project.slug}`}>{project.name}</a>
          </h2>
          <p>{project.bullets[0]}</p>
        </section>
      ))}
    </>
  );
}
