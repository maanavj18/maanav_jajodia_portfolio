export type Line = "research" | "projects" | "leadership";

export type RunStatus = "active" | "completed";

export type Departure = {
  id: string;
  time: string;
  line: Line;
  service: string;
  detail: string;
  status: RunStatus;
  href?: string;
};

type RoleLike = {
  slug: string;
  organization: string;
  institution?: string;
  location: string;
  title: string;
  dates: string;
  featured?: boolean;
  bullets: string[];
};

type ProjectLike = {
  slug: string;
  name: string;
  dates: string;
  stack: string[];
  bullets: string[];
};

export type Figure = { value: string; unit: string };

const LINE_LABEL: Record<Line, string> = {
  research: "Research",
  projects: "Projects",
  leadership: "Leadership",
};

export function lineLabel(line: Line): string {
  return LINE_LABEL[line];
}

/** Dates that end in Present are still running. Every other posted range has ended. */
export function runStatus(dates: string): RunStatus {
  return /present$/i.test(dates.trim()) ? "active" : "completed";
}

export function typographic(value: string): string {
  return value.replaceAll("'", "’");
}

export function roleDeparture(role: RoleLike, line: Line, href?: string): Departure {
  return {
    id: role.slug,
    time: role.dates,
    line,
    service: role.organization,
    detail: [role.title, role.location].filter(Boolean).join(", "),
    status: runStatus(role.dates),
    href,
  };
}

export function projectDeparture(project: ProjectLike): Departure {
  return {
    id: project.slug,
    time: project.dates,
    line: "projects",
    service: project.name,
    detail: project.stack.join(", "),
    status: runStatus(project.dates),
    href: `/projects/${project.slug}`,
  };
}

export function homeDepartures(experience: RoleLike[], projects: ProjectLike[]): Departure[] {
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const rows: Departure[] = [];

  if (featured) {
    const row = roleDeparture(featured, "research", `/experience#${featured.slug}`);
    const record = featured.bullets.join(" ");
    rows.push(
      record.includes("0.79 F1")
        ? { ...row, detail: `${featured.title} · 0.79 F1` }
        : row,
    );
  }

  for (const project of projects) rows.push(projectDeparture(project));
  return rows;
}

export function experienceDepartures(experience: RoleLike[], leadership: RoleLike[]): Departure[] {
  return [
    ...experience.map((role) => roleDeparture(role, "research", `#${role.slug}`)),
    ...leadership.map((role) => roleDeparture(role, "leadership", `#${role.slug}`)),
  ];
}

export function projectFigure(project: ProjectLike): Figure | undefined {
  const record = project.bullets.join(" ");
  if (project.slug === "stroke-analysis" && record.includes("30+ FPS")) {
    return { value: "30+", unit: "frames per second" };
  }
  if (project.slug === "flightscope" && record.includes("50k+")) {
    return { value: "50k+", unit: "historical fare records" };
  }
  return undefined;
}

export function roleFigure(role: RoleLike): Figure | undefined {
  const record = role.bullets.join(" ");
  if (role.slug === "sai-lab" && record.includes("0.79 F1")) {
    return { value: "0.79", unit: "F1 at IoU\u00a00.5" };
  }
  return undefined;
}
