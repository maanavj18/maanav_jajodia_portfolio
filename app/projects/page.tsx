import type { Metadata } from "next";
import { Board } from "@/components/board";
import { getSite } from "@/lib/content";
import { projectDeparture } from "@/lib/departures";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const rows = getSite().projects.map((project) => projectDeparture(project));

  return (
    <>
      <header className="sign">
        <h1>Projects</h1>
      </header>
      {rows.length > 0 ? <Board id="projects" caption="DEPARTURES" rows={rows} /> : null}
    </>
  );
}
