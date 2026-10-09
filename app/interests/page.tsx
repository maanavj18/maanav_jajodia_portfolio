import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Book } from "@/app/_notebook/book";
import { getSite } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests, projects } = getSite();
  if (interests.length === 0) notFound();

  return (
    <Book page={4 + projects.length} place="interests">
      <div className="sheet">
        <div className="lede">
          <h1>Interests</h1>
          <ul>
            {interests.map((interest) => (
              <li key={interest} className="prose">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Book>
  );
}
