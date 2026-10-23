import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Figure, Module, Prose } from "@/components/poster";
import { getProject, getSite } from "@/lib/content";
import { figuresFor, orderFigures } from "@/lib/figures";

type Props = { params: Promise<{ slug: string }> };

const RANK: Record<string, string[]> = {
  "stroke-analysis": ["30+", "501", "150+"],
  flightscope: ["50k+", "500+", "15"],
};

export function generateStaticParams() {
  return getSite().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name } : {};
}

export default async function ProjectPage({ params }: Props) {
  const slug = (await params).slug;
  const project = getProject(slug);
  if (!project) notFound();

  const index = getSite().projects.findIndex((item) => item.slug === project.slug);
  const flipped = index % 2 === 1;
  const figures = orderFigures(figuresFor(project.slug, project.bullets), RANK[project.slug] ?? []);
  const [hero, ...side] = figures;
  const showLinks = Boolean(project.demoUrl || project.repoUrl);

  return (
    <>
      {flipped ? <Module /> : null}
      <article className={flipped ? "act act-flight" : "act act-stroke"}>
        <p className="date-spine tabular">{project.dates}</p>
        <div className="act-main">
          <p className="back">
            <Link href="/projects">projects</Link>
          </p>
          <h1>{project.name}</h1>
          <Prose source={project.slug} bullets={project.bullets} />
          {project.stack.length > 0 ? (
            <div className="act-stack">
              <h2 className="vlabel">stack</h2>
              <ul className="stack-inline">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.goal || showLinks ? (
            <div className="act-foot">
              {project.goal ? (
                <section>
                  <h2 className="vlabel">goal</h2>
                  <p className="prose">{project.goal}</p>
                </section>
              ) : null}
              {showLinks ? (
                <section>
                  <h2 className="vlabel">links</h2>
                  <ul className="stack-inline">
                    {project.demoUrl ? (
                      <li>
                        <a href={project.demoUrl}>demo</a>
                      </li>
                    ) : null}
                    {project.repoUrl ? (
                      <li>
                        <a href={project.repoUrl}>repository</a>
                      </li>
                    ) : null}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>
        {hero ? (
          <div className="act-figures">
            <Figure className="on-red figure-hero" value={hero.value} unit={hero.unit} caption={hero.caption} />
            {side.map((figure) => (
              <Figure
                key={`${figure.value}-${figure.caption}`}
                className="figure-side"
                value={figure.value}
                unit={figure.unit}
                caption={figure.caption}
              />
            ))}
          </div>
        ) : null}
      </article>
      {flipped ? null : <Module />}
    </>
  );
}
