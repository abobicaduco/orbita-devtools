import type { Metadata } from "next";
import Script from "next/script";
import { PROJETOS, PROJETOS_META } from "@/data/projetos";
import { AdSlot } from "@/components/AdSlot";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projetos & Apps",
  description:
    "Apps e projetos open source de Carlos Eduardo — apps Android (Flutter/Kotlin), automações Python, ferramentas web. Veja o código no GitHub/GitLab e ajude a testar.",
  path: "/projetos",
  keywords: ["projetos open source", "apps android", "flutter", "portfólio desenvolvedor", "github abobicaduco"],
});

const LANG_COLOR: Record<string, string> = {
  Dart: "#00B4AB", Kotlin: "#A97BFF", Python: "#3776AB",
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Java: "#E76F00", Go: "#00ADD8",
};

export default function ProjetosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projetos & Apps — ${siteConfig.name}`,
    url: `${siteConfig.url}/projetos`,
    hasPart: PROJETOS.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.nome,
      description: p.descricao,
      codeRepository: p.url,
      programmingLanguage: p.linguagem || undefined,
    })),
  };

  return (
    <div className="space-y-8">
      <Script id="ld-projetos" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Projetos & Apps</h1>
        <p className="max-w-2xl text-muted">
          Apps Android, automações e ferramentas que venho construindo — todos open source.
          Dá uma olhada no código, testa, e se curtir deixa uma ⭐.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJETOS.map((p) => (
          <div key={p.full} className="card flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-white">{p.nome}</h2>
              <span className="flex items-center gap-1 label-hud">
                <Icon name={p.fonte === "GitLab" ? "Gitlab" : "Github"} className="h-3.5 w-3.5" /> {p.fonte}
              </span>
            </div>
            {p.descricao && <p className="text-sm text-muted line-clamp-3">{p.descricao}</p>}
            <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted">
              {p.linguagem && (
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLOR[p.linguagem] || "#8B949E" }} />
                  {p.linguagem}
                </span>
              )}
              {p.stars > 0 && <span>★ {p.stars}</span>}
            </div>
            <div className="flex gap-2 pt-1">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-xs">
                <Icon name="Github" className="h-4 w-4" /> Ver código
              </a>
              {p.homepage && (
                <a href={p.homepage} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs" aria-label="Site/demo">
                  <Icon name="ExternalLink" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <AdSlot slot={siteConfig.adsense.slotDisplay} className="mx-auto max-w-3xl" />

      <section className="card space-y-3 p-6 text-center">
        <h2 className="font-display text-xl font-semibold">Quer ajudar? 🙌</h2>
        <p className="mx-auto max-w-xl text-sm text-muted">
          Vários apps estão em fase de testes para chegar à Play Store. Testar, abrir issues ou dar uma
          estrela ajuda demais. É tudo open source — toda contribuição é bem-vinda.
        </p>
        <div className="flex justify-center gap-3 pt-1">
          <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Icon name="Github" className="h-4 w-4" /> GitHub
          </a>
          <a href={siteConfig.author.gitlab} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Icon name="Gitlab" className="h-4 w-4" /> GitLab
          </a>
        </div>
      </section>

      <p className="text-center text-xs text-muted">Lista atualizada em {PROJETOS_META.atualizado_em}.</p>
    </div>
  );
}
