import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

interface PageSeo {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

/** Monta o objeto Metadata do Next com OpenGraph/Twitter consistentes. */
export function buildMetadata({ title, description, path = "/", keywords = [] }: PageSeo): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = path === "/" ? `${siteConfig.name} — ${siteConfig.tagline}` : `${title} | ${siteConfig.name}`;
  // O layout raiz já aplica o template "%s | caducosilva ferramentas" ao <title>.
  // Passar fullTitle aqui duplicava o sufixo (ex.: "X | caducosilva | caducosilva").
  // OpenGraph/Twitter não usam o template, então mantêm o fullTitle.
  return {
    title: path === "/" ? fullTitle : title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** JSON-LD: WebApplication para a home. */
export function webAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description: siteConfig.description,
    author: { "@type": "Person", name: siteConfig.author.name },
  };
}

/** JSON-LD: SoftwareApplication para uma ferramenta. */
export function toolJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — ${siteConfig.name}`,
    url: new URL(path, siteConfig.url).toString(),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description,
  };
}

/** JSON-LD: BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, siteConfig.url).toString(),
    })),
  };
}
