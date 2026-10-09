import { ManualLink } from "@/components/manual";

export type IndexColumn = {
  key: string;
  label: string;
  prefer?: "ascending" | "descending";
};

export type IndexCell = {
  key: string;
  text: string;
  value: string;
  href?: string;
};

export type IndexRow = {
  id: string;
  href?: string;
  cells: IndexCell[];
};

export function IndexFilter() {
  return (
    <div className="filter">
      <label htmlFor="index-filter">Filter</label>
      <input
        id="index-filter"
        name="filter"
        type="search"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <p id="index-empty" hidden>
        No rows match.
      </p>
    </div>
  );
}

export function IndexTable({
  caption,
  labelId,
  columns,
  rows,
  primary = false,
}: {
  caption?: string;
  labelId?: string;
  columns: IndexColumn[];
  rows: IndexRow[];
  primary?: boolean;
}) {
  return (
    <div className="table-wrap">
      <table
        role="table"
        data-sortable=""
        data-index={primary ? "primary" : undefined}
        aria-labelledby={labelId}
      >
        {caption ? <caption>{caption}</caption> : null}
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((column) => (
              <th
                key={column.key}
                role="columnheader"
                scope="col"
                aria-sort="none"
                data-prefer={column.prefer ?? "ascending"}
              >
                <button type="button" data-sort={column.key} aria-label={`Sort by ${column.label.toLowerCase()}`}>
                  {column.label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((row) => (
            <tr key={row.id} role="row" data-key={row.id}>
              {columns.map((column, index) => {
                const cell = row.cells.find((item) => item.key === column.key);
                if (!cell) return null;
                const href = index === 0 ? (row.href ?? cell.href) : cell.href;
                const content = (
                  <>
                    <span className="cell-label" aria-hidden="true">
                      {column.label}
                    </span>
                    {href ? <ManualLink href={href}>{cell.text}</ManualLink> : cell.text}
                  </>
                );
                if (index === 0) {
                  return (
                    <th key={column.key} role="rowheader" scope="row" data-col={column.key} data-value={cell.value}>
                      {content}
                    </th>
                  );
                }
                return (
                  <td key={column.key} role="cell" data-col={column.key} data-value={cell.value}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
