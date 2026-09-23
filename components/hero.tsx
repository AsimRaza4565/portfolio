"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { site } from "@/lib/data/site";
import { MaskedLine } from "./motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle mouse parallax for the portrait + watermark (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const portraitX = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const markX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const markY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_-10%,rgba(245,182,66,0.06),transparent)]"
      />
      {/* Watermark */}
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { x: markX, y: markY }}
        className="pointer-events-none absolute -right-10 bottom-0 hidden font-mono text-[22rem] leading-none font-bold tracking-tighter text-foreground/[0.03] select-none lg:block"
      >
        AR
      </motion.span>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.35fr_1fr]">
        <div>
          {/* Availability badge */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <span className="font-mono text-xs text-muted-foreground">{site.availability}</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-8 font-mono text-sm text-muted-foreground"
          >
            <span className="text-accent">{"//"}</span> {site.name} · {site.location} ⇄ remote
          </motion.p>

          {/* Display title with masked-line reveal */}
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] leading-[1.04] font-semibold tracking-tight text-balance">
            <MaskedLine delay={0.15} onMount>
              Frontend developer
            </MaskedLine>
            <MaskedLine delay={0.3} onMount>
              <span className="font-serif font-normal italic text-accent">building things</span> that
              ship<span className="text-accent">.</span>
            </MaskedLine>
          </h1>

          {/* Sub-copy with inline links */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I build React and Next.js interfaces at{" "}
            <a
              href="https://revnix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Revnix
            </a>{" "}
            — dealer storefronts serving 25+ US locations. Off hours I build personal tools like{" "}
            <Link
              href="/projects/job-radar"
              className="font-medium text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Job Radar
            </Link>
            , a job-hunting engine that works while I sleep.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              View selected work
              <ArrowDown
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={site.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent/60 hover:text-foreground"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Download résumé
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className="mt-10 flex items-center gap-5"
          >
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-[13px] text-muted-foreground transition-colors hover:text-accent"
              >
                {s.label.toLowerCase()}
                <ArrowUpRight
                  className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          style={reduce ? undefined : { x: portraitX, y: portraitY }}
          className="relative mx-auto w-full max-w-[300px] lg:mx-0 lg:justify-self-end"
        >
          <div className="rounded-2xl border border-border bg-surface p-3">
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.portrait.src}
                alt={site.portrait.alt}
                width={286}
                height={286}
                className="aspect-square w-full object-cover grayscale-[35%] transition-all duration-500 hover:grayscale-0"
              />
            </div>
            <figcaption className="flex items-center justify-between px-2 pt-3 pb-1 font-mono text-xs text-muted-foreground">
              <span>{site.portrait.caption}</span>
              <span className="text-accent">↗</span>
            </figcaption>
          </div>
          {/* Corner accent */}
          <span
            aria-hidden="true"
            className="absolute -top-px -right-px h-6 w-6 rounded-tr-2xl border-t-2 border-r-2 border-accent"
          />
        </motion.figure>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#work"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-6 hidden items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent md:inline-flex"
      >
        scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
