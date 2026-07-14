import Link from "next/link";
import Script from "next/script";
import { TOOLS } from "@/lib/tools-meta";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";

const featured = TOOLS.slice(0, 9);

export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-cosmos px-6 py-16 text-center sm:py-24">
        <p className="label-hud mb-4 inline-flex items-center gap-2">
          <Icon name="Sparkles" className="h-4 w-4 text-secondary-glow" /> Open source · sem coletar dados
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Ferramentas para devs, <span className="gradient-text">em um só lugar.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
          {TOOLS.length}+ ferramentas online gratuitas — geradores e validadores de CPF/CNPJ, JSON,
          Base64, hash, senhas, QR Code e mais. Tudo processado no seu navegador.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/ferramentas" className="btn-primary px-6 py-3">
            <Icon name="Wrench" className="h-4 w-4" /> Ver ferramentas
          </Link>
          <a href={siteConfig.repo.github} target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-3">
            <Icon name="Github" className="h-4 w-4" /> Código no GitHub
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <span className="flex items-center gap-2"><Icon name="Lock" className="h-4 w-4 text-ok" /> 100% no navegador</span>
          <span className="flex items-center gap-2"><Icon name="Zap" className="h-4 w-4 text-warn" /> Rápido e gratuito</span>
          <span className="flex items-center gap-2"><Icon name="Shield" className="h-4 w-4 text-primary-glow" /> Privacidade por padrão</span>
        </div>
      </section>

      {/* FERRAMENTAS EM DESTAQUE */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Ferramentas populares</h2>
            <p className="mt-1 text-muted">As mais usadas para o dia a dia.</p>
          </div>
          <Link href="/ferramentas" className="hidden items-center gap-1 text-sm text-primary-glow hover:underline sm:flex">
            Ver todas <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <AdSlot slot={siteConfig.adsense.slotDisplay} className="mx-auto max-w-3xl" />

      {/* SEÇÕES EXTRAS */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/onibus-mogi" className="card group flex items-center gap-4 p-6 hover:border-primary/50">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-nebula"><Icon name="Bus" className="h-6 w-6 text-white" /></span>
          <div>
            <h3 className="font-display text-base font-semibold">Ônibus de Mogi</h3>
            <p className="text-sm text-muted">Horários das linhas da cidade.</p>
          </div>
        </Link>
        <Link href="/ofertas" className="card group flex items-center gap-4 p-6 hover:border-secondary/50">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-nebula"><Icon name="Tag" className="h-6 w-6 text-white" /></span>
          <div>
            <h3 className="font-display text-base font-semibold">Ofertas</h3>
            <p className="text-sm text-muted">Busque pelo número do produto.</p>
          </div>
        </Link>
        <Link href="/projetos" className="card group flex items-center gap-4 p-6 hover:border-primary/50">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-nebula"><Icon name="Github" className="h-6 w-6 text-white" /></span>
          <div>
            <h3 className="font-display text-base font-semibold">Projetos</h3>
            <p className="text-sm text-muted">Apps open source — ajude a testar.</p>
          </div>
        </Link>
      </section>

      {/* FAQ */}
      <section className="space-y-5">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-white">
                {f.q}
                <Icon name="ChevronRight" className="h-5 w-5 text-muted transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
      </section>
    </div>
  );
}

const FAQ = [
  { q: "As ferramentas são gratuitas?", a: "Sim. Todas as ferramentas do AboBI Ferramentas são 100% gratuitas e open source, sem necessidade de cadastro." },
  { q: "Vocês guardam o que eu digito?", a: "Não. As ferramentas rodam inteiramente no seu navegador; nada do que você digita é enviado ou armazenado em servidores." },
  { q: "Os geradores de CPF/CNPJ/cartão são reais?", a: "Não. Os números são fictícios, válidos apenas pelos dígitos verificadores, para testar formulários e sistemas. Não use para fraudes." },
  { q: "Os horários de ônibus de Mogi são oficiais?", a: "São extraídos do portal oficial da Prefeitura de Mogi das Cruzes, apenas para consulta. Confirme sempre na fonte oficial antes de se programar." },
  { q: "Posso usar o código do site?", a: "Sim. Todo o código é open source sob licença MIT e está disponível no GitHub e no GitLab." },
];
