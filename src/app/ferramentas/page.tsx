import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import { AdSlot } from "@/components/AdSlot";
import { buildMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/tools-meta";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Todas as ferramentas",
  description: `Explore ${TOOLS.length}+ ferramentas online gratuitas para desenvolvedores: geradores e validadores de CPF/CNPJ, JSON, Base64, hash, UUID, senhas, QR Code e mais.`,
  path: "/ferramentas",
});

const CATEGORIAS_DESC: { nome: string; desc: string }[] = [
  { nome: "Brasil", desc: "Geradores e validadores de documentos brasileiros — CPF, CNPJ, PIS/PASEP e dados fictícios de pessoa — para testar sistemas sem usar informações reais, como pede a LGPD." },
  { nome: "Texto & Código", desc: "Formatador de JSON, Base64, URL encode, contador de texto, conversor de caixa e testador de regex — o kit de sobrevivência de quem trabalha com APIs e dados todos os dias." },
  { nome: "Geradores", desc: "UUID, senhas fortes com Web Crypto, Lorem Ipsum, QR Code, números aleatórios e cartões de teste (Luhn) — tudo criado localmente, com um clique." },
  { nome: "Conversores", desc: "Cores (HEX/RGB/HSL), bases numéricas, timestamp Unix, temperatura, binário, números romanos e cálculo de datas — traduções instantâneas entre formatos." },
  { nome: "Segurança", desc: "Hashes SHA, decodificador de JWT e gerador de senhas — ferramentas que lidam com dados sensíveis e por isso rodam 100% no seu dispositivo, sem envio a servidores." },
];

export default function FerramentasPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Ferramentas</h1>
        <p className="text-muted">{TOOLS.length} ferramentas, todas processadas no seu navegador.</p>
      </header>
      <ToolsExplorer />
      <AdSlot slot={siteConfig.adsense.slotDisplay} className="mx-auto max-w-3xl pt-6" />

      <section className="space-y-4 border-t border-white/10 pt-8">
        <h2 className="font-display text-xl font-bold">O que você encontra em cada categoria</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIAS_DESC.map((c) => (
            <div key={c.nome} className="card p-5">
              <h3 className="font-display font-semibold text-white">{c.nome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted">
          Todas as ferramentas seguem o mesmo princípio: <strong className="text-white">o que dá para
          processar no navegador, fica no navegador</strong>. Nenhum texto, documento ou token que você
          digita é enviado a servidores — e o código é open source, então dá para conferir. Sentiu falta
          de alguma ferramenta? <a href="/contato" className="text-primary-glow underline">Fala com a gente</a>.
        </p>
      </section>
    </div>
  );
}
