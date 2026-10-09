"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { YouAreHere } from "@/components/pictograms";

export function Mast({
  name,
  resumeHref,
  showInterests,
}: {
  name: string;
  resumeHref: string;
  showInterests: boolean;
}) {
  const path = usePathname();
  const items = [
    { href: "/projects", label: "Projects", current: path.startsWith("/projects") },
    { href: "/experience", label: "Experience", current: path.startsWith("/experience") },
    ...(showInterests
      ? [{ href: "/interests", label: "Interests", current: path.startsWith("/interests") }]
      : []),
  ];

  return (
    <header className="mast">
      <div className="frame mast-bar">
        <Link href="/" className="station" aria-current={path === "/" ? "page" : undefined}>
          {path === "/" ? <YouAreHere /> : null}
          <span>{name}</span>
        </Link>
        <nav aria-label="Primary">
          {items.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.current ? "page" : undefined}>
              {item.current ? <YouAreHere /> : null}
              {item.label}
            </Link>
          ))}
          <a href={resumeHref}>Resume</a>
        </nav>
      </div>
    </header>
  );
}
