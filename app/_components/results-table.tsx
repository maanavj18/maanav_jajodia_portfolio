import { Prose, sentenceCase } from "./prose";

export type ResultRow = { quantity: string; value: string; ref: { href: string; label: string } };

/** Booktabs-style table: caption above, three rules, no verticals. */
export function ResultsTable({
  id,
  label,
  caption,
  rows,
}: {
  id: string;
  label: string;
  caption: string;
  rows: ResultRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <div className="table-wrap">
      <table id={id} className="results">
        <caption>
          <span className="fig-no">{label}.</span> <span className="caption-text">{caption}</span>
        </caption>
        <thead>
          <tr>
            <th scope="col">Quantity</th>
            <th scope="col" className="num">
              Reported
            </th>
            <th scope="col" className="num">
              Statement
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.ref.label}-${row.quantity}`}>
              <th scope="row">
                <Prose text={sentenceCase(row.quantity)} />
              </th>
              <td className="num figure">
                <Prose text={row.value} />
              </td>
              <td className="num">
                <a href={row.ref.href}>{row.ref.label}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
