import type { ReactNode } from "react";

type Row = [label: string, value: ReactNode | undefined];

export function Particulars({ rows }: { rows: Row[] }) {
  return (
    <table className="particulars">
      <tbody>
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export function typeset(text: string): string {
  return text.replace(/'/g, "\u2019");
}