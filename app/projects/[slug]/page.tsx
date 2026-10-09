import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Book } from "@/app/_notebook/book";
import { Bullet } from "@/app/_notebook/copy";
import { specimenNo } from "@/app/_notebook/specimen";
import { getProject, getSite, type Project } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

type Mark = { circle?: string; underline?: string; note?: string };

export function generateStaticParams() {
  return getSite().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name } : {};
}

function marksFor(project: Project): Mark[] {
  if (project.slug === "stroke-analysis") {
    return [
      {
        circle: "30+ FPS",
        underline: "50ms",
        note: "501 pose, face, and hand landmarks",
      },
      { note: "150+ frames" },
      {
        circle: "16 anatomical landmarks",
        note: "2 automated neurological assessment modules",
      },
    ];
  }

  if (project.slug === "flightscope") {
    const drop = project.bullets[3]?.match(/15\S30%/)?.[0];
    return [
      { circle: "500+ routes", note: "3+ travel APIs" },
      { underline: "50k+", note: "50k+ historical flight price records" },
      {},
      drop ? { circle: drop, note: `${drop} below historical averages` } : {},
    ];
  }

  return project.bullets.map(() => ({}));
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = getSite().projects.findIndex((item) => item.slug === project.slug);
  const marks = marksFor(project);

  return (
    <Book page={3 + index} place="project">
      <article className="sheet">
        <div className="lede">
          <p className="dateline">
            <span className="specimen">No.&nbsp;{specimenNo(project.dates)}</span>
            <span className="sep" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
            <time>{project.dates}</time>
          </p>
          <h1>{project.name}</h1>
          {project.stack.length > 0 && (
            <p className="materials">
              <span className="specimen">Stack</span>
              {project.stack.join(", ")}
            </p>
          )}
        </div>

        {project.goal && (
          <p className="prose follow entry">{project.goal}</p>
        )}

        <div className="entry follow">
          {project.bullets.map((bullet, bulletIndex) => {
            const mark = marks[bulletIndex] ?? {};
            return (
              <Bullet
                key={bullet}
                text={bullet}
                circle={mark.circle}
                underline={mark.underline}
                note={mark.note}
              />
            );
          })}
        </div>

        {(project.demoUrl || project.repoUrl) && (
          <ul className="contacts section-gap entry">
            {project.demoUrl && (
              <li>
                <a href={project.demoUrl}>Demo</a>
              </li>
            )}
            {project.repoUrl && (
              <li>
                <a href={project.repoUrl}>Repository</a>
              </li>
            )}
          </ul>
        )}
      </article>
    </Book>
  );
}
