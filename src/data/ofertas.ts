/**
 * Ofertas de afiliado — vitrine numerada.
 * Fluxo: no vídeo (Instagram/TikTok) cito "produto nº X"; a pessoa entra em /ofertas,
 * busca pelo número OU navega, clica e é redirecionada ao link de afiliado.
 *
 * Para popular de verdade: exportar `G:\My Drive\values_afiliates_offers.xlsx` para cá
 * (ou gerar este arquivo via script). `link` deve ser o seu link de afiliado.
 */
export type Loja = "Shopee" | "Amazon" | "Mercado Livre" | "AliExpress";

export interface Oferta {
  numero: number;
  titulo: string;
  categoria: string;
  loja: Loja;
  /** Link de afiliado — troque pelos seus. */
  link: string;
  imagem?: string;
  destaque?: boolean;
}

export const OFERTAS: Oferta[] = [
  { numero: 1, titulo: "Xbox Series S 1TB", categoria: "Games", loja: "Amazon", link: "https://www.amazon.com.br/", destaque: true },
  { numero: 2, titulo: "Controle Xbox Wireless", categoria: "Games", loja: "Amazon", link: "https://www.amazon.com.br/" },
  { numero: 3, titulo: "SSD NVMe 1TB", categoria: "Hardware", loja: "Shopee", link: "https://shopee.com.br/" },
  { numero: 4, titulo: "Teclado Mecânico RGB", categoria: "Periféricos", loja: "Shopee", link: "https://shopee.com.br/" },
  { numero: 5, titulo: "Headset Gamer 7.1", categoria: "Periféricos", loja: "Amazon", link: "https://www.amazon.com.br/" },
  { numero: 6, titulo: "Monitor 27\" 144Hz", categoria: "Hardware", loja: "Mercado Livre", link: "https://www.mercadolivre.com.br/" },
  { numero: 7, titulo: "Cadeira Gamer", categoria: "Setup", loja: "Shopee", link: "https://shopee.com.br/" },
  { numero: 8, titulo: "Webcam Full HD", categoria: "Periféricos", loja: "AliExpress", link: "https://pt.aliexpress.com/" },
];

export const OFERTAS_DISCLAIMER =
  "Como participante de programas de afiliados, posso receber comissão por compras qualificadas, sem custo extra para você.";
