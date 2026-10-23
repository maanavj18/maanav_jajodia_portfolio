import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

export type Role = {
  slug: string;
  organization: string;
  institution?: string;
  location: string;
  title: string;
  dates: string;
  featured: boolean;
  bullets: string[];
};

export type Project = {
  slug: string;
  name: string;
  dates: string;
  stack: string[];
  goal?: string;
  demoUrl?: string;
  repoUrl?: string;
  bullets: string[];
};

export type SkillGroup = { label: string; items: string[] };

export type Site = {
  identity: {
    name: string;
    headline: string;
    audience: string;
    email: string;
    github: string;
    githubHandle: string;
    resumeHref: string;
  };
  education: {
    school: string;
    college: string;
    location: string;
    degree: string;
    gpa: string;
    expectedGraduation: string;
    minor: string;
    specialization: string;
    coursework: string[];
  };
  experience: Role[];
  leadership: Role[];
  projects: Project[];
  interests: string[];
  skills: SkillGroup[];
};

type Block = {
  fields: Record<string, string>;
  bullets: string[];
};

type Section = Block & { entries: Map<string, Block> };

const FIELD = /^- ([A-Za-z][A-Za-z ]{0,24}): (.+)$/;

function emptyBlock(): Block {
  return { fields: {}, bullets: [] };
}

function parse(markdown: string): Map<string, Section> {
  const sections = new Map<string, Section>();
  let section: Section | undefined;
  let block: Block | undefined;

  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      section = { ...emptyBlock(), entries: new Map() };
      sections.set(line.slice(3).trim().toLowerCase(), section);
      block = section;
    } else if (line.startsWith("### ") && section) {
      block = emptyBlock();
      section.entries.set(line.slice(4).trim(), block);
    } else if (line.startsWith("- ") && block) {
      const field = FIELD.exec(line);
      if (field) block.fields[field[1].toLowerCase()] = field[2].trim();
      else block.bullets.push(line.slice(2).trim());
    }
  }
  return sections;
}

function supplied(value: string | undefined): string | undefined {
  if (!value || value.toLowerCase() === "not supplied") return undefined;
  return value;
}

function list(value: string | undefined, separator: RegExp): string[] {
  return (value ?? "")
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toRole(slug: string, { fields, bullets }: Block): Role {
  return {
    slug,
    organization: fields.organization,
    institution: fields.institution,
    location: fields.location,
    title: fields.title,
    dates: fields.dates,
    featured: fields.featured === "yes",
    bullets,
  };
}

function toProject(slug: string, { fields, bullets }: Block): Project {
  return {
    slug,
    name: fields.name,
    dates: fields.dates,
    stack: list(fields.stack, /,/),
    goal: supplied(fields.goal),
    demoUrl: supplied(fields["demo url"]),
    repoUrl: supplied(fields["repo url"]),
    bullets,
  };
}

export const getSite = cache((): Site => {
  const file = path.join(process.cwd(), "content", "site.md");
  const sections = parse(readFileSync(file, "utf8"));
  const section = (name: string) => sections.get(name) ?? { ...emptyBlock(), entries: new Map<string, Block>() };

  const identity = section("identity").fields;
  const education = section("education").fields;
  const skills = section("skills").fields;

  const experience = [...section("experience").entries].map(([slug, block]) => toRole(slug, block));
  experience.sort((a, b) => Number(b.featured) - Number(a.featured));

  return {
    identity: {
      name: identity.name,
      headline: identity.headline,
      audience: identity.audience,
      email: identity.email,
      github: identity.github,
      githubHandle: identity["github handle"],
      resumeHref: identity["resume href"],
    },
    education: {
      school: education.school,
      college: education.college,
      location: education.location,
      degree: education.degree,
      gpa: education.gpa,
      expectedGraduation: education["expected graduation"],
      minor: education.minor,
      specialization: education.specialization,
      coursework: list(education.coursework, /;/),
    },
    experience,
    leadership: [...section("leadership").entries].map(([slug, block]) => toRole(slug, block)),
    projects: [...section("projects").entries].map(([slug, block]) => toProject(slug, block)),
    interests: section("interests").bullets,
    skills: Object.entries(skills).map(([label, items]) => ({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      items: list(items, /,/),
    })),
  };
});

export function getProject(slug: string): Project | undefined {
  return getSite().projects.find((project) => project.slug === slug);
}
