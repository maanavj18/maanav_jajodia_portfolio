import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { getChecklist } from "@/lib/exhibits";
import { Checklist, ProjectExhibit } from "../components/exhibit";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();
  const entries = getChecklist().filter((entry) => entry.key.startsWith("project:"));

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Projects</h1>
        <Checklist entries={entries} heading="Checklist" level="h2" id="project-checklist" />
      </header>
      {projects.map((project) => (
        <ProjectExhibit key={project.slug} project={project} level="h2" />
      ))}
    </>
  );
}