import Link from "next/link";
import { getSite } from "@/lib/content";

type Page = "home" | "projects" | "experience" | "interests";

export function SiteHeader({ current }: { current?: Page }) {
  const { identity, interests } = getSite();
  const pages: { key: Page; href: string; label: string }[] = [
    { key: "home", href: "/", label: identity.name },
    { key: "projects", href: "/projects", label: "Projects" },
    { key: "experience", href: "/experience", label: "Experience" },
  ];
  if (interests.length > 0) pages.push({ key: "interests", href: "/interests", label: "Interests" });

  return (
    <header className="site-header">
      <nav aria-label="Site">
        <ul>
          {pages.map((page) => (
            <li key={page.key}>
              {page.key === current ? (
                <strong aria-current="page">{page.label}</strong>
              ) : (
                <Link href={page.href}>{page.label}</Link>
              )}
            </li>
          ))}
          <li>
            <a href={identity.resumeHref}>Resume (PDF)</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}