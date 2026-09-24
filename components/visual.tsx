import type { Project } from "@/lib/data/projects";

/** CSS-rendered mini dashboard for Job Radar — no screenshot needed. */
export function JobRadarMock() {
  const rows = [
    { title: "Frontend Engineer — fintech", match: "94%", where: "RemoteOK", hot: true },
    { title: "React Developer — commerce", match: "88%", where: "JSearch", hot: false },
    { title: "Next.js Dev — US dealer tech", match: "82%", where: "JSearch", hot: false },
    { title: "Full-stack (MERN)", match: "76%", where: "RemoteOK", hot: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface" aria-hidden="true">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 rounded-md border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          job-radar · today&apos;s digest
        </span>
        <span className="ml-auto font-mono text-[10px] text-emerald-300">● cron: healthy</span>
      </div>
      {/* feed */}
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.title} className="flex items-center gap-3 px-4 py-3">
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                r.hot ? "bg-accent/15 text-accent" : "bg-surface-2 text-muted-foreground"
              }`}
            >
              {r.match}
            </span>
            <span className="truncate text-[13px] text-foreground/90">{r.title}</span>
            {r.hot ? (
              <span className="hidden shrink-0 rounded border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] text-accent sm:inline">
                résumé tailored ✓
              </span>
            ) : null}
            <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground/60">{r.where}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[10px] text-muted-foreground/60">
          <span>4 new · 212 deduped</span>
          <span className="text-accent">emailed ✓</span>
        </div>
      </div>
    </div>
  );
}

/** CSS-rendered dealer storefront mock for the production client sites. */
export function StorefrontMock() {
  const cards = [
    { name: "Utility tractors", meta: "40–140 hp · new" },
    { name: "Zero-turn mowers", meta: "home & ranch" },
    { name: "Certified used", meta: "inspected · 26 in stock" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface" aria-hidden="true">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ml-3 truncate rounded-md border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          https://21stcenturyequipment.com
        </span>
        <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-emerald-300 sm:block">
          ● lcp 1.2s
        </span>
      </div>
      {/* storefront header */}
      <div className="flex items-center gap-4 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-sm bg-[#367c2b]" />
          <span className="h-2 w-20 rounded-full bg-foreground/25" />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {["inventory", "parts", "service"].map((n) => (
            <span
              key={n}
              className="rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground/70 sm:px-2 sm:text-[10px]"
            >
              {n}
            </span>
          ))}
          <span className="rounded bg-accent px-2 py-0.5 font-mono text-[9px] font-medium text-accent-foreground sm:text-[10px]">
            shop
          </span>
        </div>
      </div>
      {/* hero band */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[linear-gradient(120deg,rgba(54,124,43,0.22),rgba(54,124,43,0.05))] px-4 py-6 sm:px-5">
        <div className="space-y-2">
          <span className="block h-2.5 w-48 rounded-full bg-foreground/25" />
          <span className="block h-2 w-36 rounded-full bg-foreground/15" />
        </div>
        <div className="space-y-2 text-right">
          <span className="block rounded-full bg-[#367c2b] px-4 py-1.5 font-mono text-[10px] font-medium text-white">
            browse equipment →
          </span>
        </div>
      </div>
      {/* equipment grid */}
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {cards.map((c) => (
          <div key={c.name} className="flex items-center gap-3 px-4 py-3.5 sm:flex-col sm:items-start sm:gap-2.5">
            <span className="h-10 w-16 shrink-0 rounded-md border border-border bg-[linear-gradient(135deg,rgba(54,124,43,0.18),transparent_60%)] sm:h-12 sm:w-full" />
            <div>
              <span className="block text-[12px] font-medium text-foreground/90">{c.name}</span>
              <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground/60">{c.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Renders a project's visual — CSS mock or framed screenshot — in a shared slot. */
export default function ProjectVisual({
  visual,
  className = "",
}: {
  visual: Project["visual"];
  className?: string;
}) {
  if (visual.kind === "mock") {
    return (
      <div className={className}>
        <JobRadarMock />
      </div>
    );
  }
  if (visual.kind === "storefront") {
    return (
      <div className={className}>
        <StorefrontMock />
      </div>
    );
  }
  return (
    <div
      className={`group overflow-hidden rounded-xl border border-border bg-surface p-2.5 transition-colors duration-300 hover:border-accent/40 ${className}`}
    >
      <div className="overflow-hidden rounded-lg bg-surface-2">
        {/* Natural size — project screenshots must never be cropped. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visual.src}
          alt={visual.alt}
          loading="lazy"
          className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </div>
    </div>
  );
}
