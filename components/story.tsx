import Link from "next/link";
import type { ReactNode } from "react";
import { splitLead } from "@/lib/headline";

export type Detail = { label: string; value: ReactNode };

type StoryProps = {
  id: string;
  kicker: string;
  lead: string;
  body: string[];
  byline: ReactNode;
  level: 1 | 2 | 3;
  size: "lead" | "major" | "brief";
  columns?: 1 | 2 | 3;
  href?: string;
  dateline?: string;
  details?: Detail[];
  jump?: { href: string; label: string };
  className?: string;
};

export function Story({
  id,
  kicker,
  lead,
  body,
  byline,
  level,
  size,
  columns = 2,
  href,
  dateline,
  details,
  jump,
  className,
}: StoryProps) {
  const { head, deck } = splitLead(lead);
  const Heading = `h${level}` as const;
  const jumpLine = jump && (
    <p className="jump">
      <Link href={jump.href}>Continued on {jump.label}</Link>
    </p>
  );
  const hasFlow = body.length > 0 || (details && details.length > 0);

  return (
    <article className={["story", `story--${size}`, className].filter(Boolean).join(" ")} aria-labelledby={id}>
      <p className="kicker">{kicker}</p>
      <Heading id={id} className="headline">
        {href ? <Link href={href}>{head}</Link> : head}
      </Heading>
      {deck && <p className="deck">{deck}</p>}
      <p className="byline">{byline}</p>
      {hasFlow ? (
        <div className="flow" data-cols={columns}>
          {body.map((paragraph, index) => (
            <p key={paragraph}>
              {index === 0 && dateline && <span className="dateline">{dateline}&nbsp;&mdash; </span>}
              {paragraph}
            </p>
          ))}
          {details && details.length > 0 && (
            <figure className="details">
              <figcaption>Details</figcaption>
              <dl>
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          )}
          {jumpLine}
        </div>
      ) : (
        jumpLine
      )}
    </article>
  );
}