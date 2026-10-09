import type { Metadata } from "next";
import Link from "next/link";
import { IndexFilter, IndexTable } from "@/components/index-table";
import { Manual, ManualSection } from "@/components/manual";
import { projectColumns, projectRows } from "@/components/rows";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "projects(1)" };

export default function ProjectsPage() {
  const { projects, identity } = getSite();

  return (
    <Manual page="projects(1)">
      <h1>projects</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <p className="prose">
          {projects.map((project) => `${project.name} (${project.dates})`).join("; ")}.
        </p>
      </ManualSection>
      <ManualSection id="synopsis" title="SYNOPSIS" spacing="synopsis">
        <p className="xref">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              {project.slug}(1)
            </Link>
          ))}
        </p>
      </ManualSection>
      <ManualSection id="description" title="DESCRIPTION" spacing="description">
        <IndexFilter />
        <IndexTable primary caption="Projects" columns={projectColumns} rows={projectRows(projects)} />
      </ManualSection>
      <ManualSection id="seealso" title="SEE ALSO" spacing="seealso">
        <p className="xref">
          <Link href="/">maanav(1)</Link>
          <Link href="/experience">experience(1)</Link>
          <a href={identity.resumeHref}>resume.pdf</a>
        </p>
      </ManualSection>
    </Manual>
  );
}
