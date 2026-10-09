import { Board } from "@/components/board";
import { getSite } from "@/lib/content";
import { homeDepartures } from "@/lib/departures";

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const rows = homeDepartures(experience, projects);

  return (
    <>
      <header className="sign sign--home">
        <h1>{identity.name}</h1>
        <p className="deck">{identity.headline}</p>
        <ul className="contacts">
          <li>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </li>
          <li>
            <a href={identity.github}>github.com/{identity.githubHandle}</a>
          </li>
          <li>
            <a href={identity.resumeHref}>Resume (PDF)</a>
          </li>
        </ul>
      </header>

      {rows.length > 0 ? <Board id="home" caption="DEPARTURES" rows={rows} /> : null}

      <section className="education" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <p className="audience">{identity.audience}</p>
        <p className="edu-lead">
          {education.degree}, {education.school}, {education.college}. {education.location}.
        </p>
        <dl className="facts">
          <div>
            <dt>GPA</dt>
            <dd>{education.gpa}</dd>
          </div>
          <div>
            <dt>Expected</dt>
            <dd>{education.expectedGraduation}</dd>
          </div>
          <div>
            <dt>Minor</dt>
            <dd>{education.minor}</dd>
          </div>
          <div>
            <dt>Specialization</dt>
            <dd>{education.specialization}</dd>
          </div>
        </dl>
        <h3>Coursework</h3>
        <p className="coursework">{education.coursework.join("; ")}.</p>
      </section>
    </>
  );
}
