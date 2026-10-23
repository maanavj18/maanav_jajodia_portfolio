import Link from "next/link";
import { Masthead } from "@/components/masthead";

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main id="main" className="sheet inside">
        <h1 className="section-flag">Page not found</h1>
        <p className="jump jump--from">
          <Link href="/">Return to the front page</Link>
        </p>
      </main>
    </>
  );
}