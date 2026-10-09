import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSite } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s · ${identity.name}` },
    description: identity.headline,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { identity, interests } = getSite();

  return (
    <html lang="en">
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <header>
          <nav aria-label="Primary">
            <a href="/">{identity.name}</a>
            <a href="/projects">Projects</a>
            <a href="/experience">Experience</a>
            {interests.length > 0 ? <a href="/interests">Interests</a> : null}
            <a href={identity.resumeHref}>Resume</a>
          </nav>
        </header>
        <hr />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <hr />
        <footer>
          <address>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </address>
          <p className="colophon">
            Colophon: Times, “Times New Roman”, serif at 20px. No web fonts. The choice is deliberate.
          </p>
        </footer>
      </body>
    </html>
  );
}
