/**
 * Configuração central do site — troque a marca/domínio aqui em 1 lugar.
 */
export const siteConfig = {
  name: "AboBI Ferramentas",
  shortName: "AboBI",
  tagline: "Ferramentas para desenvolvedores",
  description:
    "AboBI Ferramentas reúne dezenas de ferramentas online gratuitas para desenvolvedores — geradores e validadores de CPF/CNPJ, JSON, Base64, hash, UUID, senhas, QR Code e muito mais. Tudo processado no seu navegador, sem armazenar nenhum dado. Open source.",
  // Domínio principal de produção.
  url: "https://abobiferramentas.com",
  locale: "pt-BR",
  author: {
    name: "Carlos Eduardo Costa Lima da Silva",
    handle: "abobicaduco",
    github: "https://github.com/abobicaduco",
    gitlab: "https://gitlab.com/abobicarlo",
    linkedin: "https://linkedin.com/in/carlos-da-silva20ba5740a",
  },
  repo: {
    github: "https://github.com/abobicaduco/orbita-devtools",
    gitlab: "https://gitlab.com/abobicarlo/orbita-devtools",
  },
  // Google AdSense — script é injetado no <head> via layout.
  adsense: {
    client: "ca-pub-7169685901436487",
    enabled: true,
    // Bloco de display responsivo, reutilizado nos <AdSlot /> pelo site.
    slotDisplay: "2608875673",
  },
  keywords: [
    "ferramentas para desenvolvedores",
    "gerador de cpf",
    "validador de cpf",
    "gerador de cnpj",
    "formatador json",
    "base64 online",
    "gerador de senha",
    "gerador de uuid",
    "qr code online",
    "horário de ônibus mogi das cruzes",
    "ferramentas online grátis",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
