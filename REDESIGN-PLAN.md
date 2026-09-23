# Portfolio Redesign — Implementation Plan

**Scope:** Full UI/UX revamp of asimraza.me (Next.js 15 static export on GitHub Pages)
**Prepared:** 2026-09-23 · Based on a code audit of the current site plus in-browser review of all seven reference portfolios.

---

## Part 0 — What the reviews found

### 0.1 Current portfolio: honest assessment

**What works and should survive the redesign**

- Right tech stack: Next.js 15 + Tailwind 4 + Radix + Framer Motion is exactly right for a frontend developer's portfolio — the site itself is a work sample.
- Content substance is real: Revnix production work (CMS architecture, RBAC, Stripe, Core Web Vitals), a hackathon placement (Build for Pakistan / Betterment), a systems project (Scalable Authz), real education and certifications.
- SEO metadata is mostly present (titles, OG/Twitter tags, sitemap, robots).
- Small assets, static export, fast hosting.

**What holds it back (in priority order)**

1. **It reads as a template, not a designed product.** Hardcoded `bg-gray-800` + `text-yellow-500`, pill-badge section headings, uniform `hover:scale` cards — the default "dark portfolio starter" look. Nothing on the page says *Asim designed this*.
2. **The design system is dead weight.** A full shadcn/OKLCH token set exists in `globals.css` and is bypassed everywhere; Geist + Geist Mono are loaded via `next/font` but the CSS variables are never wired to `font-sans`/`font-mono`, so text renders in the default system stack; a `.dark` theme variant is defined but never applied.
3. **Content that damages credibility:**
   - **Blogs**: five strong article topics with custom cover images — but the cards link to nothing, and the body text is typed out character-by-character (`Typewriter` at `delay: 0`). To any reviewer this reads as decoration pretending to be writing. **The fix is not removal** (the content investment is real and recent) — it's giving each post a real page and killing the typewriter. See §2.9.
   - **Services**: three vague offerings ("Bug Fixes & Feature Enhancements") that undersell a production frontend developer and read as filler from a portfolio course.
   - **Projects have no live links or case studies** — the single biggest conversion gap.
   - Experience dates overlap confusingly (Rhombix "Oct 2025 – Jan 2026" vs Revnix "Oct 2025 – Present").
4. **Animations are repetitive and inconsistent:** same fade-up on everything; `viewport.once` mixed true/false (sections re-animate on scroll-back); the hero typewriter re-types the *single* string "Frontend Developer" in an infinite loop; no `prefers-reduced-motion` anywhere.
5. **Accessibility gaps:** no skip link, no `scroll-margin-top` (anchor jumps land under the fixed navbar), heading levels compete (job titles are `h2`s fighting section `h2`s), typewriter text isn't reliably in the accessibility tree, mobile menu button has no `aria-label`.
6. **Real bugs:** `target="blank"` (missing underscore) in projects and footer; `lg: w-2/3` broken variant and a stray `}` in blogs classes; non-existent utilities (`text-md`, `md:text-1xl`, `text-black-500`); unitless arbitrary values (`w-[150]`, `top-[-24]`).
7. **Everything is a client component** — all nine sections ship as client JS for no reason; two overlapping scroll-observe systems (framer `whileInView` + `react-intersection-observer`).
8. **No JSON-LD**, OG image is a small portrait instead of a designed 1200×630 card, no 404 page, content scattered across seven files with no data layer.

### 0.2 Reference analysis — what each site is actually doing well

| Reference | Core strengths | What you flagged | Verdict for us |
|---|---|---|---|
| **faisalmehmood.tech** | Best *structure* of the set: eyebrow label → big heading rhythm; experience entries with achievement bullets + tech chips; project articles with feature lists, links, and a quieter "More work" tier; 6 skills categories with pills; single clear accent (electric blue on near-black) | — (structural benchmark, and a Revnix colleague — our content model can rhyme, the visual identity must not) | Adopt the information hierarchy, not the look |
| **mobeenabdullah.com** | Editorial serif warmth on dark; **"Worked with teams at" logo strip** (instant social proof); product cards with status badges (Open Source / AI / Coming Soon); testimonials with real names/titles; newsletter footer; light/system/dark switcher; skip link; "built on Nextly" credit | — | Adopt: proof strip, status badges, availability line, conversational hero hook, skip link. Skip: newsletter (no audience yet), multi-page split (our content volume fits one page + case studies) |
| **devonstank.com** | Huge display headline with **italic-serif accent phrase** inside a grotesque headline ("…& *Coffee Enthusiast*"); video-loop hero; personality-drenched copy; 6-cell services grid; personality sections between work | — | Adopt: the display-type + italic-serif-accent pattern (also present on codewonders/lissan — it's the strongest cross-reference typography signal), confident first-person copy. Skip: video background, e-commerce |
| **codewonders.dev** | Playful minimal single-screen hero; **layered title** (text + `<mark>` + text stacked — a fill/sweep reveal tied to load/hover); giant watermark "CW."; bio paragraph with inline links woven into prose; light/dark toggle | **mouse + title animations** | Adopt: layered/masked title reveal as our signature hero moment (adapted, not copied); custom cursor dot+ring (desktop-only); prose-with-inline-links writing style |
| **kenjimmy.xyz** | **Skills section UX** you love: lowercase monospace labels ("backend", "frontend"), 1px-bordered sharp-corner editorial blocks, one crisp sentence per discipline, then a row of illustrated skill icons — skills as *narrative* instead of a tag cloud; spaced-letter name; README-style about; "now" facts | **Skills section's UX** | Adopt: this skills pattern almost wholesale (retuned to our radius/border system), the "now" block, lowercase mono micro-labels as a recurring texture |
| **tamalsen.dev** | **"As featured in" infinite logo carousel** (press social proof); code-comment nav links (`// home`); stats (140+ projects, 50+ clients); featured project cards opening into real case-study pages; experience rows with tech chips | — | Adopt: proof carousel concept (Build for Pakistan, Revnix clients), case-study pages, the `//` code-comment motif (fits a developer identity, cheap to do well) |
| **designbylissan** (live: designbylissan.webflow.io) | Motion language: massive 5–9vw display type with italic accents; oversized full-bleed imagery; **staggered/offset project grid**; uppercase micro-labels with tracking; sticky side label; marquee bands; smooth scroll-linked reveals | **loves its animations** | Adopt: the *choreography* — line-mask heading reveals, staggered offsets, one purposeful marquee, oversized imagery in project cards. Skip: Webflow-style smooth-scroll hijacking (Lenis etc.) — native scrolling + tuned reveals gives 90% of the feel at 10% of the cost and keeps accessibility |

### 0.3 The five patterns actually worth adopting (2026 portfolio standards, filtered)

1. **Editorial typography as the interface** — the references you love (devonstank, lissan, codewonders, mobeen) all lean on *type*, not on chrome. Big display headings, serif-italic accent words, uppercase tracked micro-labels, monospace accents.
2. **Case-study storytelling for projects** — every strong reference (faisal, tamalsen, devon, mobeen) routes project cards into real detail pages. This is the single highest-ROI upgrade for you.
3. **Social proof early** — logo strips (mobeen, tamalsen) placed immediately after the hero do more for credibility than any paragraph.
4. **Skills as narrative, not tag cloud** — kenjimmy's discipline blocks + your "beyond the stack" strengths (perf/a11y/SEO) communicate *judgment*, which is what senior reviewers screen for.
5. **Purposeful motion with a system** — one signature hero effect, line-mask heading reveals, staggered card entrances, micro-interactions on everything interactive, all gated behind `prefers-reduced-motion`. Not more than that.

Explicitly **not** adopting: video-loop backgrounds, WebGL/canvas particle fields, scroll-hijacking, heavy 3D, emoji-heavy copy, bento-everything, multi-page split of the main story, newsletter.

---

## Part 1 — Design direction

**Concept: "Quietly loud."** A dark editorial page where typography does the talking, one amber accent does the pointing, and precise motion does the proving. The site is the argument for hiring Asim — every interaction should feel like frontend craft, and nothing should feel like a template.

### Visual personality
Confident, calm, technical-with-warmth. Closer to a design studio's one-pager than a developer dashboard. Developer-coded details (`//` comment motifs, mono micro-labels, status badges) give it an authentic engineering accent without costume.

### Color strategy
Dark-first, token-driven, **one accent**:

| Token | Value (approx) | Use |
|---|---|---|
| `--background` | `oklch(0.13 0.005 285)` ≈ #0d0d11 warm near-black | Page base |
| `--surface` | white @ 3–4% over base | Cards |
| `--border` (subtle) | white @ 8–10% | Card/frame borders |
| `--foreground` | `oklch(0.96 0.002 285)` ≈ #f2f2f0 | Primary text |
| `--muted-foreground` | 60–65% lightness | Secondary text |
| `--accent` | amber 400 family (`oklch(0.83 0.16 80)` ≈ #fbbf24) | Links, highlights, status dot, focus ring, italic serif accents |
| `--accent-foreground` | near-black | Text on accent buttons |

Why amber: your current site already claims yellow — keeping a refined version preserves identity continuity while every peer reference uses blue/orange/violet/green. Amber on warm charcoal is the differentiator. **Discipline rule: accent appears as text/link/border accents and one filled button — never large background fills or gradients.** No second hue anywhere. Keep the existing OKLCH token file; retune values, then *actually consume the tokens* (the current site defines them and bypasses them — that gets fixed structurally).

Light theme: ship dark-first; because everything consumes tokens, a light variant + toggle is a cheap Phase 8 addition (three-slot toggle like mobeen/codewonders if desired — recommended, it's also a nice micro-interaction showcase).

### Typography direction
Two families, four roles:

1. **Display/sans — Geist** (already installed, finally wired): tight tracking (`-0.03em`), weights 500–700, `clamp(2.5rem, 6vw, 4.5rem)` hero, `clamp(2rem, 4vw, 3rem)` section headings.
2. **Accent — Instrument Serif italic** (or similar single-weight display serif via `next/font`): used *only* for italic accent words inside display headings — "Asim *Raza*", "Selected *work*", devonstank/lissan-style. Max 1–2 words per heading. This single detail does more for the "designed, not templated" feel than anything else in the system.
3. **Mono — Geist Mono** (already installed): micro-labels, `//` motifs, tech chips, dates, availability line. Lowercase for section eyebrows (`// selected work`) — adapted from kenjimmy + tamalsen.
4. **Body — Geist 400**, 16–17px, `max-w-[65ch]`, 1.7 line-height, muted-foreground for paragraphs after the first.

### Spacing system
4px base grid. Section rhythm `py-24 md:py-32` (more air than current site — whitespace is the cheapest luxury signal). Container `max-w-6xl mx-auto px-6`. Vertical gap scale: 4/8/12/16/24/32/48. Cards `p-6 md:p-8`. Grid gaps `gap-6 md:gap-8`.

### Border / radius / surfaces
- Radius: `--radius: 0.75rem` for cards (12px), `rounded-full` only for chips/badges/avatars. No mixed radii.
- Surfaces: flat elevation model — `bg-surface` (white 3%) + `border-border` (white 8%). **No drop shadows at rest.** Hover = border brightens toward accent + `translate-y-[-2px]` + background lifts to white 5%. One elevation level, consistently applied.
- Optional texture: a fixed, ultra-subtle noise or grid overlay on the background (2–3% opacity) to kill the "flat gray void" — cheap, common to lissan/mobeen treatments.

### Iconography & imagery
- Lucide (already), 1.5px stroke, 16–20px, sparingly — arrows on links, social glyphs, chip icons. Never decorative icon soup.
- Project images: consistent 16:10, 2px border `border-border`, slight inner padding like a framed screenshot, hover: image scales 1.03 inside `overflow-hidden` frame + border → accent. Replace the current rotated-badge-overlaid cards entirely.
- Portrait: one intentional treatment — small (280–320px), rounded-xl, 1px border, corner-accent detail, grayscale-by-default → color on hover. Not the current giant bordered circle.

### Motion & interaction philosophy
**"Motion communicates structure and state — it is never the content."** Rules:

1. **Enter once:** every reveal fires once (`viewport={{ once: true, amount: 0.3 }}`), 12–16px rise + fade, 0.4–0.5s, `easeOut`. Stagger children 60–80ms. No section ever re-animates on scroll-back.
2. **Headings reveal as lines** — line-mask (clip-path/overflow) reveals on section headings, lissan-style. Implemented once as a shared `<Reveal>`/`<AnimatedHeading>` primitive so it's consistent everywhere.
3. **One signature moment:** the hero title (Part 2). 
4. **Everything interactive responds:** buttons/links/cards/chips all have visible hover + focus states. Micro-interactions: arrow nudges on link hover, chip border+text brighten, card image scale, email copy-to-clipboard with inline "Copied ✓" swap.
5. **Scroll feedback:** thin 2px amber scroll-progress bar under the nav + active-section link highlighting.
6. **Custom cursor** (the codewonders takeaway): dot + trailing ring, desktop-only (`matchMedia('(pointer: fine)')`), ring expands over interactive elements, hidden for touch/reduced-motion, native cursor never fully hidden for inputs. Implemented with rAF + transform (no re-render per frame).
7. **`prefers-reduced-motion: reduce`** → all entrances render final state instantly, typewriter/marquee/cursor/parallax disabled, `scroll-behavior: auto`. One `usePrefersReducedMotion` hook gates every animated component.
8. No scroll hijacking, no parallax on text, no autoplaying video, no animation longer than 0.6s.

### Overall hierarchy
Eyebrow (mono, lowercase, accent `//` prefix) → display heading (grotesque + serif-italic accent word) → lede paragraph (muted, 65ch) → content → section footer link ("View all →", mono). Every section is scannable in 3 seconds by heading + first row.

---

## Part 2 — Section-by-section plan

Page order (single page + two route types):

```
/                    → Nav · Hero · Proof strip · Selected Work · Skills ·
                       Experience · About/Now · Writing · Contact · Footer
/projects/[slug]     → Case study pages (4 at launch)
/writing/[slug]      → Blog post pages (5 at launch, MDX)
/not-found           → Designed 404
```

### 2.1 Header / Navigation

**Current problems:** Radix NavigationMenu with three dropdown groups is heavy for seven anchors (dropdowns hide destinations behind extra clicks); dropdown items colored `text-yellow-500` inconsistent with the rest; logo image box `w-[150] h-[84]` is oversized/broken; no active state, no scroll behavior; mobile drawer uses nested collapsibles — three taps to reach "Skills".

**New design:**
- **Structure:** fixed top, `h-16`, container-aligned. Left: wordmark **"asim.dev"** or "Asim Raza" in mono (`text-sm font-medium`) with a `.` accent — replaces the image logo (typography-led, scales, no asset). Right: flat links `work · skills · experience · writing` + **"Résumé"** button (outline pill, download icon) — contact lives as the final CTA at page end and in the nav on mobile.
- **Behavior:** transparent at top → on first scroll, `backdrop-blur` + `bg-background/80` + bottom border fades in, height shrinks 64→56px. 2px amber **scroll-progress bar** along the bottom edge. Active section link gets accent color + `aria-current="true"` (IntersectionObserver).
- **Mobile:** hamburger → **full-screen overlay menu**: page-dim, links stagger in (40ms apart) as oversized display text (32–40px) with mono index numbers (`01 work`), socials + email pinned at the bottom, close on link/Escape. Body scroll-locked. One tap to anything — replaces the accordion drawer.
- **Accessibility:** `<nav aria-label="Primary">`, skip-to-content link (first focusable, adapted from mobeen), focus-visible rings, Escape closes overlay, focus trap while open.
- **From references:** flat-anchor simplicity (faisal), mono/`//` motif (tamalsen, kenjimmy), overlay menu staggering (lissan choreography).

### 2.2 Hero

**Current problems:** "Hello! I am" + yellow highlight box + infinite typewriter retyping one string (a gimmick with no information density); generic two-column with big circle photo; description is unfocused; CTA row includes "Download Resume" with query-string hack.

**New design (the signature moment):**
- **Layout:** left-weighted, ~90vh on desktop. Top: availability badge — pill with pulsing amber dot, mono: `● open to work — remote` (adapted from codewonders/mobeen). 
- **Title:** display scale `clamp(2.75rem, 7vw, 5rem)`, two lines:
  - Line 1: "Frontend developer" (grotesque)
  - Line 2: "*building things* that ship." — serif-italic on "building things" (devonstank/lissan pattern)
  
  Name moves to the eyebrow: `// asim raza — haripur, pakistan ⇄ remote` (mono, muted, with live local time optional). Rationale: role-first heroes convert better than name-first for junior/mid portfolios; the name is in the URL, title tag, and eyebrow already.
- **Entrance animation (the codewonders-inspired title moment):** words reveal via clip-path line masks, staggered 70ms, then the italic accent phrase fills with a subtle amber tint sweep (a CSS mask/gradient animation layered under the text — the "layered title" idea adapted from codewonders' text+mark+text stack). On hover, the accent phrase's underline draws in. Whole sequence ≤ 1.2s, once, reduced-motion-safe.
- **Sub-copy (2 lines max, prose-with-inline-links à la codewonders):** "I build React and Next.js interfaces at **Revnix** — auth flows, CMS-driven storefronts, and design systems that stay fast. Off hours, I ship products like **Job Radar** — an engine that finds, filters, and emails me the jobs worth applying to."
- **CTAs:** primary filled-accent "View selected work ↓" (arrow animates down on hover) + secondary outline "Download résumé" (icon). Exactly two.
- **Right/edge treatment:** portrait card, smaller and framed (per imagery rules), offset with a mono caption `fig. 1 — the developer` (playful editorial touch), subtle mouse-parallax (±6px, desktop only). Decorative: faint oversized "AR" or "</>" watermark behind content at 3% opacity (codewonders' "CW." idea), plus the site-wide noise/grid.
- **Below fold link:** mono "scroll ↓" bottom-left.
- **Mobile:** stacked, title `clamp` holds, portrait after CTAs at reduced size, badge above title, parallax/watermark off.

### 2.3 Proof strip (new section — adapted from mobeen & tamalsen)

- Immediately under hero, minimal band: mono label `// shipped with` / "worked with" + **logo/wordmark row**: Revnix (production client work), Build for Pakistan (hackathon placement), 21st Century / 4RE or PCI if permissible (Revnix client logos — confirm with employer what's allowanced), university. 4–5 marks max, grayscale at 60% opacity, color on hover.
- Desktop: static centered row. Mobile: infinite marquee (paused on hover, `aria-hidden` for duplicates, reduced-motion → static wrap).
- **UX purpose:** instant credibility before the reader commits to scrolling — the single most persuasive 80px on the page.

### 2.4 Selected Work (Projects)

**Current problems:** three image cards with rotated tech badges overflowing the card tops; no live links, no case studies, no metrics; "Explore My Work" button → GitHub profile with `target="blank"` bug; "Figma to Web" is a weak third item next to two strong ones.

**New design:**
- **Section header:** `// selected work` eyebrow + heading "Work that *went live*." + one-line lede ("Production systems, hackathon wins, and open-source — chosen for what they demonstrate, not filler.") + right-aligned mono link "all projects → GitHub".
- **Featured layout — editorial staggered rows (lissan-inspired, not copied):** 3 featured projects as **alternating full-width rows** (image 55% / content 45%, alternating sides; 12-col grid, image spans 7 with 1-col offset creating the stagger). Each row:
  - Framed 16:10 screenshot, hover: internal scale + accent border; 
  - Status badge (mobeen pattern): `● live`, `● open source`, `● hackathon — 2nd place`, mono pills;
  - Title (h3, display scale), role line ("Lead frontend · 2025"), 
  - **One outcome sentence with a metric** ("Urdu-first civic reporting app that placed top-3 at Build for Pakistan 2025"), not feature lists on the card;
  - 4–6 tech chips (mono);
  - Links: "Read case study →" (primary), live/GitHub icons.
  - Mobile: stacks image-over-content, stagger collapses to uniform.
- **Featured four → three rows + one:** the featured lineup is now the projects Asim can fully own, demo, and defend:
  1. **Job Radar** *(newest, lead story)* — a self-running job-hunting product: GitHub Actions triggers a serverless search every few hours across JSearch/RemoteOK, results are skill-match filtered, deduplicated into SQLite (Drizzle/Turso), emailed as a digest, and tracked in a Next.js dashboard with keyword management, activity logs, and resume tailoring with DOCX export. Why it leads: it's a *system*, not a page — API orchestration, data modeling, automation, and product judgment in one repo. A frontend dev who builds his own backend pipeline is the exact story this portfolio needs.
  2. **Betterment** — strongest narrative win: hackathon placement at Build for Pakistan, Gemini AI verification, Urdu/i18n, React Native + Node/Postgres.
  3. **Scalable Authz System** — systems depth: RBAC engine design, Next.js App Router + MongoDB, clean domain separation.
  Each gets a status badge (`● live` / `● open source` / `● hackathon — placed`) and a case-study page.
- **"In production" tier (Revnix client storefronts — worked on extensively):** a distinct sub-block inside Selected Work: "Shipped & maintained in production" — three framed site cards linking to **21stcenturyequipment.com**, **4riversequipment.com**, and **thebackyard.com**, each with a live screenshot, one line on his contribution (CMS-driven storefronts, auth/RBAC, Stripe, Core Web Vitals), and a `● live` badge. These are employment work, so they get real presence without pretending to be personal projects — and they double as the strongest possible proof of production experience. The same three names appear as achievement bullets in the Revnix Experience entry and as marks in the proof strip.
- **"More work" tier (faisal pattern):** compact list of one-liners — internal admin tooling, Figma-to-Web conversions, open-source contributions. Honest framing: quick links, not inflated cards.
- **Case study pages `/projects/[slug]`:** four pages — Job Radar, Betterment, Scalable Authz, and a combined **Production storefronts** page covering the three Revnix client sites. Template with hero (title, role, timeline, stack, links), then editorial sections: **Context → Problem → Decisions (2–3 with code snippets or UI details) → Outcome** (metrics/screens) → "What I'd do differently" (a credibility flex very few juniors include) → prev/next project nav. `generateStaticParams` → works with static export. These pages are where technical depth gets proven; the homepage only has to earn the click.

### 2.5 Skills

**Current problems:** four uniform dark cards of pill chips — a tag cloud in boxes; "CMS & Integrations" and "AI-Assisted Development" categories dilute the story; the "beyond the stack" trio is the most valuable content but visually identical to everything else.

**New design (kenjimmy's UX, retuned):**
- **Header:** `// capabilities` + "The stack, *and the judgment* to use it."
- **Primary tier — three discipline blocks** (not four): `frontend`, `backend & data`, `workflow & delivery`. Each block: bordered editorial card (`border-border`, sharp-ish radius, `p-8`), lowercase mono label + one crisp sentence in the kenjimmy voice:
  - `frontend` — "Interfaces in React and Next.js that stay fast under real content: server components, streaming, design systems, React Native when the product needs a phone."
  - `backend & data` — "The parts behind the UI: Node APIs, auth/RBAC, Postgres with Prisma or Drizzle, Stripe, CMS schema design — I build my own pipelines when the product needs them (Job Radar runs on exactly this)."
  - `workflow & delivery` — "Shipping discipline: Git/GitHub Actions (Job Radar's cron runs itself), Docker, Vercel/Coolify, testing, accessibility and performance budgets."
  - Then the chips for that discipline (mono, interactive: hover = accent border; no icons per chip — the row reads cleaner).
  - Layout: desktop 3-col grid; mobile stacked. Cards have a subtle hover spotlight (radial highlight following cursor — the "mouse animation" language applied purposefully).
- **Secondary tier — "beyond the stack"**: three compact items (Performance · Accessibility · SEO) as a horizontal strip with icon + title + one line, styled differently (borderless, left-rule accent) so it reads as a *coda* to the section — this is your differentiator content, give it its own visual register. Each links to the relevant case-study section or writing post when those exist.
- **Tertiary texture — one marquee band** (lissan device, used once on the whole site): core stack names in mono scrolling slowly at the section's foot (React · Next.js · TypeScript · …), `aria-hidden`, paused on hover, static list on reduced motion. Pure texture, no information carried.
- **Cut:** the standalone "AI-Assisted Development" and "Industry & Domain" categories (from the peer site) — fold two AI tools into `workflow & delivery` if desired. Skill lists trimmed to what he'd defend in an interview.

### 2.6 Experience

**Current problems:** h2 job titles compete with section headings; long un-scannable paragraphs; logo images (180×180) take a third of the width for little value; dates overlap confusingly; no achievements-with-metrics formatting.

**New design:**
- **Header:** `// experience` + "Where I've *shipped*."
- **Format (faisal's rigor, lighter weight):** vertical list with a subtle left timeline rail (2px `border-border`, amber node on the current role). Each entry:
  - Row 1: role (h3) + company link + status pill (`current` / dates);
  - Row 2 (mono, muted): `oct 2025 — present · haripur, pk (remote-friendly)`;
  - Body: **3 achievement bullets max**, metric-first ("Cut LCP 40% on CMS-driven storefronts…", "Hardened CSP + cookie consent for US-facing client sites"), tight two-line bullets, not paragraphs;
  - Tech chips row (5 max);
  - No logo images — the company link + rail carry structure (removing three 180px images also declutters and de-animates the section).
- **Content fixes required:** resolve the Rhombix/Revnix date overlap (present Rhombix as a concurrent remote internship explicitly, or adjust dates); merge "Previously: Frontend Intern" into the Revnix entry's own timeline (intern → dev promotion reads *better* as one growth story — "promoted after 6 months" is a strong signal).
- **Mobile:** rail collapses to a simple top-border separator per entry.

### 2.7 About / Background + Now

**Current problems:** two large cards for two lines of education/cert info; no actual story; no "now" context; certifications card missing the Docker cert (existing TODO in tasks.md).

**New design — merge into one compact, warmer section:**
- **Header:** `// about` + "The person behind *the commits*."
- **Left column — story (the devonstank/mobeen voice):** 2 short paragraphs. Honest junior-to-mid narrative: software engineering degree (Haripur, 2025), internship → production frontend developer at Revnix, what he obsesses over (performance, accessibility, the details nobody notices until they're wrong). First-person, specific, zero clichés ("passionate about technology" is banned).
- **Right column — facts card** (bordered, mono labels): `education` — BS Software Engineering, Univ. of Haripur `2021–2025`; `certifications` — Google Cybersecurity `2024`, Docker (add when earned); `now` — adapted from kenjimmy's README/now pattern: "Building client storefronts at Revnix · exploring React Native + local-first tooling · open to remote roles & freelance"; `beyond code` — 1–2 human details (his choice — chess, cricket, whatever's true; human details are what make the references feel owned).
- **Mobile:** single column, facts card after story.

### 2.8 Services — **REMOVED**

**Recommendation: delete the section entirely.** Rationale: (1) The offerings ("Responsive Web Development", "Bug Fixes & Feature Enhancements") are the weakest copy on the site and position him as a task-taker, not a product engineer; (2) he's employed and seeking roles/collaborations — "Services" pages are for agencies/freelancers with a sales funnel (devonstank sells plugins/consulting — that's why it works *there*); (3) the SEO/perf/a11y value already lives in Skills' "beyond the stack" where it's credible. If freelance acquisition ever becomes a goal, a dedicated `/services` page with packages and a contact form is the right shape — not a homepage section. The nav slot it frees goes to "Résumé".

### 2.9 Blog / Writing — **KEPT AT LAUNCH, MADE REAL**

**Current state:** five strong, current topics with custom cover images (`Blog_1–5.webp`) and real descriptions — recently updated. The weaknesses are structural, not editorial: cards link nowhere, bodies are typewriter-gimmicked, and the alternating light-gray cards clash with the rest of the page.

**Revised plan (writing ships in Phase 1 scope, not Phase 2):**
- **Post pages:** `/writing/[slug]` as MDX under `app/writing/[slug]` (static-export compatible). The five existing topics are exactly the right topics — they map to work Asim actually does, which is what makes them credible:
  1. *Architecting Scalable Design Systems* (token → component workflow)
  2. *Next.js App Router in Production* (server components + streaming)
  3. *Bridging Web and Mobile* (shared logic React ↔ React Native — Betterment is the case)
  4. *Pragmatic State Management* (server cache vs. client UI state)
  5. *Taming INP* (performance profiling)
  Each post: 800–1,200 words grounded in his real projects (Betterment, Job Radar, Revnix work) — concrete war stories, code snippets, and honest caveats. Drafting support can come from the assistant; the engineering details must stay true to the work.
- **Homepage section:** compact editorial list — cover image thumb (reusing the existing five images, restyled to the 16:10 framed treatment), title, one-line excerpt (the current descriptions are already excerpt-quality), mono date + read time. No typewriter anywhere; full text is selectable and screen-reader-safe. Alternating full-width cards are dropped for a tighter list that doesn't compete with Selected Work's imagery.
- **Section header:** `// writing` + "Notes from *shipping*." + right-aligned "all posts →" link. Placed after About/Now, before Contact.
- **Post template:** editorial single column, `max-w-[2/3]`, prose styles tuned to the design system (Geist body, mono code blocks with copy button, serif-italic pull quotes), TOC on wide screens, prev/next post nav, JSON-LD `BlogPosting`.
- **Mobile:** single-column list, thumbs hidden below `sm` (titles carry the section), post pages unchanged.

### 2.10 Testimonials — conditional (recommended, small)

If he can obtain 2–3 real quotes (Revnix lead/CEO, hackathon teammate or judge, a client contact), add a compact "Kind words" band after Experience (mobeen's pattern: quote + avatar + name + title, simple 2–3 column grid, no carousel). **If real quotes aren't obtainable, ship without** — fabricated testimonials are worse than none. Decision checkpoint in Phase 4.

### 2.11 Contact

**Current problems:** contact is semantically the footer (`<section id="contact">` wrapping `<footer>`); mailto-only; "Let's Work Together" + repeated identity info; no copy affordance, no availability clarity.

**New design — a real conversion section above the footer:**
- Generous spacing, centered, `py-32`.
- Eyebrow `// contact`; display heading: "Let's build something *worth shipping*."
- One line: availability + timezone ("Open to remote frontend roles and freelance projects — replying within 24h, PKT ⇄ your timezone").
- **Primary action: big email button** — `hello@asimraza.me`-style address in display type; click = copy-to-clipboard with inline morph to "Copied ✓" (micro-interaction showcase), secondary icon opens mailto. 
- Secondary row: LinkedIn · GitHub · CV (icon links, consistent hover treatment).
- **No contact form** (static export; a form would need a third-party service — Formspree can be a Phase 9 enhancement if inbound volume justifies it).
- Mobile: everything stacks; the email button becomes full-width.

### 2.12 Footer

**Current problems:** full white band jarring against the dark site; quick-links list missing half the sections; social icons with `target="blank"` bug; identity info repeated from hero.

**New design:** compact dark footer, `border-t border-border`, three zones:
- Left: mono wordmark + one-liner "Designed & built by Asim Raza — Next.js, Tailwind, and too much attention to detail." (the mobeen "built on" credit pattern — it's a flex and it's true);
- Center/right: anchor links (all sections incl. skills/experience now) + socials;
- Bottom row: `© 2026` + local time (mono, live clock — tiny delight) + "Back to top ↑" (smooth scroll).
- Mobile: stacked, links wrap.

### 2.13 Not-found page (new)
Dark, display-type "404", mono `// this route never shipped`, link home. Five lines of code, completes the product feel.

---

## Part 3 — Technical architecture changes

1. **Content layer:** create `lib/data/` — `site.ts` (identity, socials, availability), `projects.ts` (+case-study content), `experience.ts`, `skills.ts`, `proof.ts`. Components consume data; no content in JSX. Kills the current scattered-constants pattern (`My_Services` dict, double-dereferenced `projectsData`, etc.).
2. **Server-first:** every section becomes a server component by default; only true interactive leaves are client: `Navbar`, `MobileMenu`, `HeroTitle` (entrance), `Reveal` wrapper, `Cursor`, `CopyEmail`, `ScrollProgress`, marquee, case-study nav. Target: initial client JS roughly halves.
3. **Tokens wired for real:** `@theme inline` maps `--font-sans` → Geist variable, `--font-serif` → Instrument Serif italic, `--font-mono` → Geist Mono; all colors via semantic tokens (`bg-surface`, `text-muted-foreground`, `border-border`, `text-accent`). Delete unused chart/sidebar tokens.
4. **Motion primitives:** shared `components/motion/Reveal.tsx` (fade-rise, once), `AnimatedHeading.tsx` (line-mask), `usePrefersReducedMotion` hook. Remove `typewriter-effect` and `react-intersection-observer` deps (framer covers both). Keep framer-motion.
5. **Custom cursor:** `components/Cursor.tsx` — rAF loop, `pointer: fine` + no-reduced-motion guard, `mix-blend-difference` ring, grows on `a/button/[data-cursor]` hover. Fixed-position, `pointer-events-none`, `z-50`.
6. **Routing:** add `app/projects/[slug]/page.tsx` (+`generateStaticParams`), `app/writing/[slug]/page.tsx` (MDX posts), `app/not-found.tsx`. Sitemap enumerates all routes including project and post pages.
7. **A11y baseline:** skip link; `scroll-margin-top: 5rem` on all `[id]` sections; single `h1`; `h2` per section, `h3` per card; `aria-current` nav; focus-visible rings on all interactive elements; overlay focus-trap; `aria-label` on icon links; all motion reduced-motion-gated; contrast check (amber on near-black passes large-text; body text ≥ 4.5:1).
8. **SEO:** JSON-LD `Person` + `WebSite` schema in layout; designed 1200×630 OG card (typographic, matches hero); per-page metadata for case studies; `viewport` export with `themeColor`; sitemap with real `lastModified` dates.
9. **Performance budget:** LCP < 2.5s on Fast 3G-ish, initial JS ≤ ~150KB gz, images: WebP with explicit dimensions, hero portrait ≤ 60KB, project shots lazy-loaded below fold, fonts `display: swap` + latin subset only.
10. **Cleanup:** remove `@radix-ui/react-dropdown-menu`, `@radix-ui/react-separator`, `@radix-ui/react-navigation-menu` (flat nav doesn't need it), `autoprefixer`, `tw-animate-css` (replace Sheet with a purpose-built overlay), unused `public/` images; fix every bug listed in §0.1.6; delete committed `out/` from the working tree and confirm `.gitignore`.

---

## Part 4 — Implementation phases

**Phase 1 — IA & content foundation**
Finalize content: resolve experience dates, lock the featured lineup (Job Radar, Betterment, Scalable Authz + "more work" tier incl. Revnix engagements) and gather screenshots, draft all four case-study narratives, **draft the five writing posts** (from the existing topics + images, grounded in real project work), request testimonial quotes, decide "now" facts, confirm client-logo permissions with Revnix. Build `lib/data/` models incl. posts. *Deliverable: approved content sheet, data files.*

**Phase 2 — Design system**
Retune tokens (color/type/radius/surface) in `globals.css`; wire fonts; build the shared primitives (`Container`, `Eyebrow`, `SectionHeader`, `Chip`, `Badge`, `Card`, `Button` variants); motion primitives (`Reveal`, `AnimatedHeading`, `usePrefersReducedMotion`); Cursor component. *Deliverable: a hidden `/style` test route rendering every primitive — review before building pages.*

**Phase 3 — Global shell**
Navbar (desktop + overlay mobile menu + scroll progress + active section), skip link, footer, 404, layout metadata/JSON-LD, scroll-margin fixes. *Deliverable: navigable shell on real content routes.*

**Phase 4 — Homepage sections**
Build in order: Hero (with signature title sequence) → Proof strip → Selected Work rows → Skills blocks → Experience rail → About/Now → Writing list → Contact. Testimonials inserted if quotes secured. *Deliverable: complete homepage, desktop.*

**Phase 5 — Case study + writing pages**
`/projects/[slug]` template + 4 case studies (Job Radar first) written and rendered; `/writing/[slug]` MDX template + 5 posts with the existing cover images; prev/next navs; per-page metadata + `BlogPosting` JSON-LD for posts. *Deliverable: every featured card and blog card resolves to a real page.*

**Phase 6 — Motion & micro-interactions polish**
Tune stagger timings, hover states, marquee, spotlight cards, copy-email interaction, cursor behaviors; pass the "60fps scroll" check (transform/opacity only). *Deliverable: motion QA sheet — every animation has a purpose note.*

**Phase 7 — Responsive & mobile**
Mobile layout pass on every section (320/390/768/1024/1440), overlay menu behaviors, touch-target audit (≥44px), marquee/parallax/cursor disabled on touch. *Deliverable: clean at all five breakpoints.*

**Phase 8 — Accessibility**
Keyboard-only walkthrough, screen-reader pass (heading order, landmarks, aria), reduced-motion walkthrough, contrast audit, focus-visible review. *Deliverable: a11y checklist all green.*

**Phase 9 — Performance & SEO**
Lighthouse ≥ 95 across categories; OG image design; sitemap/robots final; JSON-LD validated; bundle audit against budget. *Deliverable: Lighthouse report archived.*

**Phase 10 — Polish & launch QA**
Cross-browser (Chrome/Firefox/Safari + iOS Safari), typo/content pass, analytics decision (umami/plausible if desired), final content freeze, deploy, post-deploy smoke test. *Deliverable: live site + issues list closed.*

---

## Part 5 — What makes this distinctive (the honest summary)

1. **Typography-led identity** — grotesque + serif-italic accent + mono motifs is the system every reference you love shares; executed on warm charcoal with amber (not another blue/violet portfolio) it becomes yours.
2. **One signature moment** (hero title choreography + custom cursor) instead of ten gimmicks — restraint is the differentiator.
3. **Proof-first narrative** — availability badge → logo strip → metric-led work rows → case studies with "what I'd do differently". The site argues *credibility*, the current one lists *information*.
4. **Skills as judgment** (kenjimmy-blocks + beyond-the-stack coda), not a tag cloud.
5. **The site as work sample** — server-first architecture, reduced-motion-safe motion system, real a11y, measurable performance: every engineering claim on the page is demonstrated by the page itself.
