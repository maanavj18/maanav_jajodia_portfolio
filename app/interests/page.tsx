import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { typeset } from "../_components/particulars";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <SiteHeader current="interests" />
      <main id="main">
        <h1>Interests</h1>
        <ul>
          {interests.map((interest) => (
            <li key={interest}>{typeset(interest)}</li>
          ))}
        </ul>
      </main>
    </>
  );
}