import Link from "next/link";
import { SplitFlap } from "@/components/split-flap";
import { DirectionArrow } from "@/components/pictograms";

export default function NotFound() {
  return (
    <header className="sign">
      <h1>
        <SplitFlap text="NO SERVICE" />
      </h1>
      <p className="deck">This page is not posted.</p>
      <p className="back">
        <Link href="/">
          <DirectionArrow direction="left" />
          Home
        </Link>
      </p>
    </header>
  );
}
