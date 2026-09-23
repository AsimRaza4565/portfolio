"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/lib/data/site";

/** Email address as a big copy-to-clipboard target + mailto secondary. */
export function EmailAction() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied to clipboard" : `Copy email address ${site.email}`}
        className="group inline-flex h-12 max-w-full items-center gap-3 rounded-full border border-border bg-surface px-6 transition-all duration-200 hover:border-accent/60 sm:px-8"
      >
        <span className="truncate font-mono text-base text-foreground transition-colors group-hover:text-accent sm:text-lg">
          {site.email}
        </span>
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
        )}
      </button>
      <a
        href={`mailto:${site.email}`}
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Write an email
      </a>
      <p
        aria-live="polite"
        className={`font-mono text-xs text-emerald-300 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        copied to clipboard ✓
      </p>
    </div>
  );
}
