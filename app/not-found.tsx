import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-head">
      <h1>404</h1>
      <p className="deck">No sheet at this address.</p>
      <p className="more">
        <Link href="/">cover sheet</Link>
      </p>
    </header>
  );
}