import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, posts } from "@/lib/data/posts";
import { Container, Section, SectionHeader } from "./ui";
import { Reveal } from "./motion";

export default function Writing() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <Section id="writing" className="border-t border-border">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="writing"
            title={
              <>
                Notes from <em className="font-serif font-normal italic text-accent">shipping</em>.
              </>
            }
            lede="Practical frontend notes — performance, architecture and the lessons that only show up in production."
          />
        </Reveal>

        <ul className="mt-14 divide-y divide-border border-t border-border">
          {sorted.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 0.05, 0.2)}>
              <li>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex items-center gap-5 py-7 transition-colors sm:gap-8"
                >
                  {/* Cover thumb */}
                  <div className="hidden w-40 shrink-0 overflow-hidden rounded-lg border border-border bg-surface sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover}
                      alt=""
                      width={320}
                      height={200}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover opacity-80 brightness-[0.88] saturate-[0.9] transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/70">
                      <span>{formatDate(post.date)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime} read</span>
                    </div>
                    <h3 className="mt-1.5 pr-6 text-lg leading-snug font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="hidden h-5 w-5 shrink-0 self-center text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
