import { Flame, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Container, Section, SectionHeader } from "./ui";
import { Reveal } from "./motion";

const facts = [
  {
    label: "education",
    icon: GraduationCap,
    lines: ["BS Software Engineering", "University of Haripur · 2021 — 2025"],
  },
  {
    label: "certifications",
    icon: Sparkles,
    lines: ["Google Cybersecurity Professional", "Coursera · 2024"],
  },
  {
    label: "now",
    icon: MapPin,
    lines: [
      "Frontend developer at Revnix — dealer storefronts",
      "Building Job Radar on weekends",
      "Open to full-time, freelance & remote roles",
    ],
  },
];

export default function About() {
  return (
    <Section id="about" className="border-t border-border">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="about"
            title={
              <>
                The person behind{" "}
                <em className="font-serif font-normal italic text-accent">the commits</em>.
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Story */}
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p className="text-lg text-foreground/90">
                I got serious about frontend because it&apos;s the layer where engineering meets
                people — and it shows immediately when either half is done carelessly.
              </p>
              <p>
                I studied software engineering at the University of Haripur, fell into an internship
                that let me ship real interfaces, and six months later was building production
                storefronts at Revnix — the kind with inventory, payments and daily publishing,
                where a slow page or a broken checkout costs real money.
              </p>
              <p>
                What I obsess over: performance budgets that hold on real content, accessibility
                that ships by default, and the small details nobody notices until they&apos;re
                wrong. The best compliment my work can get is that nobody noticed it — they just
                found the tractor part, paid, and left happy.
              </p>
            </div>
          </Reveal>

          {/* Facts card */}
          <Reveal delay={0.1}>
            <dl className="divide-y divide-border rounded-xl border border-border bg-surface">
              {facts.map((f) => (
                <div key={f.label} className="p-5 first:rounded-t-xl last:rounded-b-xl">
                  <dt className="flex items-center gap-2 font-mono text-xs text-accent">
                    <f.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {f.label}
                  </dt>
                  <dd className="mt-2.5 space-y-1">
                    {f.lines.map((l) => (
                      <p key={l} className="text-sm leading-relaxed text-muted-foreground">
                        {l}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
              <div className="p-5">
                <dt className="flex items-center gap-2 font-mono text-xs text-accent">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  beyond code
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Always a side project on the boil — currently Job Radar. Ask me about the last
                  one.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
