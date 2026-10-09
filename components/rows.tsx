import type { IndexColumn, IndexRow } from "@/components/index-table";
import type { Project } from "@/lib/content";
import { dateSortValue } from "@/lib/format";

export const projectColumns: IndexColumn[] = [
  { key: "name", label: "NAME" },
  { key: "dates", label: "DATES", prefer: "descending" },
  { key: "stack", label: "STACK" },
];

export function projectRows(projects: Project[]): IndexRow[] {
  return projects.map((project) => ({
    id: project.slug,
    href: `/projects/${project.slug}`,
    cells: [
      { key: "name", text: project.name, value: project.name },
      { key: "dates", text: project.dates, value: dateSortValue(project.dates) },
      { key: "stack", text: project.stack.join(", "), value: project.stack.join(", ") },
    ],
  }));
}
