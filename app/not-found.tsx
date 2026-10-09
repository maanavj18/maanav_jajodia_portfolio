import Link from "next/link";
import { SiteHeader } from "./_components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <h1>Not found</h1>
        <p>
          There is no page at this address. <Link href="/">Go to the index</Link>.
        </p>
      </main>
    </>
  );
}