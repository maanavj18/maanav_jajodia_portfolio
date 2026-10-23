"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ showInterests, resumeHref }: { showInterests: boolean; resumeHref: string }) {
  const pathname = usePathname();
  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    ...(showInterests ? [{ href: "/interests", label: "Interests" }] : []),
  ];

  return (
    <ul>
      {links.map(({ href, label }) => {
        const current = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link href={href} aria-current={current ? "page" : undefined}>
              {label}
            </Link>
          </li>
        );
      })}
      <li>
        <a href={resumeHref}>Resume (PDF)</a>
      </li>
    </ul>
  );
}
