import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProjects, getProject } from "@/lib/data/projects";
import { Blocks } from "@/components/blocks";
import { Chip, Container, StatusBadge } from "@/components/ui";
import { Reveal } from "@/components/motion";
import ProjectVisual from "@/components/visual";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const prev = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(index + 1) % allProjects.length];

  return (
    <>
      <Navbar />
      <main id="main" className="pt-24 pb-20 md:pt-28">
        <Container>
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
              all work
            </Link>
          </Reveal>

          {/* Case study header */}
          <header className="mt-10 max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} label={project.statusLabel} />
                <span className="font-mono text-xs text-muted-foreground/70">
                  {project.role} · {project.year}
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                {project.name.split(project.accent ?? "~~~")[0]}
                {project.accent ? (
                  <span className="font-serif font-normal italic text-accent">{project.accent}</span>
                ) : null}
              </h1>
              <p className="mt-4 font-serif text-xl italic text-muted-foreground md:text-2xl">
                {project.tagline}
              </p>
              <p className="mt-6 max-w-[65ch] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
              {project.links.length > 0 ? (
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {l.label}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </header>

          {/* Hero visual */}
          <Reveal delay={0.15}>
            <ProjectVisual
              visual={project.visual}
              className={`mt-14 md:mt-16 ${project.visual.kind === "mock" ? "max-w-3xl" : ""}`}
            />
          </Reveal>

          {/* Sections */}
          <div className="mt-16 max-w-3xl space-y-14 md:mt-20">
            {project.caseStudy.map((section, i) => (
              <Reveal key={section.id}>
                <section aria-labelledby={`${project.slug}-${section.id}`} className="border-t border-border pt-8">
                  <p className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")} <span className="text-muted-foreground/50">/</span>{" "}
                    <span className="text-muted-foreground">{section.label}</span>
                  </p>
                  <div className="mt-5">
                    <Blocks blocks={section.blocks} />
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Prev / next */}
          <nav aria-label="More work" className="mt-20 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}`} className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
              <p className="font-mono text-xs text-muted-foreground/70">← previous</p>
              <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent">{prev.name}</p>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group rounded-xl border border-border bg-surface p-5 text-right transition-colors hover:border-accent/40 sm:text-right">
              <p className="font-mono text-xs text-muted-foreground/70">next →</p>
              <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent">{next.name}</p>
            </Link>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
