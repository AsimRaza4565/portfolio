export interface SkillDiscipline {
  id: string;
  label: string;
  blurb: string;
  chips: string[];
}

export const disciplines: SkillDiscipline[] = [
  {
    id: "frontend",
    label: "frontend",
    blurb:
      "Interfaces in React and Next.js that stay fast under real content — server components, streaming, design systems, and React Native when the product needs a phone.",
    chips: [
      "React",
      "Next.js App Router",
      "TypeScript",
      "React Native · Expo",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Radix / shadcn",
    ],
  },
  {
    id: "backend-data",
    label: "backend & data",
    blurb:
      "The parts behind the UI — Node APIs, auth and RBAC, Postgres with Prisma or Drizzle, Stripe, CMS schema design. I build my own pipelines when a product needs them; Job Radar runs on exactly this.",
    chips: [
      "Node.js",
      "REST APIs",
      "Server Actions",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Drizzle ORM",
      "JWT · NextAuth",
      "RBAC",
      "Stripe",
      "Nextly CMS",
    ],
  },
  {
    id: "workflow",
    label: "workflow & delivery",
    blurb:
      "Shipping discipline — Git and GitHub Actions (this site deploys itself), Docker, Vercel and Coolify, with accessibility and performance budgets treated as requirements, not garnish.",
    chips: [
      "Git · GitHub",
      "GitHub Actions",
      "Docker",
      "Vercel · Coolify",
      "Postman",
      "Lighthouse / CWV",
      "SEO essentials",
    ],
  },
];

export const beyond = [
  {
    icon: "gauge",
    title: "Performance",
    text: "Core Web Vitals as a feature — INP profiling, streaming, and budgets that hold on real content, not lab pages.",
  },
  {
    icon: "accessibility",
    title: "Accessibility",
    text: "Semantic markup, keyboard paths, focus states and reduced-motion support shipped by default, not retrofitted.",
  },
  {
    icon: "search",
    title: "SEO & visibility",
    text: "Metadata, structured data and crawlable structure so the work gets found — this site practices what it preaches.",
  },
] as const;

export const stackMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Drizzle",
  "Prisma",
  "MongoDB",
  "Stripe",
  "Tailwind",
  "Zustand",
  "TanStack Query",
  "Docker",
  "GitHub Actions",
  "Vercel",
];
