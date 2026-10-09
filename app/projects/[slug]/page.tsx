import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndexFilter, IndexTable, type IndexRow } from "@/components/index-table";
import { FactList, Manual, ManualSection } from "@/components/manual";
import { getProject, getSite } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSite().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.slug}(1)` } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { projects, identity } = getSite();
  const fields: IndexRow[] = [
    {
      id: "dates",
      cells: [
        { key: "field", text: "Dates", value: "Dates" },
        { key: "value", text: project.dates, value: project.dates },
      ],
    },
    {
      id: "stack",
      cells: [
        { key: "field", text: "Stack", value: "Stack" },
        { key: "value", text: project.stack.join(", "), value: project.stack.join(", ") },
      ],
    },
  ];
  if (project.goal) {
    fields.push({
      id: "goal",
      cells: [
        { key: "field", text: "Goal", value: "Goal" },
        { key: "value", text: project.goal, value: project.goal },
      ],
    });
  }
  if (project.demoUrl) {
    fields.push({
      id: "demo",
      cells: [
        { key: "field", text: "Demo", value: "Demo" },
        { key: "value", text: project.demoUrl, value: project.demoUrl, href: project.demoUrl },
      ],
    });
  }
  if (project.repoUrl) {
    fields.push({
      id: "repo",
      cells: [
        { key: "field", text: "Repository", value: "Repository" },
        { key: "value", text: project.repoUrl, value: project.repoUrl, href: project.repoUrl },
      ],
    });
  }

  const seeAlso: IndexRow[] = [
    row("projects", "projects(1)", "/projects"),
    ...projects
      .filter((item) => item.slug !== project.slug)
      .map((item) => row(item.slug, `${item.slug}(1)`, `/projects/${item.slug}`)),
    row("experience", "experience(1)", "/experience"),
    row("home", "maanav(1)", "/"),
    row("resume", "resume.pdf", identity.resumeHref),
  ];

  return (
    <Manual page={`${project.slug}(1)`}>
      <h1>{project.name}</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <p className="prose">
          {project.name}, {project.dates}.
        </p>
      </ManualSection>
      <ManualSection id="synopsis" title="SYNOPSIS" spacing="synopsis">
        <IndexTable
          caption="Fields"
          columns={[
            { key: "field", label: "FIELD" },
            { key: "value", label: "VALUE" },
          ]}
          rows={fields}
        />
      </ManualSection>
      <ManualSection id="description" title="DESCRIPTION" spacing="description">
        <FactList items={project.bullets} />
      </ManualSection>
      <ManualSection id="seealso" title="SEE ALSO" spacing="seealso">
        <IndexFilter />
        <IndexTable
          primary
          caption="See also"
          columns={[
            { key: "name", label: "NAME" },
            { key: "path", label: "PATH" },
          ]}
          rows={seeAlso}
        />
      </ManualSection>
    </Manual>
  );
}

function row(id: string, name: string, href: string): IndexRow {
  return {
    id,
    href,
    cells: [
      { key: "name", text: name, value: name },
      { key: "path", text: href, value: href },
    ],
  };
}
