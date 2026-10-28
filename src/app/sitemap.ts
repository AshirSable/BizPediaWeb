import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/industries", priority: 0.7 },
    { path: "/our-work", priority: 0.7 },
    { path: "/how-we-work", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/engagement-models", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/insights", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ];
  return paths.map(({ path, priority }) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "monthly", priority }));
}
