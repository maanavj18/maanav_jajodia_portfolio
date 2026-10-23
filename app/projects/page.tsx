import type { Metadata } from "next";
import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";
import { Plate } from "@/components/plate";
import { Spread } from "@/components/spread";
import { getSite, type Project } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

function ProjectPlate({ project, tilt }: { project: Project; tilt: string }) {
  return (
    <Plate
      title={project.name}
      href={`/projects/${project.slug}`}
      tilt={tilt}
      meta={
        <>
          <p className="meta num">{project.dates}</p>
          <p className="stack">{project.stack.join(", ")}</p>
        </>
      }
    >
      <p className="measure">{project.bullets[0]}</p>
    </Plate>
  );
}

export default function ProjectsPage() {
  const { projects } = getSite();
  const [first, ...rest] = projects;

  return (
    <>
      <div className="opener">
        <div className="masthead">
          <DisplayTitle as="h1" size="xl" weight={700} tilt="-1.8deg">
            Projects
          </DisplayTitle>
        </div>
        <Overprint />
      </div>
      <Spread className="spread-drop-right">
        {first ? <ProjectPlate project={first} tilt="2.4deg" /> : null}
        <>
          {rest.map((project, index) => (
            <ProjectPlate key={project.slug} project={project} tilt={index % 2 === 0 ? "-2.6deg" : "2.1deg"} />
          ))}
        </>
      </Spread>
    </>
  );
}
