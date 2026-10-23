import type { Metadata } from "next";
import { f1Scale, tableRows } from "@/lib/apparatus";
import { getSite, type Role } from "@/lib/content";
import { ScaleFigure } from "../_components/figures";
import { Prose } from "../_components/prose";
import { ResultsTable, type ResultRow } from "../_components/results-table";
import { noteCounter } from "../_components/sidenote";
import { statementId, Statements } from "../_components/statements";

export const metadata: Metadata = { title: "Experience" };

function RoleHead({ role, number }: { role: Role; number?: string }) {
  return (
    <>
      <h3 className="role">
        {number && <span className="hang subno">{number}</span>} {role.title}, <Prose text={role.organization} />
      </h3>
      <p className="meta">
        {[role.institution, role.location].filter(Boolean).map((part, i) => (
          <span key={part}>
            {i > 0 && ", "}
            <Prose text={part ?? ""} />
          </span>
        ))}
        . {role.dates}.
      </p>
    </>
  );
}

function source(role: Role) {
  return (
    <>
      Source: {role.title}, <Prose text={role.organization} />, {role.dates}.
    </>
  );
}

export default function ExperiencePage() {
  const { experience, leadership, skills } = getSite();
  const next = noteCounter();
  const featured = experience[0];
  const scale = featured ? f1Scale(featured.bullets) : undefined;

  const research = experience.length > 0 ? 1 : 0;
  const leadershipNo = research + (leadership.length > 0 ? 1 : 0);
  const researchPrefix = (k: number) => (experience.length === 1 ? `${research}` : `${research}.${k + 1}`);
  const leadershipPrefix = (k: number) => `${leadershipNo}.${k + 1}`;

  let tableNo = 0;
  const researchTables = experience.map((role, k) => {
    const prefix = researchPrefix(k);
    const rows: ResultRow[] = tableRows(role.slug, role.bullets).map((row) => ({
      ...row,
      ref: { href: `#${statementId(prefix, row.statement)}`, label: `${prefix}.${row.statement}` },
    }));
    return rows.length > 0 ? { n: ++tableNo, rows } : undefined;
  });

  const leadershipRows: ResultRow[] = leadership.flatMap((role, k) => {
    const prefix = leadershipPrefix(k);
    return tableRows(role.slug, role.bullets).map((row) => ({
      ...row,
      ref: { href: `#${statementId(prefix, row.statement)}`, label: `${prefix}.${row.statement}` },
    }));
  });
  const leadershipTable = leadershipRows.length > 0 ? ++tableNo : undefined;
  const offsets = leadership.map((_, k) =>
    leadership.slice(0, k).reduce((sum, role) => sum + tableRows(role.slug, role.bullets).length, 0),
  );

  return (
    <article className="sheet">
      <header className="front front--page">
        <h1 className="title title--page">Experience</h1>
        <p className="lede">
          {featured && (
            <>
              Section <a href="#research">{research}</a> covers research in the <Prose text={featured.organization} />
              {leadership.length > 0 ? "; " : ". "}
            </>
          )}
          {leadership.length > 0 && (
            <>
              <a href="#leadership">§{leadershipNo}</a> covers leadership (
              {leadership.map((role, k) => (
                <span key={role.slug}>
                  {k > 0 && "; "}
                  <a href={`#${role.slug}`}>§{leadershipPrefix(k)}</a> <Prose text={role.organization} />
                </span>
              ))}
              ).{" "}
            </>
          )}
          {skills.length > 0 && (
            <>
              <a href="#appendix-a">Appendix A</a> lists skills.
            </>
          )}
        </p>
      </header>

      {featured && (
        <section id="research" className="section" aria-labelledby="research-heading">
          <h2 id="research-heading">
            <span className="hang secno">{research}</span> Research
          </h2>
          {experience.map((role, k) => {
            const table = researchTables[k];
            return (
              <div key={role.slug} id={role.slug} className="entry">
                <RoleHead role={role} number={experience.length > 1 ? researchPrefix(k) : undefined} />
                <Statements
                  prefix={researchPrefix(k)}
                  slug={role.slug}
                  bullets={role.bullets}
                  cite={
                    table
                      ? { next, table: { id: `table-${table.n}`, label: `Table ${table.n}` }, source: source(role) }
                      : undefined
                  }
                />
                {table && (
                  <ResultsTable
                    id={`table-${table.n}`}
                    label={`Table ${table.n}`}
                    caption={`${role.organization} results, by statement.`}
                    rows={table.rows}
                  />
                )}
                {k === 0 && scale && (
                  <ScaleFigure
                    id="figure-1"
                    label="Figure 1"
                    scale={scale}
                    statementHref={`#${statementId(researchPrefix(0), scale.statement)}`}
                    statementLabel={`${researchPrefix(0)}.${scale.statement}`}
                  />
                )}
              </div>
            );
          })}
        </section>
      )}

      {leadership.length > 0 && (
        <section id="leadership" className="section" aria-labelledby="leadership-heading">
          <h2 id="leadership-heading">
            <span className="hang secno">{leadershipNo}</span> Leadership
          </h2>
          {leadership.map((role, k) => (
            <div key={role.slug} id={role.slug} className="entry">
              <RoleHead role={role} number={leadershipPrefix(k)} />
              <Statements
                prefix={leadershipPrefix(k)}
                slug={role.slug}
                bullets={role.bullets}
                cite={
                  leadershipTable
                    ? {
                        next,
                        table: { id: `table-${leadershipTable}`, label: `Table ${leadershipTable}`, offset: offsets[k] },
                        source: source(role),
                      }
                    : undefined
                }
              />
            </div>
          ))}
          {leadershipTable && (
            <ResultsTable
              id={`table-${leadershipTable}`}
              label={`Table ${leadershipTable}`}
              caption="Figures from leadership roles, by statement."
              rows={leadershipRows}
            />
          )}
        </section>
      )}

      {skills.length > 0 && (
        <section id="appendix-a" className="section appendix" aria-labelledby="appendix-heading">
          <h2 id="appendix-heading">
            <span className="hang secno">A</span> Appendix: skills
          </h2>
          <div className="table-wrap">
            <table className="results results--skills">
              <caption>
                <span className="fig-no">Table A1.</span> <span className="caption-text">Skills by category.</span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Items</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((group) => (
                  <tr key={group.label}>
                    <th scope="row">{group.label}</th>
                    <td>
                      <Prose text={group.items.join(", ")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
