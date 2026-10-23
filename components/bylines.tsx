import type { Project, Role } from "@/lib/content";
import type { Detail } from "./story";

export function RoleByline({ role }: { role: Role }) {
  return (
    <>
      <strong>{role.title}</strong>
      {[role.institution ?? role.location, role.dates].map((part) => (
        <span key={part}> &middot; {part}</span>
      ))}
    </>
  );
}

export function ProjectByline({ project }: { project: Project }) {
  return (
    <>
      <strong>{project.dates}</strong>
      <span> &middot; {project.stack.join(", ")}</span>
    </>
  );
}

export function roleDetails(role: Role): Detail[] {
  const rows: Detail[] = [
    { label: "Title", value: role.title },
    { label: "Organization", value: role.organization },
  ];
  if (role.institution) rows.push({ label: "Institution", value: role.institution });
  rows.push({ label: "Location", value: role.location }, { label: "Dates", value: role.dates });
  return rows;
}

export function projectDetails(project: Project): Detail[] {
  const rows: Detail[] = [
    { label: "Project", value: project.name },
    { label: "Dates", value: project.dates },
    { label: "Stack", value: project.stack.join(", ") },
  ];
  if (project.goal) rows.push({ label: "Goal", value: project.goal });
  if (project.demoUrl) rows.push({ label: "Demo", value: <a href={project.demoUrl}>{project.demoUrl}</a> });
  if (project.repoUrl) rows.push({ label: "Repository", value: <a href={project.repoUrl}>{project.repoUrl}</a> });
  return rows;
}