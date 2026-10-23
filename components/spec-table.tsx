import { typographic, type SpecRow } from "@/lib/specs";

export function SpecTable({
  caption,
  labelledBy,
  rows,
}: {
  caption?: string;
  labelledBy?: string;
  rows: SpecRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <table className="specs" aria-labelledby={labelledBy}>
      {caption ? <caption>{caption}</caption> : null}
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td className={row.value.length <= 28 ? "qty" : undefined}>{typographic(row.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
