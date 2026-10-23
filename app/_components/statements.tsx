import type { ReactNode } from "react";
import { leadFigureEnd, tableRows } from "@/lib/apparatus";
import { Prose } from "./prose";
import { Sidenote, type NoteCounter } from "./sidenote";

type Citation = {
  next: NoteCounter;
  /** Table these statements are tabulated in, e.g. { id: "table-1", label: "Table 1" }. */
  table: { id: string; label: string; offset?: number };
  source: ReactNode;
};

export function statementId(prefix: string, index: number) {
  return `s-${prefix.replaceAll(".", "-")}-${index}`;
}

function rowSpan(rows: number[]): string {
  if (rows.length === 1) return `row ${rows[0]}`;
  const contiguous = rows.every((row, i) => i === 0 || row === rows[i - 1] + 1);
  return contiguous ? `rows ${rows[0]}–${rows.at(-1)}` : `rows ${rows.join(", ")}`;
}

/**
 * Numbered statements (1.1, 1.2, …). When `cite` is given, each statement's
 * lead figure carries a note marker whose sidenote names its source and the
 * table rows it feeds.
 */
export function Statements({
  prefix,
  slug,
  bullets,
  cite,
}: {
  prefix: string;
  slug: string;
  bullets: string[];
  cite?: Citation;
}) {
  const rows = cite ? tableRows(slug, bullets) : [];

  return (
    <ol className="statements">
      {bullets.map((bullet, i) => {
        const end = cite ? leadFigureEnd(slug, bullet) : undefined;
        const mine = rows
          .map((row, r) => ({ row, r: r + 1 + (cite?.table.offset ?? 0) }))
          .filter(({ row }) => row.statement === i + 1)
          .map(({ r }) => r);

        return (
          <li key={bullet} id={statementId(prefix, i + 1)}>
            <span className="hang stmt-no">
              {prefix}.{i + 1}
            </span>
            {cite && end !== undefined && mine.length > 0 ? (
              <>
                <Prose text={bullet.slice(0, end)} />
                <Sidenote n={cite.next()}>
                  <a href={`#${cite.table.id}`}>{cite.table.label}</a>, {rowSpan(mine)}. {cite.source}
                </Sidenote>
                <Prose text={bullet.slice(end)} />
              </>
            ) : (
              <Prose text={bullet} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
