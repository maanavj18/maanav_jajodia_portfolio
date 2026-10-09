import type { Metadata } from "next";
import { Board } from "@/components/board";
import { RouteMark } from "@/components/route-mark";
import { SkillsBoard } from "@/components/skills-board";
import { getSite, type Role } from "@/lib/content";
import {
  experienceDepartures,
  lineLabel,
  roleFigure,
  runStatus,
  typographic,
  type Line,
} from "@/lib/departures";

export const metadata: Metadata = { title: "Experience" };

function RoleRecord({ role, line }: { role: Role; line: Line }) {
  const figure = roleFigure(role);
  const status = runStatus(role.dates);

  return (
    <article id={role.slug} className="record" data-line={line}>
      <div className="record-kicker">
        <RouteMark line={line} completed={status === "completed"} />
        <span className="line-label">{lineLabel(line)}</span>
        <span className="status-word">{status === "active" ? "Active" : "Completed"}</span>
        <span className="time-face">{role.dates}</span>
      </div>
      <h3>{role.organization}</h3>
      <p className="meta">
        {[role.title, role.institution, role.location].filter(Boolean).join(" · ")}
      </p>
      {figure ? (
        <p className="figure">
          <span className="figure-value">{figure.value}</span>
          <span className="figure-unit">{figure.unit}</span>
        </p>
      ) : null}
      <ul className="notes">
        {role.bullets.map((bullet) => (
          <li key={bullet}>{typographic(bullet)}</li>
        ))}
      </ul>
    </article>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();
  const rows = experienceDepartures(experience, leadership);

  return (
    <>
      <header className="sign">
        <h1>Experience</h1>
        <p className="deck">Systems and AI Lab is posted first. Leadership lines follow.</p>
      </header>
      {rows.length > 0 ? (
        <Board id="experience" caption="DEPARTURES" rows={rows}>
          {experience.length > 0 ? (
            <>
              <h2 className="group-label" data-line="research">
                <RouteMark line="research" />
                Research
              </h2>
              {experience.map((role) => (
                <RoleRecord key={role.slug} role={role} line="research" />
              ))}
            </>
          ) : null}
          {leadership.length > 0 ? (
            <>
              <h2 className="group-label" data-line="leadership">
                <RouteMark line="leadership" />
                Leadership
              </h2>
              {leadership.map((role) => (
                <RoleRecord key={role.slug} role={role} line="leadership" />
              ))}
            </>
          ) : null}
        </Board>
      ) : null}
      <SkillsBoard skills={skills} />
    </>
  );
}
