import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FactList, Manual, ManualSection } from "@/components/manual";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "interests(1)" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <Manual page="interests(1)">
      <h1>interests</h1>
      <ManualSection id="name" title="NAME" spacing="name">
        <FactList items={interests} />
      </ManualSection>
    </Manual>
  );
}
