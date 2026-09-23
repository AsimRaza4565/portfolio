import { Accessibility, Gauge, Search } from "lucide-react";
import { beyond, disciplines, stackMarquee } from "@/lib/data/skills";
import { Chip, Container, Section, SectionHeader } from "./ui";
import { Reveal } from "./motion";
import { SpotlightCard } from "./spotlight-card";

const beyondIcons = {
  gauge: Gauge,
  accessibility: Accessibility,
  search: Search,
} as const;

function Marquee() {
  const items = [...stackMarquee, ...stackMarquee];
  return (
    <div className="marquee relative mt-16 overflow-hidden border-y border-border py-4" aria-hidden="true">
      <div className="marquee-track flex w-max animate-marquee items-center gap-3">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground/60 uppercase">
            {item}
            <span className="text-accent/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" className="border-t border-border">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="capabilities"
            title={
              <>
                The stack —{" "}
                <em className="font-serif font-normal italic text-accent">and the judgment</em> to
                use it.
              </>
            }
            lede="Three disciplines I work in daily, and the practices that make the output worth shipping."
          />
        </Reveal>

        {/* Discipline blocks — kenjimmy-inspired */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {disciplines.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7">
                <p className="font-mono text-xs tracking-wide text-accent">{d.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2 pt-2 mt-auto" aria-label={`${d.label} skills`}>
                  {d.chips.map((c) => (
                    <li key={c}>
                      <Chip>{c}</Chip>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Beyond the stack — the coda */}
        <Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-3">
            {beyond.map((b, i) => {
              const Icon = beyondIcons[b.icon];
              return (
                <div key={b.title} className="border-l-2 border-border pl-5 transition-colors duration-300 hover:border-accent/60">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <h3 className="font-mono text-sm font-medium text-foreground">
                      <span className="text-muted-foreground/60">0{i + 1} </span>
                      {b.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Marquee />
      </Container>
    </Section>
  );
}
