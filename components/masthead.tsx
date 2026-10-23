import Link from "next/link";
import { getSite } from "@/lib/content";
import { EditionDate } from "./EditionDate";

type Section = "front" | "projects" | "experience" | "interests";

export function Masthead({ current }: { current?: Section }) {
  const { identity, education, interests } = getSite();
  const front = current === "front";

  const sections: { key: Section; href: string; label: string }[] = [
    { key: "front", href: "/", label: "Front page" },
    { key: "projects", href: "/projects", label: "Projects" },
    { key: "experience", href: "/experience", label: "Experience" },
  ];
  if (interests.length > 0) sections.push({ key: "interests", href: "/interests", label: "Interests" });

  return (
    <header className={front ? "masthead masthead--front" : "masthead masthead--inside"}>
      {front ? (
        <>
          <div className="nameplate-row">
            <p className="ear ear--left">
              <span>{education.location}</span>
              <span>{education.school}</span>
            </p>
            <h1 className="nameplate">{identity.name}</h1>
            <p className="ear ear--right">
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
              <a href={identity.github}>github.com/{identity.githubHandle}</a>
            </p>
          </div>
          <p className="motto">{identity.headline}</p>
        </>
      ) : (
        <div className="nameplate-row">
          <Link href="/" className="nameplate nameplate--inside">
            {identity.name}
          </Link>
        </div>
      )}
      <div className="folio">
        <EditionDate />
        <nav aria-label="Sections">
          <ul>
            {sections.map((section) => (
              <li key={section.key}>
                <Link href={section.href} aria-current={section.key === current ? "page" : undefined}>
                  {section.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={identity.resumeHref}>Resume (PDF)</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}