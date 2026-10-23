import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Interests</h1>
      </header>
      <div className="wall-text">
        <ul className="interest-list">
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </>
  );
}