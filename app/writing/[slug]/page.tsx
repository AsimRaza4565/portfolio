import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, posts } from "@/lib/data/posts";
import { Blocks } from "@/components/blocks";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: post.title,
      description: post.description,
    },
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const index = sorted.findIndex((p) => p.slug === post.slug);
  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Asim Raza", url: "https://asimraza.me" },
  };

  return (
    <>
      <Navbar />
      <main id="main" className="pt-20 pb-20 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/#writing"
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                all writing
              </Link>
            </Reveal>
          </div>

          <article className="mx-auto mt-10 max-w-3xl">
            <Reveal>
              <header>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/70">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-[60ch] font-serif text-lg italic text-muted-foreground">
                  {post.description}
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover} alt={post.coverAlt} width={1200} height={750} className="aspect-[16/10] w-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <Blocks blocks={post.blocks} />
              </div>
            </Reveal>
          </article>

          <nav aria-label="More writing" className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
            <Link href={`/writing/${prev.slug}`} className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
              <p className="font-mono text-xs text-muted-foreground/70">← previous</p>
              <p className="mt-2 line-clamp-2 text-sm font-semibold tracking-tight transition-colors group-hover:text-accent">{prev.title}</p>
            </Link>
            <Link href={`/writing/${next.slug}`} className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:text-right">
              <p className="font-mono text-xs text-muted-foreground/70">next →</p>
              <p className="mt-2 line-clamp-2 text-sm font-semibold tracking-tight transition-colors group-hover:text-accent">{next.title}</p>
            </Link>
          </nav>
        </Container>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}
