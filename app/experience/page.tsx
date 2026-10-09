import type { Metadata } from "next";
import { Book } from "@/app/_notebook/book";
import { Bullet, plain } from "@/app/_notebook/copy";
import { getSite, type Role } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

function labMark(index: number): { circle?: string; underline?: string; note?: string } {
  if (index === 0) return { circle: "0.79 F1", note: "0.79 F1 at IoU 0.5" };
  if (index === 1) return { underline: "96 percent", note: "96 percent" };
  if (index === 2) return { circle: "42,000+", note: "42,000+ annotations" };
  return {};
}

function leadNote(slug: string, index: number): string | undefined {
  if (slug === "ai-club" && index === 0) return "$8,000+ annual budget";
  if (slug === "strategic-academic-services" && index === 1) return "1160 to 1480";
  return undefined;
}

function Station({
  role,
  level,
  className,
  marks,
}: {
  role: Role;
  level: "h2" | "h3";
  className: string;
  marks: (index: number) => { circle?: string; underline?: string; note?: string };
}) {
  const Title = level;
  return (
    <article className={className}>
      <p className="dateline">
        <time>{role.dates}</time>
        <span className="sep" aria-hidden="true">
          {" "}
          ·{" "}
        </span>
        <span className="locality">{role.location}</span>
      </p>
      <Title>{role.organization}</Title>
      <p className="rank">
        {role.institution ? `${plain(role.title)}, ${role.institution}` : plain(role.title)}
      </p>
      {role.bullets.map((bullet, index) => {
        const mark = marks(index);
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
    </article>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills, projects } = getSite();

  return (
    <Book page={3 + projects.length} place="experience">
      <div className="sheet">
        <div className="lede">
          <h1>Experience</h1>
        </div>

        {experience.map((role) => (
          <Station
            key={role.slug}
            role={role}
            level="h2"
            className="entry follow"
            marks={role.featured || role.slug === "sai-lab" ? labMark : () => ({})}
          />
        ))}

        {leadership.length > 0 && <h2 className="later">Leadership</h2>}
        {leadership.map((role, index) => (
          <Station
            key={role.slug}
            role={role}
            level="h3"
            className={index === 0 ? "entry follow" : "entry section-gap"}
            marks={(bullet) => ({ note: leadNote(role.slug, bullet) })}
          />
        ))}

        {skills.length > 0 && <h2 className="section-gap">Skills</h2>}
        {skills.length > 0 && (
          <dl className="entry follow kit">
            {skills.map((group) => (
              <div key={group.label} className="margin-row">
                <dt className="specimen">{group.label}</dt>
                <dd className="prose">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Book>
  );
}
