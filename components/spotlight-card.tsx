"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

/** Card with a cursor-following amber spotlight (desktop only). */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-300 before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:bg-[radial-gradient(420px_at_var(--mx)_var(--my),rgba(245,182,66,0.05),transparent)] hover:border-border-strong hover:before:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
