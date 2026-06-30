/**
 * Projetos/apps do Carlos (GitHub + GitLab) — snapshot versionado.
 * Atualize rodando o script de fetch (lê tokens do Drive) e commitando o JSON.
 */
import data from "./projetos.json";

export interface Projeto {
  fonte: "GitHub" | "GitLab";
  nome: string;
  full: string;
  descricao: string;
  url: string;
  homepage: string;
  linguagem: string;
  stars: number;
  topics: string[];
  atualizado: string;
}

interface ProjetosData {
  atualizado_em: string;
  total: number;
  projetos: Projeto[];
}

const d = data as ProjetosData;
export const PROJETOS: Projeto[] = d.projetos;
export const PROJETOS_META = { atualizado_em: d.atualizado_em, total: d.total };
