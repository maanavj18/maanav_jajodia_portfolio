import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { Particulars, typeset } from "../_components/particulars";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <>
      <SiteHeader current="projects" />
      <main id="main">
        <h1>Projects</h1>
        {projects.map((project) => (
          <section key={project.slug} className="entry" aria-labelledby={project.slug}>
            <h2 id={project.slug}>
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h2>
            <Particulars
              rows={[
                ["Dates", project.dates],
                ["Stack", project.stack.join(", ")],
              ]}
            />
            {project.bullets[0] && <p>{typeset(project.bullets[0])}</p>}
          </section>
        ))}
      </main>
    </>
  );
}