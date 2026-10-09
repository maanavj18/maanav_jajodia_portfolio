import type { Metadata } from "next";
import { IndexFilter, IndexTable } from "@/components/index-table";
import { Manual, ManualSection } from "@/components/manual";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "not found" };

export default function NotFound() {
  const { identity } = getSite();

  return (
    <Manual page="not-found(1)">
      <h1>not found</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <p className="prose">This page is not in the manual.</p>
      </ManualSection>
      <ManualSection id="synopsis" title="SYNOPSIS" spacing="synopsis">
        <p className="prose">No manual page is published at this path.</p>
      </ManualSection>
      <ManualSection id="description" title="DESCRIPTION" spacing="description">
        <p className="prose">Choose another page from the index below.</p>
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
          rows={[
            {
              id: "home",
              href: "/",
              cells: [
                { key: "name", text: "maanav(1)", value: "maanav" },
                { key: "path", text: "/", value: "/" },
              ],
            },
            {
              id: "projects",
              href: "/projects",
              cells: [
                { key: "name", text: "projects(1)", value: "projects" },
                { key: "path", text: "/projects", value: "/projects" },
              ],
            },
            {
              id: "experience",
              href: "/experience",
              cells: [
                { key: "name", text: "experience(1)", value: "experience" },
                { key: "path", text: "/experience", value: "/experience" },
              ],
            },
            {
              id: "resume",
              href: identity.resumeHref,
              cells: [
                { key: "name", text: "resume.pdf", value: "resume" },
                { key: "path", text: identity.resumeHref, value: identity.resumeHref },
              ],
            },
          ]}
        />
      </ManualSection>
    </Manual>
  );
}
