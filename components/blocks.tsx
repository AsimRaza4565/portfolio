import type { ReactNode } from "react";
import type { Block } from "@/lib/data/projects";
import { CodeBlock } from "./code-block";

/* Minimal inline markup: `code`, **bold**, *em*, [text](href) */

const INLINE_RE = /(\[[^\]]+\]\([^)]+\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;

export function renderInline(text: string, keyPrefix = ""): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (tok.startsWith("[")) {
      const lm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok);
      if (lm) {
        const external = lm[2].startsWith("http");
        out.push(
          external ? (
            <a
              key={key}
              href={lm[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {lm[1]}
            </a>
          ) : (
            <a key={key} href={lm[2]} className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent">
              {lm[1]}
            </a>
          )
        );
      }
    } else if (tok.startsWith("`")) {
      out.push(
        <code key={key} className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith("**")) {
      out.push(
        <strong key={key} className="font-semibold text-foreground">
          {tok.slice(2, -2)}
        </strong>
      );
    } else {
      out.push(
        <em key={key} className="font-serif text-[1.08em] italic text-foreground">
          {tok.slice(1, -1)}
        </em>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Renders structured content blocks — shared by case studies and posts. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="max-w-[68ch] leading-relaxed text-muted-foreground">
                {renderInline(b.text, `b${i}`)}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="pt-6 text-2xl font-semibold tracking-tight text-foreground">
                {renderInline(b.text, `b${i}`)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-4 text-lg font-semibold tracking-tight text-foreground">
                {renderInline(b.text, `b${i}`)}
              </h3>
            );
          case "list": {
            const items = b.items.map((it, j) => (
              <li key={j} className="leading-relaxed text-muted-foreground">
                {renderInline(it, `b${i}-${j}`)}
              </li>
            ));
            const List = b.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`max-w-[68ch] space-y-2 pl-5 text-muted-foreground ${
                  b.ordered ? "list-decimal" : "list-disc"
                } marker:text-accent`}
              >
                {items}
              </List>
            );
          }
          case "code":
            return <CodeBlock key={i} code={b.code} lang={b.lang} title={b.title} />;
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-accent/60 pl-5 font-serif text-xl italic text-foreground">
                “{b.text}”
                {b.cite ? <footer className="mt-2 font-sans text-sm not-italic text-muted-foreground">— {b.cite}</footer> : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt}
                  className="w-full rounded-xl border border-border"
                  loading="lazy"
                />
                {b.caption ? (
                  <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{b.caption}</figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
