import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data/site";
import { Container, Section } from "./ui";
import { Reveal } from "./motion";
import { EmailAction } from "./email-action";

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-border">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_100%,rgba(245,182,66,0.05),transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <div className="flex flex-col items-center py-8 text-center md:py-14">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">{"//"}</span> contact
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              Let&apos;s build something{" "}
              <em className="font-serif font-normal italic text-accent">worth shipping</em>.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Open to full-time, freelance and remote frontend work. I reply within 24 hours —{" "}
              {site.location.split(",")[1]?.trim() ?? "PK"} ⇄ your timezone.
            </p>

            <div className="mt-10">
              <EmailAction />
            </div>

            <div className="mt-10 flex items-center gap-6">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-mono text-[13px] text-foreground/75 transition-colors hover:text-accent"
                >
                  {s.label.toLowerCase()}
                  <ArrowUpRight
                    className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
