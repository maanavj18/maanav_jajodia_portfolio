/** Edition date for the masthead and folio. Computed on the server. */
export function editionStamp(now = new Date()) {
  const timeZone = "America/New_York";
  const label = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(now);
  const iso = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    timeZone,
  }).format(now);
  return { label, iso };
}
