import { getSite } from "@/lib/content";

export default function NotFound() {
  const { identity } = getSite();

  return (
    <>
      <h1>Not found</h1>
      <p>No page exists at this address.</p>
      <p>
        <a href="/">{identity.name}</a>
      </p>
    </>
  );
}
