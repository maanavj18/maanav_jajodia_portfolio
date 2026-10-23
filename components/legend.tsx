import Link from "next/link";
import { getSite } from "@/lib/content";
import { Marker, Swatch } from "@/components/markers";

export function Legend({ current }: { current?: "home" | "projects" | "experience" }) {
  const { identity } = getSite();

  return (
    <nav className="legend" aria-label="Map legend">
      <p className="label legend-title">Legend</p>
      <ul className="key">
        <li>
          <Swatch kind="index" />
          <span className="label">Index contour</span>
        </li>
        <li>
          <Swatch kind="intermediate" />
          <span className="label">Intermediate contour</span>
        </li>
        <li>
          <Swatch kind="water" />
          <span className="hydro-label">Hydrography</span>
        </li>
        <li>
          <Swatch kind="woodland" />
          <span className="label">Woodland</span>
        </li>
      </ul>
      <ul className="nav-list">
        <li>
          <Link href="/" aria-current={current === "home" ? "page" : undefined}>
            <Marker kind="sheet" />
            <span>{identity.name}</span>
          </Link>
        </li>
        <li>
          <Link href="/projects" aria-current={current === "projects" ? "page" : undefined}>
            <Marker kind="site" />
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link href="/experience" aria-current={current === "experience" ? "page" : undefined}>
            <Marker kind="benchmark" />
            <span>Experience</span>
          </Link>
        </li>
        <li>
          <a href={identity.resumeHref}>
            <Marker kind="sheet" />
            <span>Resume</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}