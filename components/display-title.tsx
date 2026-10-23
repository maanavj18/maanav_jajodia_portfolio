import type { CSSProperties, ElementType, ReactNode } from "react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";
type Size = "xl" | "lg" | "md";

export function DisplayTitle({
  as = "h2",
  tilt = "-1.1deg",
  weight = 400,
  size = "lg",
  settle = false,
  className,
  children,
}: {
  as?: Tag;
  tilt?: string;
  weight?: 400 | 700;
  size?: Size;
  settle?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const TagName = as as ElementType;
  const style = { "--tilt": tilt, fontWeight: weight } as CSSProperties;
  const classes = ["display", `display-${size}`, settle ? "display-settle" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <TagName className={classes} style={style}>
      <span className="ink ink-pink" aria-hidden="true">
        {children}
      </span>
      <span className="ink ink-blue">{children}</span>
    </TagName>
  );
}
