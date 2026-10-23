import type { Metadata } from "next";
import { Figure, Meta, Module, Prose } from "@/components/poster";
import { getSite, type Role } from "@/lib/content";
import { figuresFor, type Figure as PosterFigure } from "@/lib/figures";

export const metadata: Metadata = { title: "Experience" };

function RoleBand({ role, flip }: { role: Role; flip: boolean }) {
  const figures = figuresFor(role.slug, role.bullets);
  const hero = figures[0];
  const extra = figures[1];
  const mode = hero ? (extra ? "" : " role-band-single") : " role-band-text";

  return (
    <article className={`role-band${flip ? " role-band-flip" : ""}${mode}`}>
      <p className="spine tabular">{role.dates}</p>
      <div className="role-copy">
        <h3>{role.organization}</h3>
        <p className="role-title">{role.title}</p>
        <Meta parts={[role.institution, role.location]} />
        <Prose source={role.slug} bullets={role.bullets} />
      </div>
      {hero ? <Poster hero={hero} /> : null}
      {extra ? (
        <Figure className="figure-side" value={extra.value} unit={extra.unit} caption={extra.caption} />
      ) : null}
    </article>
  );
}

function Poster({ hero }: { hero: PosterFigure }) {
  return <Figure className="on-red figure-block" value={hero.value} unit={hero.unit} caption={hero.caption} />;
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();
  const lead = experience.find((role) => role.featured) ?? experience[0];
  const rest = lead ? experience.filter((role) => role.slug !== lead.slug) : experience;
  const lab = lead ? figuresFor(lead.slug, lead.bullets) : [];
  const f1 = lab.find((figure) => figure.value === "0.79");
  const hpc = lab.find((figure) => figure.value === "96");
  const coco = lab.find((figure) => figure.value === "20,000+");

  return (
    <>
      <section className="roles-sheet" aria-labelledby="experience-heading">
        {lead ? <p className="spine tabular">{lead.dates}</p> : null}
        <div className="roles-intro">
          <h1 id="experience-heading">experience</h1>
          {lead ? (
            <>
              <h2>{lead.organization}</h2>
              <p className="role-title">{lead.title}</p>
              <Meta parts={[lead.institution, lead.location]} />
            </>
          ) : null}
        </div>
        {f1 ? <Figure className="on-red figure-hero roles-hero" value={f1.value} caption={f1.caption} /> : null}
        {lead ? (
          <div className="roles-record">
            <Prose source={lead.slug} bullets={lead.bullets} />
          </div>
        ) : null}
        {hpc || coco ? (
          <div className="roles-side">
            {hpc ? <Figure className="figure-side" value={hpc.value} unit={hpc.unit} caption={hpc.caption} /> : null}
            {coco ? <Figure className="figure-side" value={coco.value} caption={coco.caption} /> : null}
          </div>
        ) : null}
      </section>

      {rest.map((role, index) => (
        <RoleBand key={role.slug} role={role} flip={index % 2 === 1} />
      ))}

      <Module />

      {leadership.length > 0 ? (
        <section className="leadership" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading" className="band-title on-ink">
            leadership
          </h2>
          {leadership.map((role, index) => (
            <RoleBand key={role.slug} role={role} flip={index % 2 === 1} />
          ))}
        </section>
      ) : null}

      {skills.length > 0 ? (
        <section className="skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading">skills</h2>
          {skills.map((group) => (
            <div key={group.label} className="skill-group">
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}
    </>
  );
}
