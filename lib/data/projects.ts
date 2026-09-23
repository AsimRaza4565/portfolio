export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; lang?: string; title?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface CaseSection {
  id: string;
  label: string;
  blocks: Block[];
}

export type ProjectStatus = "live" | "open-source" | "hackathon" | "production" | "personal";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "github" | "case" | "external";
}

export interface Project {
  slug: string;
  name: string;
  accent?: string;
  tagline: string;
  role: string;
  year: string;
  status: ProjectStatus;
  statusLabel?: string;
  summary: string;
  tech: string[];
  links: ProjectLink[];
  visual:
    | { kind: "image"; src: string; alt: string }
    | { kind: "mock" }
    | { kind: "storefront" };
  caseStudy?: CaseSection[];
}

export interface ProductionSite {
  name: string;
  domain: string;
  href: string;
  blurb: string;
  tag: string;
}

export const productionSites: ProductionSite[] = [
  {
    name: "21st Century Equipment",
    domain: "21stcenturyequipment.com",
    href: "https://21stcenturyequipment.com",
    blurb:
      "Flagship John Deere dealer storefront — inventory, parts, service and precision-ag pages across Colorado, Wyoming and Nebraska.",
    tag: "25+ locations",
  },
  {
    name: "4Rivers Equipment",
    domain: "4riversequipment.com",
    href: "https://4riversequipment.com",
    blurb:
      "Dealer storefront for Colorado, New Mexico and Texas since 1926 — rentals, new & used equipment, and John Deere technology lines.",
    tag: "since 1926",
  },
  {
    name: "The Backyard",
    domain: "thebackyard.com",
    href: "https://thebackyard.com",
    blurb:
      "The home & ranch brand of 21st Century — mowers, compact tractors and outdoor power equipment for Colorado backyards.",
    tag: "home & ranch",
  },
];

export const moreWork = [
  {
    name: "Internal admin tooling",
    text: "Dashboards that keep the team unblocked — built at Revnix, used weekly.",
  },
  {
    name: "Figma → production web",
    text: "Pixel-accurate responsive conversions from design handoff to deployed pages.",
  },
  {
    name: "Open source & snippets",
    text: "Small contributions and utilities — the residue of solving things twice.",
  },
];

export const featured: Project[] = [
  {
    slug: "job-radar",
    name: "Job Radar",
    accent: "Radar",
    tagline: "A job-hunting engine that works while I sleep",
    role: "Design, architecture, full build",
    year: "2026",
    status: "personal",
    statusLabel: "personal product",
    summary:
      "Every ~3 hours a scheduled tick runs a serverless search across JSearch and three remote feeds; results are skill-matched, deduplicated into SQLite, and emailed as a digest — while the dashboard tracks status, keywords, and AI-tailored résumés.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "Turso / SQLite", "Gemini API", "Nodemailer", "cron-job.org"],
    links: [
      { label: "Read the case study", href: "/projects/job-radar", kind: "case" },
      { label: "Live deployment — personal use", href: "https://job-radar-mauve.vercel.app/", kind: "live" },
      { label: "AsimRaza4565/job-radar", href: "https://github.com/AsimRaza4565/job-radar", kind: "github" },
    ],
    visual: { kind: "mock" },
    caseStudy: [
      {
        id: "context",
        label: "context",
        blocks: [
          {
            type: "p",
            text: "Job hunting at the junior-to-mid level is a filtering problem: hundreds of postings across a dozen platforms, most of which don't fit. Scanning them manually is a full-time job nobody pays for. I wanted the funnel inverted — roles that match my stack should arrive already ranked, deduplicated, and readable in one email.",
          },
          {
            type: "p",
            text: "Job Radar is that system. It runs itself: an external cron ticks every 30 minutes, an in-app cooldown turns that into a real **Next.js serverless search** every ~3 hours (self-healing missed ticks), pulling from **JSearch** and three free remote feeds in parallel, and deciding what's worth my attention.",
          },
        ],
      },
      {
        id: "problem",
        label: "problem",
        blocks: [
          {
            type: "p",
            text: "Three constraints shaped the design. It had to run on free-tier infrastructure (Vercel Hobby, Turso's free SQLite, Gmail SMTP). It had to be stateful enough to dedupe across runs and track application status. And matching had to be tunable without redeploying — keywords live in the database, edited from the dashboard.",
          },
        ],
      },
      {
        id: "decisions",
        label: "decisions",
        blocks: [
          {
            type: "h3",
            text: "The pipeline is one serverless function with clear stages",
          },
          {
            type: "code",
            lang: "ts",
            title: "app/api/search/route.ts",
            code: `// 1. read keywords from DB        3. filter by skill match
// 2. fetch JSearch + RemoteOK      4. dedupe against stored jobs
//                                 5. persist + email the digest`,
          },
          {
            type: "p",
            text: "Each stage writes a **search log**, so the activity view can answer *why* a run found 3 jobs when yesterday's found 40. Observable-by-default beats clever.",
          },
          { type: "h3", text: "Drizzle + Turso for typed SQL on free tier" },
          {
            type: "p",
            text: "Three tables — `jobs`, `search_keywords`, `search_logs` — with Drizzle providing the typed query layer. Schema-as-code means migrations are reviewable PRs, and Turso's free tier comfortably handles cron-sized writes.",
          },
              { type: "h3", text: "AI résumé tailoring with a human in the loop" },
              {
                type: "p",
                text: "Pick a saved job — or paste any job description — and **Gemini** returns a structured proposal: a relevance score, targeted edits to headline, summary, skills and experience bullets (each with a before/after and a JD-driven *why*), plus a draft cover letter. The guardrails are the point: job titles, dates, contact and education are immutable in the type system, and the DOCX renderer owns all formatting — the model can only propose wording, never invent history.",
              },
              {
                type: "p",
                text: "Every proposal is reviewed edit-by-edit — accept, reject, or tweak — before a tailored `.docx` is generated server-side and saved to a history of variants. It turned the system from a reader into a small apply-workflow.",
              },
        ],
      },
      {
        id: "outcome",
        label: "outcome",
        blocks: [
          {
            type: "list",
            items: [
              "Fully automated on free-tier infra — zero running cost, zero maintenance windows.",
              "Deduplication across sources and runs — each posting appears exactly once, ever.",
              "Skill-match filtering tuned live from the dashboard's keyword manager.",
              "Email digests with direct apply links and Rozee.pk fallbacks for local listings.",
              "AI résumé tailoring that stays honest — Gemini proposes, I review, the renderer enforces the truth.",
            ],
          },
        ],
      },
      {
        id: "retro",
        label: "what i'd do differently",
        blocks: [
          {
            type: "p",
            text: "I'd add match-quality telemetry from the start — logging which keywords actually led to applications would make tuning objective instead of vibes-based. And the matcher's current scoring is a weighted keyword count; an embeddings pass on job descriptions is the obvious next upgrade, cheap to add behind the same interface.",
          },
        ],
      },
    ],
  },
  {
    slug: "betterment",
    name: "Betterment",
    accent: "Betterment",
    tagline: "Urdu-first civic reporting for Pakistani cities",
    role: "Full-stack developer",
    year: "2025",
    status: "hackathon",
    statusLabel: "hackathon — placed",
    summary:
      "A civic issue-reporting app built at Build for Pakistan: residents report local problems in Urdu or English, photos are AI-verified through Gemini, and reports route to a Node/Postgres backend from a React Native client.",
    tech: ["React Native · Expo", "Node.js", "PostgreSQL", "Gemini AI", "i18n"],
    links: [{ label: "Read the case study", href: "/projects/betterment", kind: "case" }],
    visual: { kind: "image", src: "/betterment.webp", alt: "Betterment civic reporting app" },
    caseStudy: [
      {
        id: "context",
        label: "context",
        blocks: [
          {
            type: "p",
            text: "Build for Pakistan challenges teams to ship something useful for Pakistani cities in a weekend. Our pick: civic reporting — potholes, broken streetlights, sanitation — where the friction isn't reporting itself, it's *trust and language*. Reports needed to work in **Urdu first**, and they needed to be verifiable before they hit a dashboard.",
          },
        ],
      },
      {
        id: "problem",
        label: "problem",
        blocks: [
          {
            type: "p",
            text: "Two hard parts. Verification: a photo of *something* isn't a photo of *the reported issue* — we needed a gate that rejected irrelevant images without a human in the loop. Language: forms, prompts and error states all had to feel native in Urdu, not translated-afterthought.",
          },
        ],
      },
      {
        id: "decisions",
        label: "decisions",
        blocks: [
          {
            type: "h3",
            text: "Gemini as the verification gate",
          },
          {
            type: "p",
            text: "Every submission's photo passes through a Gemini check against the report category before it's accepted — a structured prompt returns pass/fail with a confidence, and borderline cases get flagged for review instead of silently dropped.",
          },
          { type: "h3", text: "Urdu-first i18n, not English-with-translations" },
          {
            type: "p",
            text: "Strings, layout direction considerations and typography were designed for Urdu first; English is the fallback locale. RTL-friendly component structure came from enforcing logical CSS properties everywhere in the React Native client.",
          },
          { type: "h3", text: "Thin client, honest backend" },
          {
            type: "p",
            text: "A Node/Postgres API with a clean reports domain — the mobile client stays thin and offline-tolerant for flaky networks, queueing submissions locally when connectivity drops.",
          },
        ],
      },
      {
        id: "outcome",
        label: "outcome",
        blocks: [
          {
            type: "list",
            items: [
              "Placed at Build for Pakistan — recognized in a national field of teams.",
              "AI-verified reports with zero manual pre-moderation during the demo.",
              "Bilingual UX that felt native in Urdu — judged by Urdu-first users.",
            ],
          },
        ],
      },
      {
        id: "retro",
        label: "what i'd do differently",
        blocks: [
          {
            type: "p",
            text: "Hackathon pacing meant the verification prompt went through one iteration; production would need a proper eval set of tricky photos and a feedback loop on false accepts. I'd also spend more on the offline queue — our tolerance for network flakiness was optimism, not engineering.",
          },
        ],
      },
    ],
  },
  {
    slug: "scalable-authz",
    name: "Scalable Authz",
    accent: "Authz",
    tagline: "RBAC as a clean layer, not scattered if-statements",
    role: "Systems design & build",
    year: "2024",
    status: "open-source",
    statusLabel: "open source",
    summary:
      "A role-based access control engine built to prove permissions can be a domain-agnostic layer — typed policies, composable roles, and audit-friendly checks — exercised across Posts and Events domains on Next.js App Router and MongoDB.",
    tech: ["Next.js App Router", "TypeScript", "MongoDB", "RBAC"],
    links: [
      { label: "Read the case study", href: "/projects/scalable-authz", kind: "case" },
      { label: "GitHub", href: "https://github.com/AsimRaza4565", kind: "github" },
    ],
    visual: { kind: "image", src: "/role-based-CRUD.webp", alt: "Role-based CRUD permission matrix" },
    caseStudy: [
      {
        id: "context",
        label: "context",
        blocks: [
          {
            type: "p",
            text: "Authorization is where most apps quietly rot: role checks smeared across components, routes and API handlers, each slightly different, none testable. I wanted to build the version I'd want to inherit — permission logic as an explicit, typed layer that reads like policy, not archaeology.",
          },
        ],
      },
      {
        id: "problem",
        label: "problem",
        blocks: [
          {
            type: "p",
            text: "The system had to answer three questions uniformly — *who* can do *what* to *which resource* — support role inheritance and resource-scoped rules, and stay framework-agnostic enough to drop into a Next.js app router project without contortions.",
          },
        ],
      },
      {
        id: "decisions",
        label: "decisions",
        blocks: [
          { type: "h3", text: "Policies as data, checked in one place" },
          {
            type: "code",
            lang: "ts",
            code: `const policy = definePolicy({
  role: "editor",
  can: ["post:read", "post:update"],
  inherits: ["viewer"],
  scope: { "post:update": { ownerOnly: true } },
});`,
          },
          {
            type: "p",
            text: "Roles compose through inheritance; resource-scoped conditions (like owner-only writes) are part of the policy, not a special case at the call site.",
          },
          { type: "h3", text: "Two demo domains, one engine" },
          {
            type: "p",
            text: "**Posts** and **Events** exercise the engine with different shapes — ownership rules on one, RSVP capacity rules on the other — proving the layer doesn't leak domain assumptions.",
          },
        ],
      },
      {
        id: "outcome",
        label: "outcome",
        blocks: [
          {
            type: "list",
            items: [
              "Single audit surface: every permission decision traces to one policy object.",
              "Role inheritance and per-resource scoping without framework coupling.",
              "The patterns now ship in production work at Revnix — RBAC on real storefronts.",
            ],
          },
        ],
      },
      {
        id: "retro",
        label: "what i'd do differently",
        blocks: [
          {
            type: "p",
            text: "Next step would be derived caching of resolved permissions per session, and a policy diff tool — the moment permissions multiply, *seeing* what changed between two policy versions becomes the real product.",
          },
        ],
      },
    ],
  },
  {
    slug: "production-storefronts",
    name: "Dealer Storefronts",
    accent: "Storefronts",
    tagline: "Production Next.js commerce for US John Deere dealers",
    role: "Frontend developer @ Revnix",
    year: "2025 — present",
    status: "production",
    statusLabel: "in production",
    summary:
      "The storefronts I build and maintain at Revnix — 21st Century Equipment, 4Rivers Equipment and The Backyard — serve 25+ US locations with CMS-driven pages, auth, payments and performance budgets that hold.",
    tech: ["Next.js", "TypeScript", "Nextly CMS", "Stripe", "Vercel", "Tailwind"],
    links: [
      { label: "21st Century Equipment", href: "https://21stcenturyequipment.com", kind: "live" },
      { label: "4Rivers Equipment", href: "https://4riversequipment.com", kind: "live" },
      { label: "The Backyard", href: "https://thebackyard.com", kind: "live" },
    ],
    visual: { kind: "storefront" },
    caseStudy: [
      {
        id: "context",
        label: "context",
        blocks: [
          {
            type: "p",
            text: "At [Revnix](https://revnix.com) I work on the frontend of dealer storefronts running on the company's **Nextly CMS** — a TypeScript-native, open-source CMS for Next.js. Three brands run this stack today: [21st Century Equipment](https://21stcenturyequipment.com) (25+ locations across CO/WY/NE), [4Rivers Equipment](https://4riversequipment.com) (CO/NM/TX), and [The Backyard](https://thebackyard.com), 21st Century's home & ranch brand.",
          },
        ],
      },
      {
        id: "problem",
        label: "the work",
        blocks: [
          {
            type: "p",
            text: "Dealer sites look like marketing sites but behave like products: deep inventory, parts and service flows; editorial teams publishing daily; and enterprise realities — consent management, tag managers, CRM integrations — that have to coexist with performance budgets.",
          },
          {
            type: "list",
            items: [
              "**CMS-driven page systems** — layouts and blocks that editors compose without engineering involvement, on Nextly schemas.",
              "**Commerce flows** — auth, role-based access and Stripe payment paths that work across brands.",
              "**Performance as a requirement** — Lighthouse 90+ budgets on real content-heavy pages; Core Web Vitals monitored, not hoped for.",
              "**Trust & compliance** — CSP hardening, Osano cookie consent, GTM and Dynamics 365 integrations that don't fight the page.",
              "**Internal tooling** — admin interfaces that keep content and operations teams unblocked.",
            ],
          },
        ],
      },
      {
        id: "decisions",
        label: "what i've learned",
        blocks: [
          {
            type: "p",
            text: "Production dealer work rewires how you think about frontend. Component systems have to survive *editors*, not just designers. Every integration is a performance tax negotiation. And a CSP violation or a consent banner misfire on a US-facing brand costs more than any bug I've shipped in a side project. It's the best possible school for caring about the details nobody notices until they're wrong.",
          },
        ],
      },
      {
        id: "outcome",
        label: "outcome",
        blocks: [
          {
            type: "list",
            items: [
              "Three live brands, 25+ locations, daily publishing — on a stack I help maintain.",
              "Performance and quality budgets that hold on production traffic.",
              "The INP and App Router notes in my writing come from these sites, not theory.",
            ],
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return featured.find((p) => p.slug === slug);
}

export const allProjects = featured;
