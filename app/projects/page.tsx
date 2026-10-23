import type { Metadata } from "next";
import { MapCanvas } from "@/components/map-canvas";
import { Marker } from "@/components/markers";
import { Sheet } from "@/components/sheet";
import { getSite } from "@/lib/content";
import { seedFromSlug } from "@/lib/relief";
import { leadingFigure } from "@/lib/sheet-geo";

export const metadata: Metadata = { title: "Projects" };

const SPOTS: Record<string, { pattern: RegExp; caption: string }> = {
  "stroke-analysis": { pattern: /501/, caption: "landmarks per frame" },
  flightscope: { pattern: /50k\+/, caption: "flight price records" },
};

export default function ProjectsPage() {
  const { projects } = getSite();

  return (
    <Sheet title="Projects" current="projects">
      <div className="plats">
        {projects.map((project) => {
          const spot = SPOTS[project.slug];
          const figure = spot ? leadingFigure(project.bullets, spot.pattern) : undefined;
          return (
            <article key={project.slug} className="plat">
              <MapCanvas seed={seedFromSlug(project.slug)} size="inset">
                <a className="feature pos-mark" href={`/projects/${project.slug}`}>
                  <Marker kind="site" />
                  {figure && <span className="spot">{figure}</span>}
                  {spot && <span className="label">{spot.caption}</span>}
                  <h2>{project.name}</h2>
                  <p className="label">{project.dates}</p>
                </a>
                      </MapCanvas>
              <div className="plat-copy">
                <p>{project.bullets[0]}</p>
                <p>
                  <span className="label">Stack </span>
                  {project.stack.join(", ")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Sheet>
  );
}