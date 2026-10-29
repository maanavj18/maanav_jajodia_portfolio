import Link from "next/link";

export default function NotFound() {
  return (
    <article className="sheet">
      <header className="front front--page">
        <h1 className="title title--page">Page not found</h1>
        <p className="lede">
          No page exists at this address. The <Link href="/">front page</Link> lists every section.
        </p>
      </header>
    </article>
  );
}
