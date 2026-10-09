import Link from "next/link";
import type { ReactNode } from "react";
import type { Departure } from "@/lib/departures";
import { lineLabel } from "@/lib/departures";
import { RouteMark } from "@/components/route-mark";
import { SplitFlap } from "@/components/split-flap";

const LINES = ["research", "projects", "leadership"] as const;

function LineLegend() {
  return (
    <div className="legend">
      <ul>
        {LINES.map((line) => (
          <li key={line}>
            <RouteMark line={line} />
            <span>{lineLabel(line)}</span>
          </li>
        ))}
      </ul>
      <p>Filled is active. Open is completed.</p>
    </div>
  );
}

export function Board({
  id,
  caption,
  rows,
  legend = true,
  children,
}: {
  id: string;
  caption: string;
  rows: Departure[];
  legend?: boolean;
  children?: ReactNode;
}) {
  const col = {
    time: `${id}-time`,
    line: `${id}-line`,
    service: `${id}-service`,
    detail: `${id}-detail`,
    status: `${id}-status`,
  };

  return (
    <div className="board board--departures">
      <table>
        <caption>
          <h2>
            <SplitFlap text={caption} />
          </h2>
        </caption>
        <thead>
          <tr>
            <th scope="col" id={col.time}>
              Time
            </th>
            <th scope="col" id={col.line}>
              Line
            </th>
            <th scope="col" id={col.service}>
              Service
            </th>
            <th scope="col" id={col.detail}>
              Detail
            </th>
            <th scope="col" id={col.status}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} data-line={row.line} data-status={row.status}>
              <td headers={col.time} className="cell-time">
                <span className="time-face">{row.time}</span>
              </td>
              <td headers={col.line} className="cell-line">
                <RouteMark line={row.line} completed={row.status === "completed"} />
                <span className="line-label">{lineLabel(row.line)}</span>
              </td>
              <td headers={col.service} className="cell-service">
                {row.href ? <Link href={row.href}>{row.service}</Link> : row.service}
              </td>
              <td headers={col.detail} className="cell-detail">
                {row.detail}
              </td>
              <td headers={col.status} className="cell-status">
                {row.status === "active" ? "Active" : "Completed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {legend ? <LineLegend /> : null}
      {children}
    </div>
  );
}
