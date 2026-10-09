import Link from "next/link";
import type { ReactNode } from "react";
import { getSite } from "@/lib/content";
import { leaves } from "./folios";

type Props = {
  /** Route this sheet belongs to, used for aria-current in the running head. */
  current: string;
  folio?: number;
  children: ReactNode;
};

export function Sheet({ current, folio, children }: Props) {
  const site = getSite();
  const { identity } = site;
  const book = leaves(site);
  const nav = [book.projects, book.experience, ...(book.interests ? [book.interests] : [])];

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="running-head">
        <Link href="/" className="running-head__name" aria-current={current === "/" ? "page" : undefined}>
          {identity.name}
        </Link>
        <nav aria-label="Primary">
          <ul>
            {nav.map((leaf) => (
              <li key={leaf.href}>
                <Link
                  href={leaf.href}
                  aria-current={current === leaf.href || current.startsWith(`${leaf.href}/`) ? "page" : undefined}
                >
                  {leaf.title}
                </Link>
              </li>
            ))}
            <li>
              <a href={identity.resumeHref}>Resume (PDF)</a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content" className="sheet" tabIndex={-1}>
        {children}
      </main>
      <footer className="running-foot">
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
        {folio !== undefined && (
          <p className="running-foot__folio">
            <span className="visually-hidden">Page </span>
            {folio}
          </p>
        )}
        <a href={identity.github}>github.com/{identity.githubHandle}</a>
      </footer>
    </>
  );
}
