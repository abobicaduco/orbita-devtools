import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Política de privacidade do ${siteConfig.name} (LGPD e GDPR). Não coletamos dados pessoais; entenda os cookies de anúncios e seus direitos.`,
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
        <p className="text-sm text-muted">Última atualização: junho de 2026. Em conformidade com a LGPD (Lei 13.709/2018) e o GDPR (UE 2016/679).</p>
      </header>

      <Section title="1. Resumo">
        <p>
          O <strong className="text-white">{siteConfig.name}</strong> foi feito para <strong className="text-white">não coletar
          nem armazenar dados pessoais</strong>. As ferramentas funcionam inteiramente no seu navegador (client-side):
          o que você digita não é enviado aos nossos servidores nem fica salvo.
        </p>
      </Section>

      <Section title="2. Quem é o controlador">
        <p>
          Este site é mantido por <strong className="text-white">{siteConfig.author.name}</strong> (pessoa física).
          Como não há coleta de dados pessoais, não há tratamento de dados sob nossa responsabilidade direta —
          exceto os cookies de terceiros descritos abaixo. Contato:{" "}
          <a className="text-primary-glow underline" href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">GitHub do projeto</a>.
        </p>
      </Section>

      <Section title="3. Dados que NÃO coletamos">
        <p>Não há cadastro, login, banco de dados de usuários nem formulários que armazenem informações. Não rastreamos
        sua localização. As entradas das ferramentas (textos, documentos de teste, JSON etc.) são processadas localmente
        e descartadas ao fechar a página.</p>
      </Section>

      <Section title="4. Cookies e consentimento">
        <p>
          Para manter o site gratuito, exibimos anúncios via <strong className="text-white">Google AdSense</strong>,
          que usa cookies. <strong className="text-white">Se você recusar no banner de cookies, os anúncios exibidos
          passam a ser não personalizados</strong> — sem cookies de perfil de interesse.
        </p>
        <p>
          Você pode rever sua escolha a qualquer momento limpando os dados do site no navegador
          (o consentimento fica guardado localmente, na chave <code className="rounded bg-white/10 px-1 py-0.5">orbita-consent-v1</code>).
          Cookies estritamente necessários ao funcionamento não exigem consentimento.
        </p>
      </Section>

      <Section title="5. Google AdSense (terceiro)">
        <p>
          O Google e seus parceiros podem usar cookies para exibir anúncios com base em visitas a este e a outros sites.
          Saiba mais e gerencie suas preferências em{" "}
          <a className="text-primary-glow underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>{" "}
          e nas{" "}
          <a className="text-primary-glow underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>.
          Usuários no Espaço Econômico Europeu e Reino Unido recebem tratamento conforme as exigências de consentimento aplicáveis.
        </p>
      </Section>

      <Section title="6. Seus direitos (LGPD / GDPR)">
        <p>Você tem direito a acesso, correção, exclusão, portabilidade e revogação de consentimento. Como não armazenamos
        seus dados pessoais, não há registros nossos a corrigir ou excluir. Quanto aos cookies de anúncio, os direitos são
        exercidos diretamente junto ao Google e pelo banner de consentimento deste site.</p>
      </Section>

      <Section title="7. Links de afiliados">
        <p>A página de ofertas contém links de afiliados (ex.: Shopee, Amazon). Ao clicar e comprar, podemos receber
        comissão, sem custo extra para você. Esses links levam a sites de terceiros com suas próprias políticas.</p>
      </Section>

      <Section title="8. Segurança">
        <p>Aplicamos HTTPS obrigatório, cabeçalhos de segurança (CSP, HSTS, anti-clickjacking), WAF e proteção contra DDoS
        (Cloudflare). Como praticamente não há dados pessoais, a superfície de exposição é mínima.</p>
      </Section>

      <Section title="9. Alterações">
        <p>Esta política pode ser atualizada. Mudanças relevantes serão refletidas nesta página com nova data de atualização.</p>
      </Section>
    </div>
  );
}
