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
    tag: "Since 1926",
  },
  {
    name: "The Backyard",
    domain: "thebackyard.com",
    href: "https://thebackyard.com",
    blurb:
      "The home & ranch brand of 21st Century — mowers, compact tractors and outdoor power equipment for Colorado backyards.",
    tag: "Home & ranch",
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
    tagline: "A multi-user job-hunting engine that works while I sleep",
    role: "Design, architecture, full build",
    year: "2026",
    status: "personal",
    statusLabel: "Personal product",
    summary:
      "A scheduled serverless pipeline that scans JSearch, three remote feeds, three job boards and eight company ATS boards every ~3 hours, runs each posting through a seven-stage filter pipeline, and emails per-user digests — with CV-driven onboarding, an admin console, and AI résumé tailoring that edits your original DOCX in place.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "Turso / SQLite", "Gemini API", "OOXML editing", "Nodemailer", "cron-job.org"],
    links: [
      { label: "Read the case study", href: "/projects/job-radar", kind: "case" },
      { label: "Live deployment — personal use", href: "https://job-radar-mauve.vercel.app/", kind: "live" },
      { label: "AsimRaza4565/job-radar", href: "https://github.com/AsimRaza4565/job-radar", kind: "github" },
    ],
    visual: { kind: "image", src: "/job-radar.webp", alt: "Job Radar dashboard — scored job feed with keyword manager and activity log" },
    caseStudy: [
      {
        id: "context",
        label: "Context",
        blocks: [
          {
            type: "p",
            text: "Job hunting at the junior-to-mid level is a filtering problem: hundreds of postings across a dozen platforms, most of which don't fit. Scanning them manually is a full-time job nobody pays for. I wanted the funnel inverted — roles that match my stack should arrive already ranked, deduplicated, and readable in one email.",
          },
          {
            type: "p",
            text: "Job Radar started as that personal scraper. It has since grown into a small **multi-user product**: sign-up with email verification, upload your CV, and the system builds a search plan around *your* profile — cities, titles, experience level — then runs it for you on the same scheduled pipeline I built for myself, with an admin console and in-app announcements alongside.",
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        blocks: [
          {
            type: "p",
            text: "The original constraints still stand — free-tier infrastructure only (Vercel Hobby, Turso's free SQLite, Gmail SMTP), stateful dedup across runs, and matching tunable without redeploying. Multi-user added harder ones: every user needs an isolated search plan derived from their CV without hand-holding, the filter pipeline has to respect each person's experience level and home market, and the AI features must help without ever putting words in anyone's mouth.",
          },
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
        blocks: [
          {
            type: "h3",
            text: "Sources: aggregators for reach, direct ATS boards for speed",
          },
          {
            type: "p",
            text: "Every run fans out across **JSearch** (Pakistan), three free remote feeds (RemoteOK, We Work Remotely, Himalayas), three job boards (LinkedIn, Indeed, Bing), and — the piece I'm proudest of — **direct polling of eight company ATS boards** (Greenhouse, Lever, Ashby, Workable). ATS boards need no API keys and no aggregators, so a role appears the moment a company publishes it, not when a crawler gets around to it.",
          },
          {
            type: "h3",
            text: "A seven-stage filter pipeline per user",
          },
          {
            type: "code",
            lang: "ts",
            title: "lib/matcher/*",
            code: `// skill score → seniority guard → rival-stack guard
// → work-auth filter → language filter → location filter
// → blocklists (mills + pay-to-apply aggregators)`,
          },
          {
            type: "p",
            text: "Each stage is a small pure module with its own tests-in-waiting, driven by the user's onboarding answers — a 2-years-experience user in Islamabad and a remote-first user get genuinely different feeds. Deleted jobs become tombstones, so a dismissed posting never resurfaces. Every run writes a **search log**, so the activity view can answer *why* a run found 3 jobs when yesterday's found 40.",
          },
          { type: "h3", text: "CV onboarding: extract, never invent" },
          {
            type: "p",
            text: "New users upload their existing `.docx` CV. **Mammoth** converts it to HTML (keeping hyperlinks intact), **Gemini** extracts titles, skills and preferences *verbatim* — the prompt forbids rewriting or improving — and the user confirms or edits the draft before it ever touches the search plan. Extraction proposes; onboarding confirms.",
          },
          { type: "h3", text: "Résumé tailoring as in-place OOXML surgery" },
          {
            type: "p",
            text: "The second-generation tailoring no longer rebuilds résumés from a template. A source map anchors each profile field to paragraphs inside the user's original document, and accepted edits are applied as **string-level surgery on `word/document.xml`** — changed paragraphs rewritten in place, removed bullets deleted, new bullets cloned from an existing bullet's formatting. Untouched bytes stay exactly as Word wrote them, so your original typography survives. If the map can't produce a faithful result, it falls back to the template builder rather than guess.",
          },
          {
            type: "p",
            text: "The guardrails are the point: **Gemini** scores relevance across five pillars and refuses to tailor below 30 — no edits, no cover letter. Proposals are capped at twelve surgical edits, each with an exact `before`, a tailored `after`, and a *why* citing the JD line and the résumé evidence. Job titles, dates, contact and education are immutable in the type system. The model can only propose wording; it can never invent history.",
          },
          {
            type: "p",
            text: "Every proposal is reviewed edit-by-edit — accept, reject, or tweak — before the tailored `.docx` is generated server-side and saved to a history of variants, alongside a draft cover letter written only from real experience.",
          },
          { type: "h3", text: "Multi-user without the bill" },
          {
            type: "p",
            text: "Email auth with verification and reset flows, an admin role with a users console, in-app announcements shipped in code (a notice goes live with the same deploy as its feature), per-user API keys, and rotating JSearch keys with quota tracking so the free tier survives multiple users. Nine tables on Drizzle + Turso — schema as reviewable code.",
          },
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        blocks: [
          {
            type: "list",
            items: [
              "A scheduled pipeline scanning 8+ source types every ~3 hours — fully automated on free-tier infra, zero running cost.",
              "Per-user feeds from CV onboarding: geo-rotated search plans, experience-aware filters, tombstoned dedup across sources and runs.",
              "A seven-stage matcher that kills senior roles, rival stacks, US-work-auth-only listings, non-English posts and known mills before they ever reach an inbox.",
              "Résumé tailoring that stays honest and keeps your formatting — Gemini proposes with evidence, the OOXML editor applies in place, history keeps every variant.",
              "A real product surface: email auth, admin console, announcements, per-user settings — not just a cron job with a page.",
            ],
          },
        ],
      },
      {
        id: "retro",
        label: "What I'd do differently",
        blocks: [
          {
            type: "p",
            text: "The OOXML editor is deliberately string-based so untouched bytes survive — but that also means no structural validation, so malformed documents lean on the fallback path more than I'd like. Next pass: a validator that scores a document's mappability *before* onboarding, so users with exotic CV layouts get a heads-up instead of a silent template fallback. And the matcher's scoring is still a weighted keyword count — an embeddings pass on job descriptions is the obvious upgrade, cheap to add behind the same interface.",
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
    statusLabel: "Hackathon — placed",
    summary:
      "A civic issue-reporting app built at Build for Pakistan: residents report local problems in Urdu or English, photos are AI-verified through Gemini, and reports route to a Node/Postgres backend from a React Native client.",
    tech: ["React Native · Expo", "Node.js", "PostgreSQL", "Gemini AI", "i18n"],
    links: [{ label: "Read the case study", href: "/projects/betterment", kind: "case" }],
    visual: { kind: "image", src: "/betterment.webp", alt: "Betterment civic reporting app" },
    caseStudy: [
      {
        id: "context",
        label: "Context",
        blocks: [
          {
            type: "p",
            text: "Build for Pakistan challenges teams to ship something useful for Pakistani cities in a weekend. Our pick: civic reporting — potholes, broken streetlights, sanitation — where the friction isn't reporting itself, it's *trust and language*. Reports needed to work in **Urdu first**, and they needed to be verifiable before they hit a dashboard.",
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        blocks: [
          {
            type: "p",
            text: "Two hard parts. Verification: a photo of *something* isn't a photo of *the reported issue* — we needed a gate that rejected irrelevant images without a human in the loop. Language: forms, prompts and error states all had to feel native in Urdu, not translated-afterthought.",
          },
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
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
        label: "Outcome",
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
        label: "What I'd do differently",
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
    statusLabel: "Open source",
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
        label: "Context",
        blocks: [
          {
            type: "p",
            text: "Authorization is where most apps quietly rot: role checks smeared across components, routes and API handlers, each slightly different, none testable. I wanted to build the version I'd want to inherit — permission logic as an explicit, typed layer that reads like policy, not archaeology.",
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        blocks: [
          {
            type: "p",
            text: "The system had to answer three questions uniformly — *who* can do *what* to *which resource* — support role inheritance and resource-scoped rules, and stay framework-agnostic enough to drop into a Next.js app router project without contortions.",
          },
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
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
        label: "Outcome",
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
        label: "What I'd do differently",
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
    statusLabel: "In production",
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
        label: "Context",
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
        label: "Outcome",
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
