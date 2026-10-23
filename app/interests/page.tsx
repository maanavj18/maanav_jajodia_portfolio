import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sheet } from "@/components/sheet";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <Sheet title="Interests">
      <ul className="notes">
        {interests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </Sheet>
  );
}
