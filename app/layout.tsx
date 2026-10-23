import type { Metadata } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { getSite } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
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
    <html lang="en" className={`${archivo.variable} ${azeret.variable}`}>
      <body>
        <div className="chassis">
          <a className="skip" href="#content">
            skip to content
          </a>
          <SiteHeader
            name={identity.name}
            resumeHref={identity.resumeHref}
            showInterests={interests.length > 0}
          />
          <main id="content">{children}</main>
          <footer className="colophon">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>{identity.githubHandle}</a>
          </footer>
        </div>
      </body>
    </html>
  );
}