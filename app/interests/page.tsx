import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <section className="interests-sheet">
      <h1>interests</h1>
      <ul className="course-list">
        {interests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </section>
  );
}
