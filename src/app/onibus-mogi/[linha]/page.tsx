import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BUS_LINES, getLine, BUS_DISCLAIMER } from "@/data/onibus-mogi";
import { AdSlot } from "@/components/AdSlot";
import { Icon } from "@/components/Icon";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const DAY_ORDER = ["Dia Útil", "Sábado", "Domingo/Feriado"];

export function generateStaticParams() {
  return BUS_LINES.map((l) => ({ linha: l.linha }));
}

export async function generateMetadata({ params }: { params: Promise<{ linha: string }> }): Promise<Metadata> {
  const { linha } = await params;
  const line = getLine(decodeURIComponent(linha));
  if (!line) return {};
  return buildMetadata({
    title: `Linha ${line.linha} — ${line.nome} (horários)`,
    description: `Horários da linha ${line.linha} (${line.nome}) de ônibus em Mogi das Cruzes/SP: dia útil, sábado e domingo/feriado, sentidos ida e volta.${line.empresa ? " Empresa: " + line.empresa + "." : ""}`,
    path: `/onibus-mogi/${line.linha}`,
    keywords: [`linha ${line.linha} mogi`, `horário ônibus ${line.linha}`, `${line.nome} mogi`, "ônibus mogi das cruzes"],
  });
}

export default async function LinhaPage({ params }: { params: Promise<{ linha: string }> }) {
  const { linha } = await params;
  const line = getLine(decodeURIComponent(linha));
  if (!line) notFound();

  const days = DAY_ORDER
    .map((d) => ({ dia: d, blocks: line.grade.filter((g) => g.dia === d) }))
    .filter((g) => g.blocks.length > 0);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Script id="ld-bread" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Início", path: "/" },
        { name: "Ônibus de Mogi", path: "/onibus-mogi" },
        { name: `Linha ${line.linha}`, path: `/onibus-mogi/${line.linha}` },
      ])) }} />

      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/onibus-mogi" className="hover:text-white">Ônibus de Mogi</Link>
        <Icon name="ChevronRight" className="h-4 w-4" />
        <span className="text-white">Linha {line.linha}</span>
      </nav>

      <header className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-nebula font-display text-lg font-bold text-white shadow-glow-purple">
          {line.linha}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{line.nome}</h1>
          <p className="mt-1 text-sm text-muted">
            {line.empresa && <span>{line.empresa}</span>}
            {line.pontoA && <span> · Ponto A: {line.pontoA}</span>}
            {line.pontoB && <span> · Ponto B: {line.pontoB}</span>}
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {days.map(({ dia, blocks }) => (
          <section key={dia} className="card p-5 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
              <Icon name="Clock" className="h-5 w-5 text-primary-glow" /> {dia}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {blocks.map((b, i) => (
                <div key={i} className="space-y-2">
                  <p className="label-hud">
                    {b.sentido || "Saída"}{b.ponto ? ` · Ponto ${b.ponto}` : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {b.horarios.map((h) => (
                      <span key={h} className="rounded-lg border border-white/10 bg-base/60 px-2 py-1 font-mono text-xs text-primary-glow">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AdSlot />

      <p className="rounded-xl border border-warn/30 bg-warn/10 px-4 py-3 text-xs text-warn">{BUS_DISCLAIMER}</p>

      <Link href="/onibus-mogi" className="btn-ghost"><Icon name="ArrowRight" className="h-4 w-4 rotate-180" /> Todas as linhas</Link>
    </article>
  );
}
