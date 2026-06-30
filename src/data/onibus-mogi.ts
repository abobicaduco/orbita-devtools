/**
 * Horários de ônibus de Mogi das Cruzes.
 * Dados extraídos do portal oficial da Prefeitura (Secretaria de Mobilidade e Trânsito)
 * — apenas HORÁRIOS, sem itinerários. Veja `onibus-mogi.json` (gerado por scraper).
 *
 * NENHUMA localização do usuário é coletada.
 */
import data from "./onibus-mogi.json";

export interface BusBlock {
  /** "Dia Útil" | "Sábado" | "Domingo/Feriado" */
  dia: string;
  /** Ponto de saída: "A" | "B" | "" */
  ponto: string;
  /** "Ida" | "Volta" | "" */
  sentido: string;
  horarios: string[];
}

export interface BusLine {
  linha: string;
  nome: string;
  empresa?: string;
  pontoA?: string;
  pontoB?: string;
  grade: BusBlock[];
}

export interface BusData {
  fonte: string;
  coletado_em: string;
  total_linhas: number;
  total_horarios: number;
  linhas: BusLine[];
}

const busData = data as BusData;

export const BUS_LINES: BusLine[] = busData.linhas;

/** Índice leve (sem grade) — seguro para enviar ao cliente. */
export const BUS_INDEX = busData.linhas.map((l) => ({ linha: l.linha, nome: l.nome }));

export const BUS_META = {
  fonte: busData.fonte,
  coletado_em: busData.coletado_em,
  total_linhas: busData.total_linhas,
  total_horarios: busData.total_horarios,
};

export function getLine(linha: string): BusLine | undefined {
  return busData.linhas.find((l) => l.linha.toLowerCase() === linha.toLowerCase());
}

export const BUS_DISCLAIMER =
  "Horários extraídos do portal oficial da Prefeitura de Mogi das Cruzes (Secretaria de Mobilidade e Trânsito), apenas para consulta. Podem sofrer alterações — confirme sempre na fonte oficial antes de se programar.";
