import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { Prose } from "../_components/prose";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  const { interests } = getSite();
  if (interests.length === 0) notFound();

  return (
    <article className="sheet">
      <header className="front front--page">
        <h1 className="title title--page">Interests</h1>
      </header>
      <section className="section" aria-label="Interests">
        <ul className="plain-list">
          {interests.map((interest) => (
            <li key={interest}>
              <Prose text={interest} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
