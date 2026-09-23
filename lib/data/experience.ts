export interface ExperienceEntry {
  role: string;
  company: string;
  companyHref?: string;
  location: string;
  period: string;
  current?: boolean;
  note?: string;
  achievements: string[];
  tech: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    company: "Revnix",
    companyHref: "https://revnix.com",
    location: "Haripur, PK · remote-friendly",
    period: "Oct 2025 — present",
    current: true,
    note: "Promoted from frontend intern (Apr – Sep 2025) after six months.",
    achievements: [
      "Build and maintain Next.js storefronts for US John Deere dealers — 21st Century Equipment, 4Rivers Equipment and The Backyard — serving 25+ locations.",
      "Ship customer-facing features end to end: auth flows, role-based access, Stripe payments, and CMS-driven page systems editors actually enjoy.",
      "Hold performance and quality bars on production pages — Core Web Vitals / Lighthouse 90+ budgets, plus CSP and cookie-consent hardening for US audiences.",
      "Integrate third-party systems (Dynamics 365, Google Reviews) and build internal admin tooling used by the team weekly.",
    ],
    tech: ["Next.js", "TypeScript", "Nextly CMS", "Stripe", "Tailwind"],
  },
  {
    role: "Web Developer Intern",
    company: "Rhombix Technologies",
    companyHref: "https://www.rhombixtechnologies.com/",
    location: "Remote · Lahore, PK",
    period: "Oct 2025 — Jan 2026",
    note: "Concurrent remote internship alongside Revnix.",
    achievements: [
      "Built responsive React interfaces for a library management system and a music player app.",
      "Practiced component reuse and clean HTML/CSS/Tailwind fundamentals across varied layouts.",
    ],
    tech: ["React", "JavaScript", "HTML/CSS", "Tailwind"],
  },
  {
    role: "Web Developer Intern",
    company: "BISP HQ",
    companyHref: "https://bisp.gov.pk/",
    location: "Islamabad, PK",
    period: "Jul 2024 — Sep 2024",
    achievements: [
      "Built internal web pages with C#, SQL and Bootstrap inside a government IT environment.",
      "Learned to ship carefully where process, review and stability outrank speed.",
    ],
    tech: ["C#", "SQL", "Bootstrap"],
  },
];
