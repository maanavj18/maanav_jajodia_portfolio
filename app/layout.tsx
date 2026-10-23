import type { Metadata } from "next";
import { Anybody } from "next/font/google";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { Morph } from "./_components/specimen";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-anybody",
});

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
    <html lang="en" className={anybody.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to main content
        </a>
        <header className="masthead">
          <div className="masthead__inner wrap">
            <Link href="/" className="masthead__name">
              <Morph>{identity.name}</Morph>
            </Link>
            <nav aria-label="Primary">
              <ul className="masthead__nav">
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
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="colophon">
          <div className="wrap">
            <ul className="colophon__contact">
              <li>
                <a href={`mailto:${identity.email}`}>{identity.email}</a>
              </li>
              <li>
                <a href={identity.github}>github.com/{identity.githubHandle}</a>
              </li>
              <li>
                <a href={identity.resumeHref}>Resume (PDF)</a>
              </li>
            </ul>
            <p className="colophon__note">Set in Anybody by Etcetera Type Co.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}