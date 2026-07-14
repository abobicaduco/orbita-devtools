import type { Metadata } from "next";
import { BusExplorer } from "@/components/BusExplorer";
import { AdSlot } from "@/components/AdSlot";
import { BUS_INDEX, BUS_META, BUS_DISCLAIMER } from "@/data/onibus-mogi";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({
  title: "Horários de ônibus de Mogi das Cruzes",
  description:
    `Consulte os horários de ${BUS_META.total_linhas} linhas de ônibus de Mogi das Cruzes/SP. Busque por número da linha ou destino. Dados do portal oficial da Prefeitura, sem coletar sua localização.`,
  path: "/onibus-mogi",
  keywords: ["horário de ônibus mogi das cruzes", "ônibus mogi", "linhas de ônibus mogi", "horário ônibus mogi hoje"],
});

export default function OnibusMogiPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Ônibus de Mogi das Cruzes</h1>
        <p className="text-muted">
          {BUS_META.total_linhas} linhas · {BUS_META.total_horarios.toLocaleString("pt-BR")} horários. Busque por número ou destino.
        </p>
      </header>
      <BusExplorer lines={BUS_INDEX} />
      <AdSlot slot={siteConfig.adsense.slotDisplay} className="mx-auto max-w-3xl" />
      <p className="rounded-xl border border-warn/30 bg-warn/10 px-4 py-3 text-xs text-warn">{BUS_DISCLAIMER}</p>
    </div>
  );
}
