import type { Metadata } from "next";
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
  const { identity } = getSite();

  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        <footer className="site-footer">
          <address>
            {identity.name}, <a href={`mailto:${identity.email}`}>{identity.email}</a>,{" "}
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </address>
          <p className="colophon">Set in Times, the serif your computer already has. No web fonts, on purpose.</p>
        </footer>
      </body>
    </html>
  );
}