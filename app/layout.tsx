import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Doto } from "next/font/google";
import { Mast } from "@/components/mast";
import { getSite } from "@/lib/content";
import "./globals.css";

const reading = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-reading",
});

const boardFace = Doto({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-board",
});

export const viewport: Viewport = {
  themeColor: "#FFCC00",
  colorScheme: "light",
};

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
    <html lang="en" className={`${reading.variable} ${boardFace.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Mast
          name={identity.name}
          resumeHref={identity.resumeHref}
          showInterests={interests.length > 0}
        />
        <main id="content" tabIndex={-1} className="frame">
          {children}
        </main>
        <footer className="colophon">
          <div className="frame colophon-bar">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>GitHub</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
