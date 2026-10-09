import type { Project } from "@/lib/content";

export function ProjectTable({
  projects,
  labelledBy,
}: {
  projects: Project[];
  labelledBy: string;
}) {
  return (
    <table className="projects" aria-labelledby={labelledBy}>
      <thead>
        <tr>
          <th scope="col">Project</th>
          <th scope="col">Dates</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.slug}>
            <td>
              <a href={`/projects/${project.slug}`}>{project.name}</a>
              <span className="stack">{project.stack.join(", ")}</span>
            </td>
            <td className="nums">{project.dates}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
