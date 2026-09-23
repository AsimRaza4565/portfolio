import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/data/site";
import LocalTime from "./local-time";

export default function Footer() {
  return (
    <footer id="contact-end" className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-medium">
              asim<span className="text-accent">.</span>dev
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              Designed &amp; built by {site.name} — Next.js, Tailwind, and too much attention to
              detail.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[...site.nav, { label: "contact", href: "#contact" }].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[13px] text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-muted-foreground transition-colors hover:text-accent"
                >
                  {s.label.toLowerCase()}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                download
                className="font-mono text-[13px] text-muted-foreground transition-colors hover:text-accent"
              >
                résumé.pdf
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">© 2026 {site.name}</p>
          <LocalTime />
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
