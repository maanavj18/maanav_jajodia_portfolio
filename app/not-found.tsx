import Link from "next/link";
import { getSite } from "@/lib/content";

export default function NotFound() {
  const { identity } = getSite();

  return (
    <section className="not-found">
      <p className="spine">404</p>
      <h1>page not found</h1>
      <p className="not-found-link">
        <Link href="/">{identity.name}</Link>
      </p>
    </section>
  );
}
