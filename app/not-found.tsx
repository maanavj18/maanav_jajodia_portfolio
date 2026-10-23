import Link from "next/link";
import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";

export default function NotFound() {
  return (
    <article className="opener">
      <div>
        <div className="masthead">
          <DisplayTitle as="h1" size="xl" weight={700} tilt="-1.8deg">
            Not found
          </DisplayTitle>
        </div>
        <p className="measure follow">No page at this address.</p>
        <p className="follow">
          <Link href="/">Home</Link>
        </p>
      </div>
      <Overprint />
    </article>
  );
}
