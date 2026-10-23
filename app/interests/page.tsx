import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { typographic } from "@/lib/specs";

export const metadata: Metadata = { title: "interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <header className="page-head">
        <h1>interests</h1>
      </header>
      <ul className="notes">
        {interests.map((interest) => (
          <li key={interest}>{typographic(interest)}</li>
        ))}
      </ul>
    </>
  );
}