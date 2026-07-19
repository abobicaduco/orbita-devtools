import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description: `Fale com o ${siteConfig.name}: sugestões de ferramentas, correções de horários de ônibus, bugs e parcerias. Respondemos por e-mail e GitHub.`,
  path: "/contato",
});

const CANAIS = [
  {
    icon: "Mail",
    titulo: "E-mail",
    desc: "Para sugestões, correções, parcerias ou qualquer assunto.",
    label: "abobicarlo@gmail.com",
    href: "mailto:abobicarlo@gmail.com",
  },
  {
    icon: "Github",
    titulo: "GitHub Issues",
    desc: "Achou um bug ou quer pedir uma ferramenta nova? Abra uma issue no repositório — o site é open source.",
    label: "caducosilva/orbita-devtools",
    href: `${siteConfig.repo.github}/issues`,
  },
  {
    icon: "ExternalLink",
    titulo: "LinkedIn",
    desc: "Contato profissional com o autor do projeto.",
    label: "Carlos Eduardo",
    href: siteConfig.author.linkedin,
  },
] as const;

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Contato</h1>
        <p className="text-muted">
          Sugestão de ferramenta, horário de ônibus desatualizado, bug ou parceria — fala com a gente.
        </p>
      </header>

      <div className="space-y-4">
        {CANAIS.map((c) => (
          <a
            key={c.titulo}
            href={c.href}
            target={c.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="card group flex items-start gap-4 p-5 transition-colors hover:border-primary/50"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-space/60 text-primary-glow group-hover:border-primary/40">
              <Icon name={c.icon} className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display font-semibold text-white">{c.titulo}</h2>
              <p className="mt-0.5 text-sm text-muted">{c.desc}</p>
              <p className="mt-1.5 text-sm text-primary-glow">{c.label}</p>
            </div>
          </a>
        ))}
      </div>

      <section className="space-y-3 text-sm leading-relaxed text-muted">
        <h2 className="font-display text-lg font-semibold text-white">Antes de escrever</h2>
        <p>
          Horários de ônibus vêm do portal oficial da Prefeitura de Mogi das Cruzes — se encontrou uma
          divergência, mande o número da linha e o horário errado que corrigimos na próxima atualização.
          Para problemas com as ferramentas, descreva o que digitou e o que esperava como resultado:
          como tudo roda no seu navegador, esse contexto é o que permite reproduzir o problema.
        </p>
        <p>
          Não oferecemos suporte sobre os produtos da página de ofertas — compras, trocas e garantias são
          tratadas diretamente com a loja onde a compra foi feita.
        </p>
      </section>
    </div>
  );
}
