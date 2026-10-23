import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { NavLinks } from "./_components/nav-links";
import "./globals.css";

const sourceSerif = localFont({
  src: [
    { path: "./fonts/SourceSerif4-Roman.subset.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/SourceSerif4-Italic.subset.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
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
    <html lang="en" className={sourceSerif.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to main text
        </a>
        <header className="runhead">
          <Link href="/" className="runhead-name">
            {identity.name}
          </Link>
          <nav aria-label="Primary">
            <NavLinks showInterests={interests.length > 0} resumeHref={identity.resumeHref} />
          </nav>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="colophon">
          <p>
            <span className="runin">Correspondence</span>{" "}
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <span className="sep" aria-hidden="true">
              {" · "}
            </span>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </p>
          <p className="colophon-type">Set in Source Serif 4, by Frank Grießhammer for Adobe, under the SIL Open Font License.</p>
        </footer>
      </body>
    </html>
  );
}
