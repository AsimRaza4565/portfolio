import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { featured, moreWork, productionSites } from "@/lib/data/projects";
import { ArrowLink, Chip, Container, Section, SectionHeader, StatusBadge } from "./ui";
import { Reveal } from "./motion";
import ProjectVisual from "./visual";

function FeaturedRow({ project, flip }: { project: (typeof featured)[number]; flip: boolean }) {
  return (
    <Reveal as="article">
      <div
        className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 ${
          flip ? "" : ""
        }`}
      >
        {/* Visual */}
        <div className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
          <ProjectVisual visual={project.visual} />
        </div>
        {/* Content */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} label={project.statusLabel} />
            <span className="font-mono text-xs text-muted-foreground/70">{project.year}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            {project.name.split(project.accent ?? "~~~")[0]}
            {project.accent ? (
              <span className="font-serif font-normal italic text-accent">{project.accent}</span>
            ) : null}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{project.role}</p>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            {project.links.map((l) =>
              l.kind === "case" ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  {l.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-[13px] text-muted-foreground transition-colors hover:text-accent"
                >
                  {l.kind === "github" ? (
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {l.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Browser-chrome frame card for production client sites. */
function SiteCard({ s }: { s: (typeof productionSites)[number] }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <div className="border-b border-border bg-surface-2 px-4 py-2.5" aria-hidden="true">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="ml-2 truncate rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            https://{s.domain}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {s.name}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            live
          </span>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
          <p className="mt-4 font-mono text-xs text-muted-foreground/60">{s.tag} · next.js + nextly cms</p>
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="selected work"
            title={
              <>
                Work that <em className="font-serif font-normal italic text-accent">went live</em>.
              </>
            }
            lede="Production systems, a hackathon win, and a product that hunts jobs while I sleep — chosen for what they demonstrate, not filler."
            aside={
              <ArrowLink href="https://github.com/AsimRaza4565" external>
                everything on github
              </ArrowLink>
            }
          />
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {featured.slice(0, 3).map((p, i) => (
            <FeaturedRow key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Production tier */}
        <Reveal>
          <div className="mt-24 border-t border-border pt-14 md:mt-28">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                Shipped &amp; maintained{" "}
                <em className="font-serif font-normal italic text-accent">in production</em>
              </h3>
              <p className="font-mono text-xs text-muted-foreground/70">
                client storefronts @ revnix — frontend
              </p>
            </div>
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
              These run real businesses — inventory, parts, service and payments for US John Deere
              dealers. I build and maintain their frontends: CMS-driven pages, auth and checkout
              flows, and performance budgets that hold.{" "}
              <Link href="/projects/production-storefronts" className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                Read the full story →
              </Link>
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {productionSites.map((s) => (
                <SiteCard key={s.domain} s={s} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* More work */}
        <Reveal>
          <div className="mt-16 border-t border-border pt-10">
            <p className="font-mono text-xs tracking-wide text-muted-foreground">
              <span className="text-accent">{"//"}</span> more work
            </p>
            <ul className="mt-5 divide-y divide-border">
              {moreWork.map((w) => (
                <li
                  key={w.name}
                  className="group grid grid-cols-1 gap-x-6 gap-y-0.5 py-3.5 sm:grid-cols-[minmax(0,14rem)_1fr]"
                >
                  <span className="text-sm font-medium text-foreground/90 transition-colors group-hover:text-accent">
                    {w.name}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{w.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
