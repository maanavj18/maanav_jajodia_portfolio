import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { cooperHewitt } from "./fonts";
import "./globals.css";

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s \u00b7 ${identity.name}` },
    description: identity.headline,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { identity, interests } = getSite();

  return (
    <html lang="en" className={cooperHewitt.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link href="/" className="site-name">
            {identity.name}
          </Link>
          <nav aria-label="Primary" className="site-nav">
            <ul>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/experience">Experience</Link>
              </li>
              {interests.length > 0 && (
                <li>
                  <Link href="/interests">Interests</Link>
                </li>
              )}
              <li>
                <a href={identity.resumeHref}>Resume</a>
              </li>
            </ul>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <ul className="footer-contact">
            <li>
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
            </li>
            <li>
              <a href={identity.github}>github.com/{identity.githubHandle}</a>
            </li>
          </ul>
          <p className="colophon">
            Set in Cooper Hewitt by Chester Jenkins, released by Cooper Hewitt, Smithsonian Design Museum, under the SIL
            Open Font License. Drawings are generated on the server from each exhibit&rsquo;s figures.
          </p>
        </footer>
      </body>
    </html>
  );
}