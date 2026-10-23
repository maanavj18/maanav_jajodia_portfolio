import type { CSSProperties } from "react";
import type { Parts } from "@/lib/specs";

export function Exploded({ parts }: { parts: Parts }) {
  return (
    <figure className="drawing">
      <span className="crop crop-nw" aria-hidden="true" />
      <span className="crop crop-ne" aria-hidden="true" />
      <span className="crop crop-sw" aria-hidden="true" />
      <span className="crop crop-se" aria-hidden="true" />
      <ol className="exploded">
        {parts.items.map((item, index) => {
          const id = `part-${item.replace(/\s+/g, "-")}`;
          return (
            <li key={item} id={id} style={{ "--i": index } as CSSProperties}>
              <a href={`#${id}`}>
                <span className="plate" aria-hidden="true" />
                <span className="leader" aria-hidden="true" />
                <span className="part-name">{item}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <figcaption>{parts.caption}</figcaption>
    </figure>
  );
}
