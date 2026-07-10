import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { TOOLS } from "@/lib/tools-meta";
import { BUS_LINES } from "@/data/onibus-mogi";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;
  // /ofertas fica fora do sitemap (noindex) até a vitrine ter produtos reais.
  const staticRoutes = ["", "/ferramentas", "/onibus-mogi", "/projetos", "/sobre", "/contato", "/privacidade", "/termos"];

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

  const busEntries: MetadataRoute.Sitemap = BUS_LINES.map((l) => ({
    url: `${base}/onibus-mogi/${encodeURIComponent(l.linha)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...toolEntries, ...busEntries];
}
