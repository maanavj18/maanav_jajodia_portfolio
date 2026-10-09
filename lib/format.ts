const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Sort key from the first month and year already written in a site date string. */
export function dateSortValue(input: string): string {
  const match = /([A-Za-z]+)\.?\s+(\d{4})/.exec(input);
  if (!match) return "0000-00";
  const index = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  const month = index >= 0 ? String(index + 1).padStart(2, "0") : "00";
  return `${match[2]}-${month}`;
}

export function rolePlace(role: { organization: string; institution?: string; location: string }): string {
  return [role.organization, role.institution, role.location].filter(Boolean).join(", ");
}
