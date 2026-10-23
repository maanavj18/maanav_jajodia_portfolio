import type { Metadata } from "next";
import { Karla } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import { SheetMarks } from "@/components/registration-mark";
import { getSite } from "@/lib/content";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-karla",
  display: "swap",
});

const outward = localFont({
  src: [
    { path: "../fonts/outward-block.woff2", weight: "400", style: "normal" },
    { path: "../fonts/outward-borders.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-outward",
  display: "swap",
  adjustFontFallback: false,
});

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
    <html lang="en" className={`${karla.variable} ${outward.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="sheet">
          <SheetMarks />
          <div className="spine" aria-hidden="true" />
          <header className="running">
            <Link href="/" className="running-name">
              {identity.name}
            </Link>
            <nav aria-label="Primary">
              <Link href="/projects">Projects</Link>
              <Link href="/experience">Experience</Link>
              {interests.length > 0 ? <Link href="/interests">Interests</Link> : null}
              <a href={identity.resumeHref}>Resume</a>
            </nav>
          </header>
          <main id="content" tabIndex={-1}>
            {children}
          </main>
          <footer className="colophon">
            <ul className="contacts">
              <li>
                <a href={`mailto:${identity.email}`}>{identity.email}</a>
              </li>
              <li>
                <a href={identity.github}>github.com/{identity.githubHandle}</a>
              </li>
            </ul>
            <p className="colophon-credit">
              Outward by Raoul Audouin, distributed by <a href="https://velvetyne.fr/">velvetyne.fr</a>.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}