import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Termos de Uso",
  description: `Termos de uso do ${siteConfig.name}. Ferramentas fornecidas "como estão", de forma gratuita e open source.`,
  path: "/termos",
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
    <div className="space-y-2 text-sm leading-relaxed text-muted">{children}</div>
  </section>
);

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Termos de Uso</h1>
        <p className="text-sm text-muted">Última atualização: junho de 2026.</p>
      </header>

      <Section title="Uso do serviço">
        <p>O {siteConfig.name} oferece ferramentas online gratuitas. Você pode usá-las livremente, inclusive para fins
        comerciais. Os dados gerados (CPFs, CNPJs, senhas etc.) destinam-se a <strong className="text-white">testes e
        desenvolvimento</strong> — não use para fraudes ou qualquer atividade ilícita.</p>
      </Section>

      <Section title="Sem garantias">
        <p>As ferramentas são fornecidas &quot;como estão&quot;, sem garantias de exatidão ou disponibilidade.
        Os horários de ônibus e ofertas são informativos e podem estar desatualizados — confirme sempre na fonte oficial.</p>
      </Section>

      <Section title="Limitação de responsabilidade">
        <p>Não nos responsabilizamos por decisões tomadas com base nas informações ou resultados gerados pelo site.</p>
      </Section>

      <Section title="Código aberto">
        <p>O projeto é open source sob licença MIT. Você pode reutilizar o código respeitando os termos da licença,
        disponível no repositório.</p>
      </Section>

      <Section title="Alterações">
        <p>Estes termos podem ser atualizados a qualquer momento. O uso contínuo do site implica concordância com a versão vigente.</p>
      </Section>
    </div>
  );
}
