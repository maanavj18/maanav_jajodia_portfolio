import Link from "next/link";
import type { ReactNode } from "react";
import { DisplayTitle } from "@/components/display-title";

export function Plate({
  title,
  href,
  level = "h2",
  tilt = "-1.05deg",
  size = "lg",
  meta,
  children,
}: {
  title: string;
  href?: string;
  level?: "h2" | "h3";
  tilt?: string;
  size?: "lg" | "md";
  meta?: ReactNode;
  children?: ReactNode;
}) {
  const Heading = level;
  const heading = (
    <DisplayTitle as="span" tilt={tilt} size={size}>
      {title}
    </DisplayTitle>
  );

  return (
    <article className="plate">
      <Heading className="plate-title">
        {href ? (
          <Link href={href} className="plate-link">
            {heading}
          </Link>
        ) : (
          heading
        )}
      </Heading>
      {meta ? <div className="plate-meta">{meta}</div> : null}
      {children ? <div className="plate-body">{children}</div> : null}
    </article>
  );
}
