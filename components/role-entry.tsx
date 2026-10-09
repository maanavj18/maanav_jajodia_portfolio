import type { Role } from "@/lib/content";

export function RoleEntry({ role, level = "h3" }: { role: Role; level?: "h2" | "h3" }) {
  const Title = level;

  return (
    <article className={role.featured ? "loud" : undefined}>
      <Title>
        {role.title}, {role.organization}
      </Title>
      <dl>
        {role.institution ? (
          <>
            <dt>Institution</dt>
            <dd>{role.institution}</dd>
          </>
        ) : null}
        <dt>Location</dt>
        <dd>{role.location}</dd>
        <dt>Dates</dt>
        <dd className="nums">{role.dates}</dd>
      </dl>
      <ul>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}
