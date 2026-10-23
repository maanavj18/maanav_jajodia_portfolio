import { headers } from "next/headers";
import { citationKey, invertedName } from "@/lib/apparatus";
import { CopyButton } from "./copy-button";

export async function absoluteUrl(path: string): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return path;
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}${path}`;
}

/**
 * "Cite this page": a reference with a hanging indent, the same record as
 * BibTeX, and a copy control for each.
 */
export async function CiteBlock({
  author,
  title,
  path,
  keySuffix,
  date,
  note,
}: {
  author: string;
  title: string;
  path: string;
  keySuffix?: string;
  date?: string;
  note?: string;
}) {
  const url = await absoluteUrl(path);
  const name = invertedName(author);
  const key = citationKey(author, keySuffix);

  const plain = [`${name}.`, `${title}.`, date && `${date}.`, note && `${note}.`, url].filter(Boolean).join(" ");
  const bibtex = [
    `@misc{${key},`,
    `  author = {${name}},`,
    `  title = {${title}},`,
    date && `  date = {${date}},`,
    note && `  note = {${note}},`,
    `  url = {${url}}`,
    `}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="cite" aria-labelledby="cite-heading">
      <h2 id="cite-heading" className="cite-heading">
        Cite this page
      </h2>
      <p className="reference">
        {name}. <cite>{title}</cite>. {date && <>{date}. </>}
        {note && <>{note}. </>}
        <a href={url} className="url">
          {url}
        </a>
      </p>
      <details className="bibtex">
        <summary>BibTeX record</summary>
        <pre>{bibtex}</pre>
      </details>
      <p className="cite-actions">
        <CopyButton text={plain} label="Copy reference" />
        <CopyButton text={bibtex} label="Copy BibTeX" />
      </p>
    </section>
  );
}
