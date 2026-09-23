import { experiences } from "@/lib/data/experience";
import { Chip, Container, Section, SectionHeader } from "./ui";
import { Reveal } from "./motion";

export default function Experience() {
  return (
    <Section id="experience" className="border-t border-border">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="experience"
            title={
              <>
                Where I&apos;ve{" "}
                <em className="font-serif font-normal italic text-accent">shipped</em>.
              </>
            }
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-border"
          />
          <ol className="space-y-14">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.period}`} delay={i * 0.08}>
                <li className="relative pl-10">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-2 ${
                      exp.current ? "border-accent bg-accent/20" : "border-border-strong bg-background"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{exp.role}</h3>
                    {exp.current ? (
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent">
                        current
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                    {exp.companyHref ? (
                      <a
                        href={exp.companyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="text-foreground/80">{exp.company}</span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>{exp.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </p>
                  {exp.note ? (
                    <p className="mt-2 font-serif text-[15px] italic text-muted-foreground/80">{exp.note}</p>
                  ) : null}
                  <ul className="mt-4 max-w-[72ch] space-y-2">
                    {exp.achievements.map((a) => (
                      <li key={a.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                    {exp.tech.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
