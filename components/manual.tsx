import Link from "next/link";

export function ManualLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.endsWith(".pdf")
  ) {
    return <a href={href}>{children}</a>;
  }
  return <Link href={href}>{children}</Link>;
}

export function Manual({ page, children }: { page: string; children: React.ReactNode }) {
  return (
    <article className="manual">
      <p className="running">
        <span>{page}</span>
        <span>Portfolio Manual</span>
        <span>{page}</span>
      </p>
      {children}
    </article>
  );
}

export function ManualSection({
  id,
  title,
  spacing,
  children,
}: {
  id: string;
  title: string;
  spacing: "name" | "synopsis" | "description" | "seealso";
  children: React.ReactNode;
}) {
  return (
    <section className={`block ${spacing}`} aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="block-body">{children}</div>
    </section>
  );
}

export function FactList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="facts">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
