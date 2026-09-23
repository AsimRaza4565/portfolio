import type { Block } from "./projects";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  cover: string;
  coverAlt: string;
  blocks: Block[];
}

export const posts: Post[] = [
  {
    slug: "taming-inp",
    title: "Taming Interaction to Next Paint (INP): Profiling Real Pages, Not Lab Pages",
    description: "What moving from lab Lighthouse runs to field INP data taught me about interaction cost on content-heavy storefronts.",
    date: "2026-09-02",
    readTime: "6 min",
    cover: "/Blog_5.webp",
    coverAlt: "Profiling and optimizing Interaction to Next Paint performance metrics in React",
    blocks: [
      {
        type: "p",
        text: "Lab scores lie politely. A Lighthouse run against a dealer storefront with two inventory cards will hand you a green 98 and a pat on the head. Real users open the page with 40 vehicles, a map embed, a tag manager and a 4G connection — and their *click* is what pays for all of it. INP measures that payment: the latency from interaction to the next visual change. Working on production storefronts at Revnix taught me more about it than any sandbox ever did.",
      },
      { type: "h2", text: "Find the long handlers before users find them" },
      {
        type: "p",
        text: "The first honest step is field data. The `web-vitals` attribution build tells you *which* element and *which* phase (input delay, processing, presentation delay) is eating the budget:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { onINP } from "web-vitals/attribution";

onINP((metric) => {
  const { interactionTarget, inputDelay, processingDuration } = metric.attribution;
  reportToAnalytics({
    element: interactionTarget,
    inputDelay,        // main thread was busy *before* the click
    processingDuration // the handler itself
  });
});`,
      },
      {
        type: "p",
        text: "In our case the split was telling: input delay dominated on pages where hydration and third-party tags owned the main thread. The handler wasn't slow — the queue was.",
      },
      { type: "h2", text: "What actually moved the number" },
      {
        type: "list",
        items: [
          "**Breaking filters into steps.** One mega-handler recomputing a full inventory grid became: update state, yield, compute, paint. Same result, a fraction of the blocking window.",
          "**Optimistic UI for cheap wins.** Toggle states (favorites, compare) paint instantly from local state and reconcile with the server after — the user's click never waits on a request.",
          "**Scheduling the heavy stuff.** Non-critical work (map markers, analytics enrichment) moved behind `requestIdleCallback` and `startTransition` so interactivity keeps its slot.",
          "**Auditing third-parties like code.** Every tag-manager script got a budget conversation. Some lost.",
        ],
      },
      { type: "h2", text: "The uncomfortable lesson" },
      {
        type: "p",
        text: "Most INP problems I've shipped were not algorithmic — they were *architectural* laziness: doing too much in one handler because it was the convenient place to do it. Profiling field data monthly keeps that honest in a way no CI check quite manages. The budget that holds is the one you keep measuring.",
      },
    ],
  },
  {
    slug: "app-router-in-production",
    title: "Next.js App Router in Production: Server Components and Streaming Without the Ceremony",
    description: "Streaming isn't a demo trick — it's how we keep dealer pages feeling instant while CMS data resolves. Notes from real storefronts.",
    date: "2026-08-11",
    readTime: "6 min",
    cover: "/Blog_2.webp",
    coverAlt: "Next.js App Router and React Server Components data streaming architecture",
    blocks: [
      {
        type: "p",
        text: "The App Router pitches are always the same three-slide demo: a slow component wrapped in `<Suspense>`, a skeleton, fireworks. What the demo doesn't show is how streaming behaves when the page is assembled from CMS blocks, the marketing team reorders them weekly, and *somebody* put a map above the fold. Here's how it plays out on the dealer storefronts I work on at Revnix.",
      },
      { type: "h2", text: "Server components changed the data flow, not just the syntax" },
      {
        type: "p",
        text: "The real win of RSC isn't `async function Page()` — it's deleting the client-side data layer for content pages. Inventory listings, spec tables and CMS sections fetch where they render, and the client bundle only carries what genuinely needs JavaScript:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// A CMS-driven section — zero client JS
export default async function InventorySection() {
  const vehicles = await getInventory({ category: "compact-tractors" });
  return <InventoryGrid vehicles={vehicles} />;
}`,
      },
      { type: "h2", text: "Streaming with intent" },
      {
        type: "p",
        text: "We treat Suspense boundaries as an editorial decision, not a technical one. The hero, heading and navigation are static and ship instantly; below-the-fold sections — the heavy inventory grids, the dealer-location map — stream in behind skeleton shells that match final layout closely enough to avoid jank when they land. LCP comes from markup that was already on the server; the slow data never blocks the story.",
      },
      {
        type: "list",
        items: [
          "**Static shell, streamed body.** Every page paints its shell from cached CMS layout immediately.",
          "**Boundaries where content blocks break.** Editors reordering sections shouldn't break streaming — boundaries follow the block system, not the template.",
          "**Loading states that respect layout.** Skeletons sized to the real content avoid the CLS tax that erases your streaming win.",
        ],
      },
      { type: "h2", text: "What I'd tell past me" },
      {
        type: "p",
        text: "Stop reaching for client components the moment something feels dynamic. Nine times out of ten, the dynamic part is one small interactive island inside a large static section — ship the section as a server component and hydrate the island. Our bundles got dramatically smaller the day we started asking *which pixels* need JavaScript, instead of *which pages*.",
      },
    ],
  },
  {
    slug: "bridging-web-and-mobile",
    title: "Bridging Web and Mobile: Sharing Logic Between React and React Native",
    description: "Betterment needed a web dashboard and a React Native app to agree on everything. Here's the shared-logic structure that survived a hackathon.",
    date: "2026-06-20",
    readTime: "5 min",
    cover: "/Blog_3.webp",
    coverAlt: "Cross-platform logic sharing between React web and React Native mobile",
    blocks: [
      {
        type: "p",
        text: "At Build for Pakistan, our civic-reporting app Betterment had two faces: a **React Native** app for residents reporting issues, and a web surface for review and moderation. Two renderers, one truth — validation rules, the API client, and the report domain model had to be identical on both, or the weekend would dissolve into reconciliation bugs.",
      },
      { type: "h2", text: "The rule: share everything except pixels" },
      {
        type: "p",
        text: "We organized the repo as three layers: a platform-agnostic `core` package, and two thin `app` and `web` shells. Core holds the API client, validation, i18n dictionaries (Urdu first) and the domain types. The shells hold navigation and UI. The discipline that made it work: *core never imports from React or React Native.*",
      },
      {
        type: "code",
        lang: "ts",
        code: `// core/report.ts — runs identically on web and native
export function validateReport(r: ReportDraft) {
  const errors: FieldError[] = [];
  if (!r.title.trim()) errors.push(field("title", "required"));
  if (r.category === "sanitation" && !r.photoUri)
    errors.push(field("photo", "required_for_category"));
  return { ok: errors.length === 0, errors };
}`,
      },
      { type: "h2", text: "The seams that earned their keep" },
      {
        type: "list",
          items: [
          "**One validation, zero drift.** The web form and the native form rendered different UIs but failed identically — a rule changed once, in core.",
          "**An isomorphic API client.** `fetch` works in both worlds; only the auth token storage needed a two-line platform adapter each.",
          "**Urdu strings as data.** i18n dictionaries lived in core; web picked RTL-aware layouts, native picked RTL-aware navigation — same words, same tone.",
          "**Offline tolerance in core.** The queue-and-retry logic for flaky mobile networks was written once and reused by the web shell's optimistic submissions.",
        ],
      },
      { type: "h2", text: "Where it got hard" },
      {
        type: "p",
        text: "Dates, links and images each wanted platform treatment — the moment logic touched a *rendered* artifact, it left core. The boundary is learnable: if it produces pixels or interacts with native modules, it lives in the shell. Everything else — the rules, the truth, the boring correctness — ships once and runs everywhere.",
      },
    ],
  },
  {
    slug: "pragmatic-state-management",
    title: "Pragmatic State Management: Moving Beyond Monolithic Global Stores",
    description: "Job Radar's dashboard taught me to stop asking 'which store?' and start asking 'who owns this state, and where does it live?'",
    date: "2026-05-04",
    readTime: "5 min",
    cover: "/Blog_4.webp",
    coverAlt: "Architectural separation of server caching and client UI state in React",
    blocks: [
      {
        type: "p",
        text: "Every React project reaches the ceremony where someone proposes The Store. Job Radar — my automated job-hunting dashboard — has every ingredient for store sprawl: server data (jobs, search logs), session data (keywords, filters), UI state (panels, selections), and a form or two. Here's the structure that kept it boring, in the best sense.",
      },
      { type: "h2", text: "Question one: is it server state or client state?" },
      {
        type: "p",
        text: "Most 'global state' in a dashboard is actually **server cache** — data the client mirrors but doesn't own. Jobs, logs, keyword lists: those live on the server, belong to RSC data fetching (or TanStack Query where client-side mutation matters), and enter components as props. The remaining client state is usually tiny — which panel is open, which job is selected, a draft filter:",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Server state: fetched, cached, owned by the server
const jobs = await getJobs({ status: "new" });

// UI state: one tiny store, colocated with its feature
const useFilterPanel = create<FilterState>((set) => ({
  open: false,
  draft: null,
  toggle: () => set((s) => ({ open: !s.open })),
}));`,
      },
      { type: "h2", text: "Rules that survived contact with the app" },
      {
        type: "list",
          items: [
          "**Server state gets cache semantics.** Stale-while-revalidate, invalidation after mutations — not `useState` mirrors of the database.",
          "**Client state gets scoped stores.** Zustand slices colocated with features; nothing global unless three features genuinely read it.",
          "**URL is state.** Filters and selected-job live in search params — deep-linkable, back-button-friendly, free persistence.",
          "**Forms own themselves.** Local component state until submit; lifting form drafts into global scope is how stores metastasize.",
        ],
      },
      { type: "h2", text: "The result" },
      {
        type: "p",
        text: "Job Radar's 'store' is three feature slices totaling maybe sixty lines, a query layer that already existed, and a URL that remembers what you were looking at. The monolithic global store isn't wrong — it's just answering the wrong question. Ask *who owns this state* first, and most of the store disappears.",
      },
    ],
  },
  {
    slug: "scalable-design-systems",
    title: "Architecting Scalable Design Systems: From Tokens to Production-Ready Components",
    description: "A design system that survives editors, deadlines and brand changes — notes from building component systems for dealer storefronts.",
    date: "2026-03-17",
    readTime: "6 min",
    cover: "/Blog_1.webp",
    coverAlt: "Scalable React component architecture and design system workflow",
    blocks: [
      {
        type: "p",
        text: "The dealer storefronts I work on share a skeleton but not a face: three brands, one component system, editorial teams publishing daily. A design system in this world isn't a Figma library — it's the mechanism that lets a brand refresh not become a rewrite. Here's the layering that's held up.",
      },
      { type: "h2", text: "Tokens are the contract; components are the implementation" },
      {
        type: "p",
        text: "Everything a brand might want to change — color, radius, type scale, spacing rhythm — lives in tokens. Components consume *only* tokens, never raw values. Tailwind's CSS-first theming makes the contract explicit:",
      },
      {
        type: "code",
        lang: "css",
        code: `@theme {
  --color-background: var(--brand-background);
  --color-accent: var(--brand-accent);
  --radius-card: var(--brand-radius);
}`,
      },
      {
        type: "p",
        text: "A brand swap is a token layer change. When The Backyard needed its warmer outdoor tone, no component file opened.",
      },
      { type: "h2", text: "Composition beats configuration" },
      {
        type: "p",
        text: "Early on I made the classic mistake: a `Card` with twelve variants covering every marketing whim. The system got cheaper the day it got *smaller* — primitives (`Surface`, `Stack`, `Media`, `Meta`) that compose into the few real patterns (vehicle card, location card, promo band). Fewer props, more predictable output, and editors still can't build something broken because the composable units each carry their own constraints.",
      },
      {
        type: "list",
        items: [
          "**Variants for meaning, not pixels** — `intent` and `tone`, not `bigBlueButton`.",
          "**CMS blocks as compositions** — the editorial block library maps to component compositions, so design and content vocabularies stay in sync.",
          "**Accessibility as a primitive concern** — focus, contrast and reduced-motion live in the base layer; feature teams can't opt out.",
        ],
      },
      { type: "h2", text: "The metric that matters" },
      {
        type: "p",
        text: "Not component count — **time-to-new-page**. When marketing asks for a seasonal landing page and it's assembled from existing blocks in an afternoon, with performance budgets intact, the system is working. Everything else is documentation theater.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
