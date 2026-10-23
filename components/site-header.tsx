"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({
  name,
  resumeHref,
  showInterests,
}: {
  name: string;
  resumeHref: string;
  showInterests: boolean;
}) {
  const pathname = usePathname();
  const items = [
    { href: "/projects", label: "projects" },
    { href: "/experience", label: "experience" },
    ...(showInterests ? [{ href: "/interests", label: "interests" }] : []),
  ];

  return (
    <header className="mast">
      <Link href="/" className="wordmark" aria-current={pathname === "/" ? "page" : undefined}>
        {name}
      </Link>
      <nav aria-label="Primary">
        {items.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
        <a href={resumeHref}>resume</a>
      </nav>
    </header>
  );
}
