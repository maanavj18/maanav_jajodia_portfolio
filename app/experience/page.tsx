import type { Metadata } from "next";
import Link from "next/link";
import { IndexFilter, IndexTable, type IndexRow } from "@/components/index-table";
import { FactList, Manual, ManualSection } from "@/components/manual";
import { getSite, type Role } from "@/lib/content";
import { dateSortValue, rolePlace } from "@/lib/format";

export const metadata: Metadata = { title: "experience(1)" };

type ListedRole = Role & { section: string };

export default function ExperiencePage() {
  const { experience, leadership, skills, identity } = getSite();
  const roles: ListedRole[] = [
    ...experience.map((role) => ({ ...role, section: "Experience" })),
    ...leadership.map((role) => ({ ...role, section: "Leadership" })),
  ];

  const nameLine = roles.map((role) => `${role.title}, ${role.organization}`).join(". ");
  const nameSentence = nameLine.endsWith(".") ? nameLine : `${nameLine}.`;

  const rows: IndexRow[] = roles.map((role) => ({
    id: role.slug,
    href: `#${role.slug}`,
    cells: [
      { key: "title", text: role.title, value: role.title },
      { key: "organization", text: role.organization, value: role.organization },
      { key: "location", text: role.location, value: role.location },
      { key: "dates", text: role.dates, value: dateSortValue(role.dates) },
      { key: "section", text: role.section, value: role.section },
    ],
  }));

  return (
    <Manual page="experience(1)">
      <h1>experience</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <p className="prose">{nameSentence}</p>
      </ManualSection>
      <ManualSection id="synopsis" title="SYNOPSIS" spacing="synopsis">
        <p className="xref">
          {roles.map((role) => (
            <a key={role.slug} href={`#${role.slug}`}>
              {role.organization}
            </a>
          ))}
        </p>
      </ManualSection>
      <ManualSection id="description" title="DESCRIPTION" spacing="description">
        <IndexFilter />
        <IndexTable
          primary
          caption="Roles"
          columns={[
            { key: "title", label: "TITLE" },
            { key: "organization", label: "ORGANIZATION" },
            { key: "location", label: "LOCATION" },
            { key: "dates", label: "DATES", prefer: "descending" },
            { key: "section", label: "SECTION" },
          ]}
          rows={rows}
        />
        {roles.map((role) => (
          <article key={role.slug} id={role.slug} data-entry={role.slug} className="entry">
            <h3>{role.title}</h3>
            <p>{rolePlace(role)}</p>
            <p className="num">{role.dates}</p>
            <FactList items={role.bullets} />
          </article>
        ))}
        {skills.length > 0 && (
          <>
            <h3 id="skills">Skills</h3>
            <IndexTable
              labelId="skills"
              columns={[
                { key: "group", label: "GROUP" },
                { key: "items", label: "ITEMS" },
              ]}
              rows={skills.map((group) => ({
                id: group.label,
                cells: [
                  { key: "group", text: group.label, value: group.label },
                  { key: "items", text: group.items.join(", "), value: group.items.join(", ") },
                ],
              }))}
            />
          </>
        )}
      </ManualSection>
      <ManualSection id="seealso" title="SEE ALSO" spacing="seealso">
        <p className="xref">
          <Link href="/">maanav(1)</Link>
          <Link href="/projects">projects(1)</Link>
          <a href={identity.resumeHref}>resume.pdf</a>
        </p>
      </ManualSection>
    </Manual>
  );
}
