import Link from "next/link";
import { IndexFilter, IndexTable } from "@/components/index-table";
import { FactList, Manual, ManualSection } from "@/components/manual";
import { projectColumns, projectRows } from "@/components/rows";
import { getSite } from "@/lib/content";
import { rolePlace } from "@/lib/format";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured);

  return (
    <Manual page="maanav(1)">
      <h1>{identity.name}</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <p className="prose">{identity.headline}</p>
      </ManualSection>
      <ManualSection id="synopsis" title="SYNOPSIS" spacing="synopsis">
        <ul className="synopsis">
          <li>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </li>
          <li>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </li>
          <li>
            <a href={identity.resumeHref}>resume.pdf</a>
          </li>
        </ul>
      </ManualSection>
      <ManualSection id="description" title="DESCRIPTION" spacing="description">
        {featured && (
          <p className="prose">
            <Link href={`/experience#${featured.slug}`}>{featured.title}</Link>
            {`, ${rolePlace(featured)}. ${featured.dates}.`}
          </p>
        )}
        {projects.length > 0 && (
          <>
            <IndexFilter />
            <IndexTable primary caption="Projects" columns={projectColumns} rows={projectRows(projects)} />
          </>
        )}
        {featured && (
          <>
            <h3>Systems and AI Lab</h3>
            <FactList items={featured.bullets} />
          </>
        )}
        <p className="prose audience">{identity.audience}</p>
        <h3 id="education">Education</h3>
        <IndexTable
          labelId="education"
          columns={[
            { key: "field", label: "FIELD" },
            { key: "value", label: "VALUE" },
          ]}
          rows={[
            { id: "school", cells: field("school", "School", education.school) },
            { id: "college", cells: field("college", "College", education.college) },
            { id: "location", cells: field("location", "Location", education.location) },
            { id: "degree", cells: field("degree", "Degree", education.degree) },
            { id: "gpa", cells: field("gpa", "GPA", education.gpa) },
            {
              id: "graduation",
              cells: field("graduation", "Expected graduation", education.expectedGraduation),
            },
            { id: "minor", cells: field("minor", "Minor", education.minor) },
            {
              id: "specialization",
              cells: field("specialization", "Specialization", education.specialization),
            },
            {
              id: "coursework",
              cells: field("coursework", "Coursework", education.coursework.join("; ")),
            },
          ]}
        />
      </ManualSection>
      <ManualSection id="seealso" title="SEE ALSO" spacing="seealso">
        <p className="xref">
          <Link href="/projects">projects(1)</Link>
          <Link href="/experience">experience(1)</Link>
          <a href={identity.resumeHref}>resume.pdf</a>
        </p>
      </ManualSection>
    </Manual>
  );
}

function field(key: string, label: string, value: string) {
  return [
    { key: "field", text: label, value: label },
    { key: "value", text: value, value },
  ];
}
