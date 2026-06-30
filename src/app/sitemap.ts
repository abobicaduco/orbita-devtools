import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { TOOLS } from "@/lib/tools-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;
  const staticRoutes = ["", "/ferramentas", "/onibus-mogi", "/ofertas", "/sobre", "/privacidade", "/termos"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${base}/ferramentas/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...toolEntries];
}
