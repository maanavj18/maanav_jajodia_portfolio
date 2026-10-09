import Link from "next/link";
import { getSite } from "@/lib/content";

export type Place = "home" | "projects" | "project" | "experience" | "interests" | "none";

export function Book({
  page,
  place,
  children,
}: {
  page?: number;
  place: Place;
  children: React.ReactNode;
}) {
  const { identity, interests } = getSite();

  return (
    <div className="book">
      <a className="skip" href="#content">
        Skip to the entry
      </a>
      <header>
        <div className="sheet head-sheet">
          <Link href="/" className="running-name" aria-current={place === "home" ? "page" : undefined}>
            {identity.name}
          </Link>
          <nav aria-label="Primary">
            <Link href="/projects" aria-current={place === "projects" ? "page" : undefined}>
              Projects
            </Link>
            <Link href="/experience" aria-current={place === "experience" ? "page" : undefined}>
              Experience
            </Link>
            {interests.length > 0 && (
              <Link href="/interests" aria-current={place === "interests" ? "page" : undefined}>
                Interests
              </Link>
            )}
            <a href={identity.resumeHref}>Resume</a>
          </nav>
        </div>
      </header>
      <main id="content" tabIndex={-1}>
        {children}
      </main>
      <footer>
        <div className="sheet">
          <p className="folio-row">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github} rel="noreferrer">
              github.com/{identity.githubHandle}
            </a>
            {typeof page === "number" && <span className="folio">p.&nbsp;{page}</span>}
          </p>
        </div>
      </footer>
    </div>
  );
}
