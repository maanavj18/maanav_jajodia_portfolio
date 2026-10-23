import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { MastBar } from "@/components/mast";
import { ColumnBed } from "@/components/poster";
import { getSite } from "@/lib/content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s · ${identity.name}` },
    description: identity.headline,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { identity, education, interests } = getSite();

  return (
    <html lang="en" className={schibsted.className}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="sheet">
          <MastBar
            name={identity.name}
            school={education.school}
            resumeHref={identity.resumeHref}
            showInterests={interests.length > 0}
          />
          <main id="content" className="poster">
            <ColumnBed />
            {children}
            <ColumnBed />
          </main>
          <footer className="colophon">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
