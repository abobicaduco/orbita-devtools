<div align="center">

# 🛰️ AboBI Ferramentas

### Ferramentas para desenvolvedores, em um só lugar.

Um portal **open source** com dezenas de ferramentas online para devs — geradores e validadores de CPF/CNPJ, JSON, Base64, hash, UUID, senhas, QR Code e muito mais. Mais horários de ônibus de Mogi das Cruzes e uma vitrine de ofertas. **Tudo processado no navegador. Zero coleta de dados.**

[![CI](https://github.com/abobicaduco/orbita-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/abobicaduco/orbita-devtools/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-7C3AED.svg)

[Ver site](https://abobiferramentas.com) · [Ferramentas](https://abobiferramentas.com/ferramentas) · [Reportar bug](https://github.com/abobicaduco/orbita-devtools/issues)

</div>

---

## ✨ Destaques

- 🔒 **Privacidade por padrão** — as ferramentas rodam 100% no cliente; nada é enviado ou salvo.
- ⚡ **Rápido** — Next.js 15 (App Router) + React 19, SSG, fontes self-hosted.
- 🔎 **SEO de verdade** — metadata por página, OpenGraph, JSON-LD, `sitemap.xml`, `robots.txt`.
- 🛡️ **Seguro** — CSP rígida, HSTS, anti-clickjacking e middleware anti-scanner.
- 🎨 **Design próprio** — tema espacial (azul/roxo) com Tailwind.
- 📱 **Responsivo + PWA**.

## 🧰 Ferramentas

| Categoria | Ferramentas |
|---|---|
| **Brasil** | Gerador/Validador de CPF e CNPJ, Gerador de PIS/PASEP, Gerador de Pessoa (dados de teste) |
| **Texto & Código** | Formatador de JSON, Base64, URL encode/decode, Contador de texto, Conversor de caixa, Testador de Regex |
| **Geradores** | UUID, Senha forte, Lorem Ipsum, QR Code |
| **Conversores** | Cores (HEX/RGB/HSL), Base numérica, Timestamp |
| **Segurança** | Hash (SHA-1/256/384/512), Decodificador de JWT |

Além disso: **🚌 Horários de ônibus de Mogi das Cruzes** e **🏷️ Ofertas** (busca por número do produto → link de afiliado).

## 🚀 Rodando localmente

```bash
git clone https://github.com/abobicaduco/orbita-devtools.git
cd orbita-devtools
npm install
npm run dev     # http://localhost:3000
```

Scripts: `npm run build` · `npm run start` · `npm run typecheck` · `npm run lint`

## 🏗️ Stack

`Next.js 15` · `React 19` · `TypeScript` · `Tailwind CSS 3` · `lucide-react` · deploy na `Vercel`.

```
src/
├── app/         # rotas (App Router), SEO, sitemap, robots, manifest
├── components/  # UI (Header, Footer, cards, busca…)
├── lib/         # lógica pura das ferramentas + SEO + registro
├── tools/       # componentes interativos de cada ferramenta
└── data/        # ônibus de Mogi, ofertas
```

> Adicionar uma ferramenta? É só registrar em `src/lib/tools-meta.ts` e mapear o componente. Veja [CONTRIBUTING](./CONTRIBUTING.md).

## ⚙️ Configuração

Marca, domínio e AdSense ficam centralizados em [`src/site.config.ts`](./src/site.config.ts).

## 📦 Deploy

Deploy automático na **Vercel** a cada push na `main`. Para o seu próprio deploy: importe o repositório na Vercel, sem variáveis de ambiente obrigatórias.

## 📝 Licença

[MIT](./LICENSE) © Carlos Eduardo Costa Lima da Silva — [GitHub](https://github.com/abobicaduco) · [GitLab](https://gitlab.com/abobicarlo) · [LinkedIn](https://linkedin.com/in/carlos-da-silva20ba5740a)
