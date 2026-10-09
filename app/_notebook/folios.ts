import type { Project, Site } from "@/lib/content";

export type Leaf = {
  href: string;
  title: string;
  folio: number;
};

export type SpecimenLeaf = Leaf & { specimen: string; slug: string };

export type Leaves = {
  index: Leaf;
  projects: Leaf;
  specimens: SpecimenLeaf[];
  experience: Leaf;
  interests?: Leaf;
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Reads the opening month of a range such as "Mar. 2026 – Present". */
export function startOf(dates: string): { year: string; month: string } | undefined {
  const match = /([A-Za-z]{3})[A-Za-z]*\.?\s+(\d{4})/.exec(dates);
  if (!match) return undefined;
  const month = MONTHS.indexOf(match[1].toLowerCase()) + 1;
  if (month === 0) return undefined;
  return { year: match[2], month: String(month).padStart(2, "0") };
}

/** Collector's number: initials plus the year and month collection began, e.g. MJ-2603. */
export function specimenNumber(site: Site, project: Project): string {
  const initials = site.identity.name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  const start = startOf(project.dates);
  return start ? `${initials}-${start.year.slice(2)}${start.month}` : `${initials}-${project.slug}`;
}

export function leaves(site: Site): Leaves {
  let folio = 1;
  const index = { href: "/", title: "Index", folio: folio++ };
  const projects = { href: "/projects", title: "Projects", folio: folio++ };
  const specimens = site.projects.map((project) => ({
    href: `/projects/${project.slug}`,
    title: project.name,
    slug: project.slug,
    folio: folio++,
    specimen: specimenNumber(site, project),
  }));
  const experience = { href: "/experience", title: "Experience", folio: folio++ };
  const interests =
    site.interests.length > 0 ? { href: "/interests", title: "Interests", folio: folio++ } : undefined;
  return { index, projects, specimens, experience, interests };
}

export function specimenLeaf(site: Site, slug: string): SpecimenLeaf | undefined {
  return leaves(site).specimens.find((leaf) => leaf.slug === slug);
}
