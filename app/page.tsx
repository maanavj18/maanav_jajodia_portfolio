import { getSite } from "@/lib/content";
import { getChecklist } from "@/lib/exhibits";
import { Checklist, ProjectExhibit, RoleExhibit, WallLabels } from "./components/exhibit";

export default function Home() {
  const { identity, education, experience, leadership, projects } = getSite();
  const words = identity.name.split(" ");

  return (
    <>
      <section className="entrance" aria-labelledby="name">
        <div className="entrance-wall">
          <h1 id="name" className="name">
            {words.map((word, i) => (
              <span key={word} className="name-line">
                {word}
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="headline">{identity.headline}</p>
          <ul className="contact">
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
        </div>
        <Checklist entries={getChecklist()} heading="Exhibition checklist" level="h2" id="checklist" />
      </section>

      {experience.length > 0 && (
        <section className="room" aria-labelledby="room-research">
          <h2 id="room-research" className="room-title">
            Research
          </h2>
          {experience.map((role) => (
            <RoleExhibit key={role.slug} role={role} level="h3" />
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="room" aria-labelledby="room-projects">
          <h2 id="room-projects" className="room-title">
            Projects
          </h2>
          {projects.map((project) => (
            <ProjectExhibit key={project.slug} project={project} level="h3" />
          ))}
        </section>
      )}

      {leadership.length > 0 && (
        <section className="room room-tight" aria-labelledby="room-leadership">
          <h2 id="room-leadership" className="room-title">
            Leadership
          </h2>
          <WallLabels roles={leadership} level="h3" />
        </section>
      )}

      <section className="room room-tight" aria-labelledby="room-education">
        <h2 id="room-education" className="room-title">
          Education
        </h2>
        <div className="wall-text">
          <p className="wall-text-lead">
            {education.degree}, {education.school}, {education.college}. Expected {education.expectedGraduation}.
          </p>
          <dl className="facts">
            <div>
              <dt>Place</dt>
              <dd>{education.location}</dd>
            </div>
            <div>
              <dt>GPA</dt>
              <dd className="numeric">{education.gpa}</dd>
            </div>
            <div>
              <dt>Specialization</dt>
              <dd>{education.specialization}</dd>
            </div>
            <div>
              <dt>Minor</dt>
              <dd>{education.minor}</dd>
            </div>
            {education.coursework.length > 0 && (
              <div>
                <dt>Coursework</dt>
                <dd>{education.coursework.join("; ")}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </>
  );
}