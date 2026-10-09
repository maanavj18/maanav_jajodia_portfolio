import type { Metadata, Viewport } from "next";
import { Alegreya, Alegreya_SC, Kalam } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const alegreya = Alegreya({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-alegreya",
  display: "swap",
});

const alegreyaSC = Alegreya_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-alegreya-sc",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kalam",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const { identity } = getSite();
  return {
    title: { default: identity.name, template: `%s · ${identity.name}` },
    description: identity.headline,
  };
}

export const viewport: Viewport = {
  themeColor: "#f4efe2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${alegreya.variable} ${alegreyaSC.variable} ${kalam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
