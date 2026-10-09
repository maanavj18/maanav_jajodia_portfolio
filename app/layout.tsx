import type { Metadata } from "next";
import Link from "next/link";
import { KeyboardLayer } from "@/components/keyboard";
import { getSite } from "@/lib/content";
import { commitMono } from "./font";
import "./globals.css";

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s · ${identity.name}` },
    description: identity.headline,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { identity, interests } = getSite();

  return (
    <html lang="en" className={commitMono.className}>
      <body>
        <div className="sheet">
          <a className="skip" href="#content">
            Skip to content
          </a>
          <header className="mast">
            <Link href="/" className="mast-name">
              {identity.name}
            </Link>
            <nav className="nav" aria-label="Manual">
              <Link href="/projects">projects(1)</Link>
              <Link href="/experience">experience(1)</Link>
              {interests.length > 0 && <Link href="/interests">interests(1)</Link>}
              <a href={identity.resumeHref}>resume.pdf</a>
            </nav>
          </header>
          <main id="content" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <ul className="keys" aria-label="Keyboard shortcuts">
              <li>
                <kbd>/</kbd> filter
              </li>
              <li>
                <kbd>j</kbd> <kbd>k</kbd> move
              </li>
              <li>
                <kbd>enter</kbd> open
              </li>
            </ul>
            <p className="xref">
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
              <a href={identity.github}>github.com/{identity.githubHandle}</a>
            </p>
            <p className="colophon">Set in Commit Mono under the SIL Open Font License.</p>
          </footer>
        </div>
        <KeyboardLayer />
      </body>
    </html>
  );
}
