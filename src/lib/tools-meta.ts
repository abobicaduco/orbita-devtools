/**
 * Registro central das ferramentas. Fonte de verdade para grid, busca,
 * rotas, metadata/SEO e sitemap. (Sem React — seguro no servidor.)
 */
export type ToolCategory =
  | "Brasil"
  | "Texto & Código"
  | "Geradores"
  | "Conversores"
  | "Segurança";

export interface ToolMeta {
  slug: string;
  name: string;
  /** Frase curta para o card. */
  short: string;
  /** Descrição longa para SEO (meta description / H1 supporting). */
  description: string;
  category: ToolCategory;
  keywords: string[];
  /** Nome do ícone lucide-react. */
  icon: string;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "gerador-cpf",
    name: "Gerador de CPF",
    short: "Gere CPFs válidos para testes.",
    description:
      "Gerador de CPF online e gratuito. Crie números de CPF válidos (com dígito verificador correto) para testar sistemas e formulários. Processado no navegador, sem armazenar dados.",
    category: "Brasil",
    keywords: ["gerador de cpf", "cpf válido", "gerar cpf para teste", "cpf online"],
    icon: "IdCard",
  },
  {
    slug: "validador-cpf",
    name: "Validador de CPF",
    short: "Verifique se um CPF é válido.",
    description:
      "Validador de CPF online. Confira se um número de CPF é válido conforme o dígito verificador. Rápido, gratuito e 100% no seu navegador.",
    category: "Brasil",
    keywords: ["validador de cpf", "validar cpf", "cpf é válido", "checar cpf"],
    icon: "ShieldCheck",
  },
  {
    slug: "gerador-cnpj",
    name: "Gerador de CNPJ",
    short: "Gere CNPJs válidos para testes.",
    description:
      "Gerador de CNPJ online e gratuito com dígitos verificadores corretos. Ideal para testar cadastros e integrações. Sem coletar nenhum dado.",
    category: "Brasil",
    keywords: ["gerador de cnpj", "cnpj válido", "gerar cnpj", "cnpj para teste"],
    icon: "Building2",
  },
  {
    slug: "validador-cnpj",
    name: "Validador de CNPJ",
    short: "Verifique se um CNPJ é válido.",
    description:
      "Validador de CNPJ online. Verifique a validade de um CNPJ pelo dígito verificador, gratuitamente e sem enviar dados a servidores.",
    category: "Brasil",
    keywords: ["validador de cnpj", "validar cnpj", "cnpj é válido"],
    icon: "ShieldCheck",
  },
  {
    slug: "gerador-pis",
    name: "Gerador de PIS/PASEP",
    short: "Gere números PIS/PASEP válidos.",
    description:
      "Gerador de PIS/PASEP/NIS online com dígito verificador válido, para uso em testes de sistemas. Processamento local no navegador.",
    category: "Brasil",
    keywords: ["gerador de pis", "pis pasep", "nis válido", "gerar pis"],
    icon: "BadgeCheck",
  },
  {
    slug: "gerador-pessoa",
    name: "Gerador de Pessoa",
    short: "Dados fictícios para testes.",
    description:
      "Gere dados fictícios de pessoa (nome, e-mail, telefone, endereço) para popular bancos de teste e mockups. Dados aleatórios e fictícios, nada real é coletado.",
    category: "Brasil",
    keywords: ["gerador de pessoa", "dados fake", "dados de teste", "gerador de nomes"],
    icon: "UserRound",
  },
  {
    slug: "gerador-uuid",
    name: "Gerador de UUID",
    short: "Gere UUID v4 aleatórios.",
    description:
      "Gerador de UUID (v4) online. Crie identificadores únicos universais para bancos de dados, APIs e sistemas distribuídos. Gratuito e no navegador.",
    category: "Geradores",
    keywords: ["gerador de uuid", "uuid v4", "guid online", "gerar uuid"],
    icon: "Fingerprint",
  },
  {
    slug: "gerador-senha",
    name: "Gerador de Senha",
    short: "Senhas fortes e aleatórias.",
    description:
      "Gerador de senhas fortes e seguras online. Configure tamanho, maiúsculas, números e símbolos. As senhas são geradas localmente com Web Crypto e nunca saem do seu navegador.",
    category: "Segurança",
    keywords: ["gerador de senha", "senha forte", "senha aleatória", "criar senha segura"],
    icon: "KeyRound",
  },
  {
    slug: "gerador-lorem",
    name: "Gerador de Lorem Ipsum",
    short: "Texto de preenchimento.",
    description:
      "Gerador de Lorem Ipsum online. Crie parágrafos de texto fictício para layouts e protótipos. Gratuito e instantâneo.",
    category: "Geradores",
    keywords: ["lorem ipsum", "gerador de texto", "texto de preenchimento", "placeholder text"],
    icon: "Type",
  },
  {
    slug: "gerador-qrcode",
    name: "Gerador de QR Code",
    short: "QR Code para qualquer texto/URL.",
    description:
      "Gerador de QR Code online e gratuito. Transforme links, textos e contatos em QR Code e baixe a imagem. Tudo gerado no navegador, sem servidores.",
    category: "Geradores",
    keywords: ["gerador de qr code", "qr code online", "criar qr code", "qrcode grátis"],
    icon: "QrCode",
  },
  {
    slug: "json-formatter",
    name: "Formatador de JSON",
    short: "Formate, valide e minifique JSON.",
    description:
      "Formatador e validador de JSON online. Idente, minifique e valide seu JSON com mensagens de erro claras. Rápido e 100% no navegador.",
    category: "Texto & Código",
    keywords: ["formatar json", "validar json", "json formatter", "json bonito", "minificar json"],
    icon: "Braces",
  },
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    short: "Codifique e decodifique Base64.",
    description:
      "Codificador e decodificador Base64 online. Converta texto para Base64 e vice-versa, com suporte a UTF-8. Gratuito e sem coletar dados.",
    category: "Texto & Código",
    keywords: ["base64", "codificar base64", "decodificar base64", "base64 encode decode"],
    icon: "Binary",
  },
  {
    slug: "url-encoder",
    name: "URL Encode/Decode",
    short: "Codifique e decodifique URLs.",
    description:
      "Codificador e decodificador de URL online. Faça encode/decode de componentes de URL (percent-encoding) de forma rápida e local.",
    category: "Texto & Código",
    keywords: ["url encode", "url decode", "codificar url", "percent encoding"],
    icon: "Link2",
  },
  {
    slug: "hash",
    name: "Gerador de Hash",
    short: "SHA-1, SHA-256, SHA-384, SHA-512.",
    description:
      "Gerador de hash online (SHA-1, SHA-256, SHA-384, SHA-512). Calcule o hash de qualquer texto usando a Web Crypto API, direto no navegador.",
    category: "Segurança",
    keywords: ["gerador de hash", "sha256 online", "sha1", "hash de texto", "checksum"],
    icon: "Hash",
  },
  {
    slug: "jwt-decoder",
    name: "Decodificador de JWT",
    short: "Leia o conteúdo de um JWT.",
    description:
      "Decodificador de JWT online. Veja o header e o payload de um JSON Web Token de forma legível. A decodificação acontece localmente — nenhum token é enviado a servidores.",
    category: "Segurança",
    keywords: ["jwt decoder", "decodificar jwt", "ler jwt", "json web token"],
    icon: "FileKey",
  },
  {
    slug: "conversor-cores",
    name: "Conversor de Cores",
    short: "HEX, RGB e HSL.",
    description:
      "Conversor de cores online entre HEX, RGB e HSL, com pré-visualização. Ideal para front-end e design. Gratuito e instantâneo.",
    category: "Conversores",
    keywords: ["conversor de cores", "hex para rgb", "rgb para hsl", "cores online"],
    icon: "Palette",
  },
  {
    slug: "conversor-base",
    name: "Conversor de Base Numérica",
    short: "Binário, decimal, hex e octal.",
    description:
      "Conversor de base numérica online — binário, octal, decimal e hexadecimal. Converta números entre bases instantaneamente.",
    category: "Conversores",
    keywords: ["conversor de base", "binário para decimal", "decimal para hexadecimal", "base numérica"],
    icon: "Binary",
  },
  {
    slug: "conversor-timestamp",
    name: "Conversor de Timestamp",
    short: "Unix timestamp ↔ data.",
    description:
      "Conversor de Unix timestamp para data e hora (e vice-versa), com fuso local e UTC. Ferramenta online gratuita para desenvolvedores.",
    category: "Conversores",
    keywords: ["timestamp unix", "converter timestamp", "epoch para data", "data para timestamp"],
    icon: "Clock",
  },
  {
    slug: "contador-texto",
    name: "Contador de Texto",
    short: "Caracteres, palavras e linhas.",
    description:
      "Contador de caracteres, palavras, linhas e parágrafos online. Útil para posts, metatags e limites de formulários. Tudo no navegador.",
    category: "Texto & Código",
    keywords: ["contador de caracteres", "contar palavras", "contador de texto", "quantas palavras"],
    icon: "Calculator",
  },
  {
    slug: "case-converter",
    name: "Conversor de Caixa",
    short: "camelCase, snake_case, kebab…",
    description:
      "Conversor de caixa de texto online: MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e kebab-case. Rápido e gratuito.",
    category: "Texto & Código",
    keywords: ["conversor de caixa", "camelcase", "snake case", "maiúsculas minúsculas"],
    icon: "CaseSensitive",
  },
  {
    slug: "regex-tester",
    name: "Testador de Regex",
    short: "Teste expressões regulares.",
    description:
      "Testador de expressões regulares (regex) online. Teste padrões JavaScript contra um texto e veja as correspondências em tempo real, localmente.",
    category: "Texto & Código",
    keywords: ["testador de regex", "regex online", "expressão regular", "regex tester"],
    icon: "Regex",
  },
];

export const CATEGORIES: ToolCategory[] = [
  "Brasil",
  "Texto & Código",
  "Geradores",
  "Conversores",
  "Segurança",
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
