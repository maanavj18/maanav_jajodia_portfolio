"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MastBar({
  name,
  school,
  resumeHref,
  showInterests,
}: {
  name: string;
  school: string;
  resumeHref: string;
  showInterests: boolean;
}) {
  const path = usePathname();
  const current = (href: string) =>
    path === href || (href !== "/" && path.startsWith(`${href}/`)) ? "page" : undefined;

  return (
    <header className="mast">
      <Link href="/" className="mast-name" aria-current={path === "/" ? "page" : undefined}>
        {name}
      </Link>
      <p className="mast-school">{school}</p>
      <nav className="mast-nav" aria-label="Primary">
        <Link href="/projects" aria-current={current("/projects")}>
          projects
        </Link>
        <Link href="/experience" aria-current={current("/experience")}>
          experience
        </Link>
        {showInterests ? (
          <Link href="/interests" aria-current={current("/interests")}>
            interests
          </Link>
        ) : null}
        <a href={resumeHref}>resume</a>
      </nav>
    </header>
  );
}
