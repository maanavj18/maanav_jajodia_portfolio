import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisplayTitle } from "@/components/display-title";
import { Overprint } from "@/components/overprint";
import { Records } from "@/components/records";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <>
      <div className="opener">
        <div className="masthead">
          <DisplayTitle as="h1" size="xl" weight={700} tilt="-1.6deg">
            Interests
          </DisplayTitle>
        </div>
        <Overprint />
      </div>
      <Records items={interests} />
    </>
  );
}