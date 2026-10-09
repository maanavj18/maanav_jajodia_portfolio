const MONTHS: Record<string, string> = {
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  sept: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
};

/** Catalog number from the entry's opening month, so the label matches the date line. */
export function specimenNo(dates: string): string {
  const match = /([A-Za-z]+)\.?\s+(\d{4})/.exec(dates);
  if (!match) return "";
  const month = MONTHS[match[1].toLowerCase()];
  return month ? `${match[2]}.${month}` : match[2];
}
