import Link from "next/link";
import { Book } from "@/app/_notebook/book";

export default function NotFound() {
  return (
    <Book place="none">
      <div className="sheet">
        <div className="lede">
          <h1>Blank page</h1>
          <p className="prose">Nothing is written on this page.</p>
          <p className="prose">
            <Link href="/">Page 1</Link>
          </p>
        </div>
      </div>
    </Book>
  );
}
