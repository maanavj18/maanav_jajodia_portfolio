import { MapCanvas } from "@/components/map-canvas";
import { Marker } from "@/components/markers";
import { Sheet } from "@/components/sheet";
import { getSite } from "@/lib/content";
import { leadingFigure } from "@/lib/sheet-geo";

const HOME_SEED = 14022;

export default function Home() {
  const { identity, education, experience, projects } = getSite();
  const featured = experience.find((role) => role.featured) ?? experience[0];
  const stroke = projects.find((project) => project.slug === "stroke-analysis");
  const flight = projects.find((project) => project.slug === "flightscope");
  const f1 = featured ? leadingFigure(featured.bullets, /0\.79/) : undefined;
  const landmarks = stroke ? leadingFigure(stroke.bullets, /501/) : undefined;
  const records = flight ? leadingFigure(flight.bullets, /50k\+/) : undefined;

  return (
    <Sheet title={identity.name} current="home" lede={<p className="headline">{identity.headline}</p>}>
      <MapCanvas seed={HOME_SEED} size="sheet" coordinates scale elevations>
        {featured && (
          <a className="feature pos-nw" href="/experience">
            <Marker kind="benchmark" />
            {f1 && <span className="spot">{f1}</span>}
            <span className="label">F1 at IoU 0.5</span>
            <h2>{featured.organization}</h2>
            <p className="label sheet-rank">{featured.title}</p>
            <p className="label">{featured.dates}</p>
            <p className="sheet-note">RGB UAV tree-crown segmentation. 11-point gain over a DeepForest baseline.</p>
          </a>
        )}
        {stroke && (
          <a className="feature pos-sw" href={`/projects/${stroke.slug}`}>
            <Marker kind="site" />
            {landmarks && <span className="spot">{landmarks}</span>}
            <span className="label">landmarks per frame</span>
            <h2>{stroke.name}</h2>
            <p className="label">{stroke.dates}</p>
            <p className="sheet-note">30+ FPS MediaPipe Holistic.</p>
          </a>
        )}
        {flight && (
          <a className="feature pos-se" href={`/projects/${flight.slug}`}>
            <Marker kind="site" />
            {records && <span className="spot">{records}</span>}
            <span className="label">flight price records</span>
            <h2>{flight.name}</h2>
            <p className="label">{flight.dates}</p>
            <p className="sheet-note">500+ routes, 3+ travel APIs.</p>
          </a>
        )}
      </MapCanvas>
      <section className="education" aria-labelledby="education-title">
        <h2 id="education-title" className="section-label">
          Education
        </h2>
        <p>
          {education.school}, {education.college}. {education.location}.
        </p>
        <p>
          {education.degree}, expected {education.expectedGraduation}.
        </p>
        <p className="nums">
          GPA {education.gpa}. Minor in {education.minor}. Specialization in {education.specialization}.
        </p>
        <p>Coursework: {education.coursework.join("; ")}.</p>
      </section>
    </Sheet>
  );
}