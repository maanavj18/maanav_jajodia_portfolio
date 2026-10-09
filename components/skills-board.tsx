import { SplitFlap } from "@/components/split-flap";

export function SkillsBoard({ skills }: { skills: { label: string; items: string[] }[] }) {
  if (skills.length === 0) return null;

  return (
    <section className="board board--skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">
        <SplitFlap text="SKILLS" />
      </h2>
      <table>
        <thead>
          <tr>
            <th scope="col" id="skills-group">
              Group
            </th>
            <th scope="col" id="skills-items">
              Items
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((group) => (
            <tr key={group.label}>
              <th scope="row" headers="skills-group">
                {group.label}
              </th>
              <td headers="skills-items">{group.items.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
