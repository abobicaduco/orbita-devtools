import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import { AdSlot } from "@/components/AdSlot";
import { buildMetadata } from "@/lib/seo";
import { TOOLS } from "@/lib/tools-meta";

export const metadata: Metadata = buildMetadata({
  title: "Todas as ferramentas",
  description: `Explore ${TOOLS.length}+ ferramentas online gratuitas para desenvolvedores: geradores e validadores de CPF/CNPJ, JSON, Base64, hash, UUID, senhas, QR Code e mais.`,
  path: "/ferramentas",
});

export default function FerramentasPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Ferramentas</h1>
        <p className="text-muted">{TOOLS.length} ferramentas, todas processadas no seu navegador.</p>
      </header>
      <ToolsExplorer />
      <AdSlot className="mx-auto max-w-3xl pt-6" />
    </div>
  );
}
