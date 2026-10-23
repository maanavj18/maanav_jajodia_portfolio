import "server-only";
import { cache } from "react";
import { getSite, type Role } from "@/lib/content";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function startOf(dates: string): { year: number; month: number } {
  const first = dates.split(/\s+[\u2013-]\s+/)[0] ?? "";
  const year = Number(/\d{4}/.exec(first)?.[0] ?? 0);
  const month = MONTHS.indexOf(first.trim().slice(0, 3).toLowerCase());
  return { year, month: Math.max(month, 0) };
}

export type ExhibitKey = `role:${string}` | `project:${string}`;

/** Museum `YEAR.SEQ` accession numbers, numbered by start date within each year. */
export const getAccessions = cache((): Map<ExhibitKey, string> => {
  const { experience, leadership, projects } = getSite();
  const items = [
    ...[...experience, ...leadership].map((role) => ({ key: `role:${role.slug}` as ExhibitKey, dates: role.dates })),
    ...projects.map((project) => ({ key: `project:${project.slug}` as ExhibitKey, dates: project.dates })),
  ].map((item) => ({ ...item, ...startOf(item.dates) }));

  items.sort((a, b) => a.year - b.year || a.month - b.month || a.key.localeCompare(b.key));

  const sequence = new Map<number, number>();
  const accessions = new Map<ExhibitKey, string>();
  for (const item of items) {
    const next = (sequence.get(item.year) ?? 0) + 1;
    sequence.set(item.year, next);
    accessions.set(item.key, `${item.year}.${next}`);
  }
  return accessions;
});

export function accession(key: ExhibitKey): string {
  return getAccessions().get(key) ?? "";
}

export type ChecklistEntry = {
  key: ExhibitKey;
  accession: string;
  href: string;
  title: string;
  detail: string;
  dates: string;
};

function roleEntry(role: Role): ChecklistEntry {
  return {
    key: `role:${role.slug}`,
    accession: accession(`role:${role.slug}`),
    href: `/experience#${role.slug}`,
    title: role.organization,
    detail: role.title,
    dates: role.dates,
  };
}

/** The exhibition checklist in gallery order: research, then projects, then leadership. */
export function getChecklist(): ChecklistEntry[] {
  const { experience, leadership, projects } = getSite();
  return [
    ...experience.map(roleEntry),
    ...projects.map((project) => ({
      key: `project:${project.slug}` as ExhibitKey,
      accession: accession(`project:${project.slug}`),
      href: `/projects/${project.slug}`,
      title: project.name,
      detail: project.stack.join(", "),
      dates: project.dates,
    })),
    ...leadership.map(roleEntry),
  ];
}