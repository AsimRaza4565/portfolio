import { site } from "@/lib/data/site";
import { Eyebrow } from "./ui";
import { Reveal } from "./motion";

function Mark({ name, href }: { name: string; href: string }) {
  const cls =
    "whitespace-nowrap text-sm font-medium tracking-wide text-foreground/50 transition-colors duration-300 hover:text-foreground";
  if (!href) return <span className={cls}>{name}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {name}
    </a>
  );
}

/** Social-proof band under the hero — logo/wordmark strip (mobeen/tamalsen pattern). */
export default function ProofStrip() {
  const marks = site.proof.marks;
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Eyebrow>{site.proof.label}</Eyebrow>
            <p className="font-mono text-xs text-muted-foreground/70">{site.proof.note}</p>
          </div>
        </Reveal>
        {/* Desktop: static row / Mobile: marquee */}
        <Reveal delay={0.1}>
          <div className="hidden flex-wrap items-center gap-x-10 gap-y-3 md:flex" aria-label="Teams and clients">
            {marks.map((m) => (
              <Mark key={m.name} {...m} />
            ))}
          </div>
          <div className="marquee relative overflow-hidden md:hidden" aria-hidden="true">
            <div className="marquee-track flex w-max animate-marquee items-center gap-10 py-1">
              {[...marks, ...marks].map((m, i) => (
                <Mark key={`${m.name}-${i}`} {...m} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
