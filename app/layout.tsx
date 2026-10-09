import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/content";
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
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="site-name">
            {identity.name}
          </Link>
          <nav aria-label="Primary">
            <Link href="/projects">Projects</Link>
            <Link href="/experience">Experience</Link>
            {interests.length > 0 && <Link href="/interests">Interests</Link>}
            <a href={identity.resumeHref}>Resume</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <a href={identity.github}>GitHub</a>
        </footer>
      </body>
    </html>
  );
}
