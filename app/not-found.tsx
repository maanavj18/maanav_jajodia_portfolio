import Link from "next/link";
import { fit } from "./_components/specimen";

export default function NotFound() {
  return (
    <section className="page-head wrap" aria-labelledby="not-found">
      <div className="fit" style={fit("Not found")}>
        <h1 id="not-found" className="display display--page">
          Not found
        </h1>
      </div>
      <p className="more">
        <Link href="/">Home</Link>
      </p>
    </section>
  );
}