import Link from "next/link";
import type { Project } from "@/lib/content";
import { isLive, modelNote, modelNumber } from "@/lib/specs";
import { LiveMark } from "./live-mark";

export function Catalog({ projects }: { projects: Project[] }) {
  return (
    <table className="catalog">
      <caption>{modelNote}</caption>
      <thead>
        <tr>
          <th scope="col">model</th>
          <th scope="col">product</th>
          <th scope="col">dates</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.slug}>
            <td className="mono">{modelNumber(project)}</td>
            <td>
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              {isLive(project.dates) ? <LiveMark /> : null}
            </td>
            <td className="mono">{project.dates}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
