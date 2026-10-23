import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <Masthead current="interests" />
      <main id="main" className="sheet inside">
        <h1 className="section-flag">Interests</h1>
        <ul className="listings listings--plain">
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </main>
    </>
  );
}