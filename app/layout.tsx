import type { Metadata } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const caslonDisplay = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--face-display",
  display: "swap",
});

const caslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
  variable: "--face-text",
  display: "swap",
});

const caslonItalic = Libre_Caslon_Text({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--face-text-italic",
  display: "swap",
});

const franklin = Libre_Franklin({
  weight: ["400", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--face-franklin",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s \u00b7 ${identity.name}` },
    description: identity.headline,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { identity } = getSite();
  const faces = [caslonDisplay, caslonText, caslonItalic, franklin].map((face) => face.variable).join(" ");

  return (
    <html lang="en" className={faces}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <footer className="colophon">
          <p className="colophon-contact">
            <span className="colophon-name">{identity.name}</span>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
            <a href={identity.resumeHref}>Resume (PDF)</a>
          </p>
          <p className="colophon-type">Set in Libre Caslon and Libre Franklin.</p>
        </footer>
      </body>
    </html>
  );
}