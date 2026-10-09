import type { Measurement } from "./measurements";
import { Pencil } from "./Pencil";

type Props = {
  rows: Measurement[];
  caption: string;
  /** Source text of the one row whose value gets a pencil circle. */
  circle?: { source: string; order: number };
};

export function Measurements({ rows, caption, circle }: Props) {
  if (rows.length === 0) return null;
  return (
    <table className="measurements">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Value</th>
          <th scope="col">As recorded</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const value = (
            <>
              {row.value}
              {row.unit && <span className="measurements__unit">{row.unit}</span>}
            </>
          );
          return (
            <tr key={row.source}>
              <td className="measurements__value">
                {circle?.source === row.source ? (
                  <Pencil kind="circle" order={circle.order}>
                    {value}
                  </Pencil>
                ) : (
                  value
                )}
              </td>
              <td>{row.caption}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
