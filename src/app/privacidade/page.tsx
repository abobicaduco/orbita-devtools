import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Política de privacidade do ${siteConfig.name}. Não coletamos nem armazenamos dados pessoais. Saiba como funcionam os cookies de anúncios de terceiros.`,
  path: "/privacidade",
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
    <div className="space-y-2 text-sm leading-relaxed text-muted">{children}</div>
  </section>
);

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Política de Privacidade</h1>
        <p className="text-sm text-muted">Última atualização: junho de 2026.</p>
      </header>

      <Section title="Resumo">
        <p>
          O <strong className="text-white">{siteConfig.name}</strong> foi construído para <strong className="text-white">não coletar
          nem armazenar dados pessoais</strong>. As ferramentas funcionam inteiramente no seu navegador
          (client-side): o que você digita não é enviado aos nossos servidores e não fica salvo.
        </p>
      </Section>

      <Section title="Dados que NÃO coletamos">
        <p>Não temos cadastro, login, banco de dados de usuários nem formulários de contato que armazenem informações.
        Não rastreamos sua localização. As entradas das ferramentas (textos, CPFs de teste, JSON etc.) são processadas
        localmente e descartadas ao fechar a página.</p>
      </Section>

      <Section title="Cookies e anúncios (Google AdSense)">
        <p>
          Para manter o site gratuito, exibimos anúncios via <strong className="text-white">Google AdSense</strong>.
          O Google e seus parceiros podem usar cookies para exibir anúncios com base em visitas a este e a outros sites.
        </p>
        <p>
          Você pode desativar a publicidade personalizada nas <a className="text-primary-glow underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>{" "}
          e saber mais em <a className="text-primary-glow underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.
        </p>
      </Section>

      <Section title="Links de afiliados">
        <p>A página de ofertas contém links de afiliados (ex.: Shopee, Amazon). Ao clicar e comprar, podemos receber
        comissão, sem custo extra para você. Esses links levam a sites de terceiros com suas próprias políticas.</p>
      </Section>

      <Section title="Segurança">
        <p>Aplicamos cabeçalhos de segurança (CSP, HSTS, proteção contra clickjacking) e não mantemos dados sensíveis,
        reduzindo a superfície de ataque a praticamente zero.</p>
      </Section>

      <Section title="Contato">
        <p>Dúvidas sobre privacidade? Fale pelo <a className="text-primary-glow underline" href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">GitHub</a> do projeto.</p>
      </Section>
    </div>
  );
}
