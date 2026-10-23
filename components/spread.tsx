import type { ReactNode } from "react";

export function Spread({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const pages = Array.isArray(children) ? children : [children];

  return (
    <div className={["spread", className].filter(Boolean).join(" ")}>
      <div className="page">{pages[0]}</div>
      <div className="gutter" aria-hidden="true" />
      <div className="page">{pages[1]}</div>
    </div>
  );
}
