import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description: `Sobre o ${siteConfig.name}: ferramentas open source para desenvolvedores, criadas por ${siteConfig.author.name}. Privacidade por padrão, código aberto e auditável.`,
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Sobre o {siteConfig.name}</h1>
        <p className="text-muted">{siteConfig.tagline}, com privacidade por padrão.</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-[#E6EDF3]/90">
        <p>
          O <strong>{siteConfig.name}</strong> nasceu de uma ideia simples: reunir as ferramentas que todo dev
          usa no dia a dia — geradores, validadores, conversores — num lugar rápido, bonito e que
          <strong> não coleta dado de ninguém</strong>. Tudo roda no seu navegador.
        </p>
        <p>
          Além das ferramentas, o site traz utilidades locais (como horários de ônibus de Mogi das Cruzes)
          e uma vitrine de ofertas. O código é <strong>100% open source</strong> sob licença MIT — você pode
          ler, auditar e contribuir.
        </p>
      </section>

      <section className="card space-y-3 p-6">
        <h2 className="font-display text-lg font-semibold">Quem faz</h2>
        <p className="text-sm leading-relaxed text-muted">
          Feito por <strong className="text-white">{siteConfig.author.name}</strong> — engenheiro de software
          focado em automação, dados e plataforma. Este projeto também é uma vitrine técnica:
          Next.js, TypeScript, foco em performance, SEO e segurança.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Icon name="Github" className="h-4 w-4" /> GitHub</a>
          <a href={siteConfig.author.gitlab} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Icon name="Gitlab" className="h-4 w-4" /> GitLab</a>
          <a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Icon name="ExternalLink" className="h-4 w-4" /> LinkedIn</a>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Princípios</h2>
        <ul className="space-y-2 text-sm text-muted">
          {[
            "Privacidade primeiro: o que dá para processar no navegador, fica no navegador.",
            "Open source e auditável: nada de caixa-preta.",
            "Rápido e acessível: leve, responsivo e gratuito.",
            "Seguro: cabeçalhos de segurança rígidos e zero armazenamento de dados pessoais.",
          ].map((t) => (
            <li key={t} className="flex gap-2"><Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> {t}</li>
          ))}
        </ul>
      </section>

      <div className="flex gap-3">
        <Link href="/ferramentas" className="btn-primary"><Icon name="Wrench" className="h-4 w-4" /> Explorar ferramentas</Link>
        <Link href="/privacidade" className="btn-ghost">Política de privacidade</Link>
      </div>
    </div>
  );
}
