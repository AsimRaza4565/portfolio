import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { allProjects } from "@/lib/data/projects";
import { posts } from "@/lib/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-09-23"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...allProjects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date("2026-09-23"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/writing/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
