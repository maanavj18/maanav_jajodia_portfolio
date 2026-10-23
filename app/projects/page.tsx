import type { Metadata } from "next";
import { Masthead } from "@/components/masthead";
import { Story } from "@/components/story";
import { ProjectByline, projectDetails } from "@/components/bylines";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <>
      <Masthead current="projects" />
      <main id="main" className="sheet inside">
        <h1 className="section-flag">Projects</h1>
        <div className="section-grid">
          {projects.map((project, index) => (
            <Story
              key={project.slug}
              id={`story-${project.slug}`}
              size={index === 0 ? "lead" : "major"}
              level={2}
              kicker={project.name}
              href={`/projects/${project.slug}`}
              lead={project.bullets[0]}
              body={project.bullets.slice(1)}
              columns={2}
              byline={<ProjectByline project={project} />}
              details={projectDetails(project)}
              jump={{ href: `/projects/${project.slug}`, label: "Projects" }}
            />
          ))}
        </div>
      </main>
    </>
  );
}