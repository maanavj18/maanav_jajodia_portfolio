import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { SpecimenLine, fit } from "../_components/specimen";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <header className="page-head wrap">
        <div className="fit" style={fit("Interests")}>
          <h1 className="display display--page">Interests</h1>
        </div>
      </header>
      <div className="wrap block">
        <ul className="lines">
          {interests.map((interest) => (
            <SpecimenLine key={interest}>{interest}</SpecimenLine>
          ))}
        </ul>
      </div>
    </>
  );
}