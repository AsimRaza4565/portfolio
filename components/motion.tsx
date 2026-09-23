"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Standard scroll-reveal: fades and rises once, when 30% visible.
 * Respects prefers-reduced-motion by rendering the final state.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Line-mask reveal for display headings (lissan-style, once). */
export function MaskedLine({
  children,
  delay = 0,
  className = "",
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Play on mount instead of on scroll — for above-the-fold headings. */
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        {...(onMount
          ? { animate: { y: "0%" } }
          : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.6 } })}
        transition={{ duration: 0.65, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
