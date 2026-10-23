import { editionStamp } from "@/lib/edition";

export function EditionDate() {
  const { iso, label } = editionStamp();

  return (
    <time className="edition-date" dateTime={iso}>
      {label}
    </time>
  );
}
