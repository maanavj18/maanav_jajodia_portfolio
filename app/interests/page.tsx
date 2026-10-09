import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <header className="sign">
        <h1>Interests</h1>
      </header>
      <div className="board">
        <ul className="notes">
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
