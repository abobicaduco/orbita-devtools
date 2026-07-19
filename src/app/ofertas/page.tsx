import type { Metadata } from "next";
import { OfertasExplorer } from "@/components/OfertasExplorer";
import { OFERTAS_DISCLAIMER } from "@/data/ofertas";
import { Icon } from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Ofertas — busque pelo número do produto",
    description:
      "Viu um produto no vídeo? Digite o número aqui e vá direto à oferta. Vitrine de produtos recomendados com links para Shopee, Amazon e mais.",
    path: "/ofertas",
    keywords: ["ofertas", "produto do vídeo", "link de afiliado", "achados"],
  }),
  // Página utilitária do fluxo dos vídeos (Instagram/TikTok) — fora do índice
  // até a vitrine ter produtos e links de afiliado reais.
  robots: { index: false, follow: true },
};

export default function OfertasPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Ofertas</h1>
        <p className="max-w-2xl text-muted">
          Viu um produto num vídeo no Instagram ou TikTok? Ele tem um <strong className="text-white">número</strong>.
          Digite o número na busca abaixo (ex.: <code className="rounded bg-white/10 px-1.5 py-0.5 text-primary-glow">1</code>)
          ou navegue pela lista e clique para ir direto à loja.
        </p>
      </header>

      <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary-glow">
        <Icon name="Sparkles" className="h-4 w-4" />
        Dica: cada produto tem um número fixo — é o mesmo que aparece no vídeo.
      </div>

      <OfertasExplorer />

      <section className="space-y-3 text-sm leading-relaxed text-muted">
        <h2 className="font-display text-lg font-semibold text-white">Como funciona</h2>
        <p>
          Esta vitrine reúne produtos que aparecem nos vídeos e conteúdos do caducosilva. Cada produto recebe um
          número fixo — quando ele é citado num vídeo, basta vir aqui e digitar o número para encontrar o
          link direto da loja (Shopee, Amazon, Mercado Livre ou AliExpress). A compra acontece
          inteiramente no site da loja, com os preços, o frete e as garantias dela.
        </p>
        <p>
          Nós não vendemos nada diretamente, não processamos pagamentos e não coletamos dados de quem
          navega por aqui. Os preços e a disponibilidade podem mudar a qualquer momento — confira sempre
          na página da loja antes de comprar.
        </p>
        <h2 className="font-display text-lg font-semibold text-white">Transparência (divulgação de afiliados)</h2>
        <p>{OFERTAS_DISCLAIMER} Isso não muda o preço que você paga: a comissão é paga pela loja como
        forma de divulgação. Só recomendamos categorias de produto que fazem sentido para o público do
        canal — hardware, periféricos, setup e games.</p>
      </section>
    </div>
  );
}
