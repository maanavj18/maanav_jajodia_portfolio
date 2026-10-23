import type { ReactNode } from "react";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { Legend } from "@/components/legend";
import { SHEET_LAT_DEC, SHEET_LAT_DMS, SHEET_LON_DEC, SHEET_LON_DMS } from "@/lib/sheet-geo";

export function Sheet({
  title,
  kicker,
  lede,
  current,
  children,
}: {
  title: string;
  kicker?: ReactNode;
  lede?: ReactNode;
  current?: "home" | "projects" | "experience";
  children: ReactNode;
}) {
  const { identity, education } = getSite();

  return (
    <div className="atlas">
      <header className="collar">
        <p className="kicker">
          {current === "home" ? (
            <span className="label">Diagrammatic 7.5′ sheet</span>
          ) : (
            <Link className="label" href="/">
              {identity.name}
            </Link>
          )}
          {kicker}
        </p>
        <h1>{title}</h1>
        {lede}
        <p className="sheet-loc">
          <span className="label">Sheet point</span>
          <span className="coords">{SHEET_LAT_DMS}</span>
          <span className="coords">{SHEET_LON_DMS}</span>
          <span>{education.location}</span>
        </p>
        <p className="sheet-loc">
          <span className="label">GNIS 1080996, NAD 83</span>
          <span className="label nums">
            {SHEET_LAT_DEC}, {SHEET_LON_DEC}
          </span>
        </p>
        <p className="id-links">
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <a href={identity.github}>github.com/{identity.githubHandle}</a>
          <a href={identity.resumeHref}>Resume</a>
        </p>
      </header>
      <main id="content">{children}</main>
      <Legend current={current} />
      <footer className="colophon">
        <p>Centered on USGS GNIS 1080996, NAD 83. Contours are diagrammatic, not a measured terrain survey.</p>
      </footer>
    </div>
  );
}
