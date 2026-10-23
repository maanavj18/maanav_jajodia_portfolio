import Link from "next/link";
import { Catalog } from "@/components/catalog";
import { LiveMark } from "@/components/live-mark";
import { Notes } from "@/components/notes";
import { SpecTable } from "@/components/spec-table";
import { getSite } from "@/lib/content";
import { figuresFor, isLive, modelNumber, roleSpecRows, typographic, type SpecRow } from "@/lib/specs";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const educationRows = [
    ["school", education.school],
    ["college", education.college],
    ["location", education.location],
    ["degree", education.degree],
    ["gpa", education.gpa],
    ["expected graduation", education.expectedGraduation],
    ["minor", education.minor],
    ["specialization", education.specialization],
    ["coursework", education.coursework.join("; ")],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const rows: SpecRow[] = educationRows.map(([label, value]) => ({ label, value }));

  return (
    <>
      <header className="page-head">
        <h1>{identity.name}</h1>
        <p className="deck">{typographic(identity.headline)}</p>
        <ul className="contacts">
          <li>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </li>
          <li>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </li>
          <li>
            <a href={identity.resumeHref}>resume</a>
          </li>
        </ul>
      </header>

      <div className="band">
        {featured ? (
          <section className="lab-lede" aria-labelledby="lab-title">
            <p className="model">{modelNumber(featured)}</p>
            <div className="title-row">
              <h2 id="lab-title">
                <Link href="/experience">{featured.organization}</Link>
              </h2>
              {isLive(featured.dates) ? <LiveMark /> : null}
            </div>
            <p className="role-title">{typographic(featured.title)}</p>
            <p className="when">{featured.dates}</p>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="line" aria-labelledby="products">
            <h2 id="products">products</h2>
            <Catalog projects={projects} />
          </section>
        ) : null}

        {featured ? (
          <div className="lab-spec">
            <SpecTable labelledBy="lab-title" rows={roleSpecRows(featured)} />
            <Notes bullets={featured.bullets.slice(0, 1)} figures={figuresFor(featured)} />
            <p className="more">
              <Link href="/experience">research notes</Link>
            </p>
          </div>
        ) : null}
      </div>

      {rows.length > 0 ? (
        <section className="education" aria-labelledby="education">
          <h2 id="education">education</h2>
          <SpecTable labelledBy="education" rows={rows} />
        </section>
      ) : null}
    </>
  );
}