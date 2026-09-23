import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/* ── Layout primitives ─────────────────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/* ── Typography primitives ─────────────────────────────────────── */

/** Lowercase mono eyebrow with the accent "//" prefix. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-sm tracking-wide text-muted-foreground">
      <span className="text-accent">{"//"}</span> {children}
    </p>
  );
}

/**
 * Display heading. Wrap accent words in <em> to render them in the
 * serif-italic accent treatment, e.g.
 * `<SectionTitle>Work that <em>went live</em>.</SectionTitle>`
 */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted-foreground md:text-lg">{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
        {lede ? <Lede>{lede}</Lede> : null}
      </div>
      {aside ? <div className="shrink-0 pb-1">{aside}</div> : null}
    </div>
  );
}

/** Serif-italic accent word for display headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic text-accent">{children}</em>;
}

/* ── Small elements ────────────────────────────────────────────── */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-accent/50 hover:text-foreground">
      {children}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  live: "text-emerald-300",
  "open-source": "text-sky-300",
  hackathon: "text-violet-300",
  production: "text-emerald-300",
  personal: "text-amber-300",
};

/** Status pill with a pulsing dot — mobeen-style status badges. */
export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const color = statusStyles[status] ?? "text-muted-foreground";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs">
      <span className={`relative flex h-1.5 w-1.5 ${color}`} aria-hidden="true">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color} bg-current`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full bg-current ${color}`} />
      </span>
      <span className="text-muted-foreground">{label ?? status}</span>
    </span>
  );
}

/** Mono link with an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-accent ${className}`;
  const icon = (
    <ArrowUpRight
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

/* ── Buttons ───────────────────────────────────────────────────── */

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2";

export function PrimaryButton({
  href,
  children,
  download = false,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
}) {
  const cls = `${buttonBase} bg-accent text-accent-foreground hover:bg-accent-hover hover:-translate-y-0.5`;
  if (href.startsWith("http") || href.startsWith("/") || href.startsWith("#")) {
    if (href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return download ? (
      <a href={href} download className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  const cls = `${buttonBase} border border-border text-muted-foreground hover:border-accent/60 hover:text-foreground`;
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
