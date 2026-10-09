import type { Line } from "@/lib/departures";

const LETTER: Record<Line, string> = {
  research: "R",
  projects: "P",
  leadership: "L",
};

export function RouteMark({ line, completed = false }: { line: Line; completed?: boolean }) {
  return (
    <span
      className={`route route--${line}`}
      data-state={completed ? "completed" : "active"}
      aria-hidden="true"
    >
      {LETTER[line]}
    </span>
  );
}
