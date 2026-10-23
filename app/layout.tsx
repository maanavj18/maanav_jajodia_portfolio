import type { Metadata } from "next";
import { Barlow_Condensed, Charis_SIL } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "800"],
  style: "normal",
  variable: "--font-barlow",
  display: "swap",
});

const charis = Charis_SIL({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-charis",
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
  return (
    <html lang="en" className={`${barlow.variable} ${charis.variable}`}>
      <body className={charis.className}>
        <a className="skip" href="#content">
          Skip to map sheet
        </a>
        {children}
      </body>
    </html>
  );
}