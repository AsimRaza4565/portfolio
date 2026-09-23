"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { site } from "@/lib/data/site";

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? y / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, progressRef };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const links = [...site.nav, { label: "contact", href: "#contact" }];

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <span className="font-mono text-sm font-medium">
          asim<span className="text-accent">.</span>dev
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          autoFocus
          className="rounded-md p-2.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <nav className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6" aria-label="Mobile">
        <ul className="space-y-2">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="opacity-0"
              style={{ animation: `menu-in 0.4s ease-out ${0.06 * i + 0.05}s forwards` }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 text-4xl font-semibold tracking-tight transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={site.resume}
          download
          className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[13px] text-muted-foreground transition-all duration-200 hover:border-accent/60 hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          résumé
        </a>
      </nav>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 pb-10">
        <a href={`mailto:${site.email}`} className="font-mono text-xs text-muted-foreground">
          {site.email}
        </a>
        <div className="flex gap-4">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              {s.label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
      <style>{`@keyframes menu-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

export default function Navbar() {
  const { scrolled, progressRef } = useScrollState();
  const active = useActiveSection([...site.nav.map((n) => n.href.slice(1)), "contact"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link
            href="/#top"
            className="font-mono text-sm font-medium tracking-tight"
            aria-label={`${site.name} — home`}
          >
            asim<span className="text-accent">.</span>dev
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {site.nav.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`font-mono text-[13px] transition-colors duration-200 hover:text-foreground ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 font-mono text-[13px] text-muted-foreground transition-all duration-200 hover:border-accent/60 hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              résumé
            </a>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {/* Scroll progress */}
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-accent/80"
          style={{ transform: "scaleX(0)" }}
        />
      </header>
      {menuOpen ? (
        <MobileMenu
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}
