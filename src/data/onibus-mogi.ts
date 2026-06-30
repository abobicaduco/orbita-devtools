/**
 * Horários de ônibus de Mogi das Cruzes (amostra editável).
 * Dados estáticos versionados — NENHUMA localização do usuário é coletada.
 * Atualize/expanda esta lista conforme fontes oficiais (ex.: prefeitura/concessionária).
 */
export interface BusLine {
  numero: string;
  nome: string;
  empresa: string;
  sentido: string;
  horarios: string[];
  observacao?: string;
}

export const BUS_LINES: BusLine[] = [
  {
    numero: "01",
    nome: "Centro ↔ Jardim Universo",
    empresa: "Radial Transporte",
    sentido: "Bairro → Centro",
    horarios: ["05:10", "05:50", "06:30", "07:10", "08:00", "12:00", "17:30", "19:00", "22:10"],
  },
  {
    numero: "10",
    nome: "Centro ↔ Braz Cubas",
    empresa: "Radial Transporte",
    sentido: "Centro → Bairro",
    horarios: ["05:20", "06:05", "06:45", "07:30", "11:40", "13:00", "18:10", "20:00"],
  },
  {
    numero: "22",
    nome: "Terminal ↔ Vila Industrial",
    empresa: "Radial Transporte",
    sentido: "Terminal → Bairro",
    horarios: ["05:00", "05:45", "06:25", "07:05", "12:15", "17:00", "18:40", "21:30"],
  },
  {
    numero: "35",
    nome: "Mogi ↔ Sabaúna (rural)",
    empresa: "Radial Transporte",
    sentido: "Centro → Sabaúna",
    horarios: ["06:00", "09:30", "12:30", "15:30", "18:30"],
    observacao: "Linha rural — confira feriados.",
  },
  {
    numero: "47",
    nome: "Centro ↔ César de Souza",
    empresa: "Radial Transporte",
    sentido: "Bairro → Centro",
    horarios: ["04:50", "05:30", "06:10", "06:50", "07:40", "12:10", "17:20", "19:20", "22:00"],
  },
  {
    numero: "63",
    nome: "Terminal ↔ Jundiapeba",
    empresa: "Radial Transporte",
    sentido: "Terminal → Jundiapeba",
    horarios: ["05:05", "05:55", "06:35", "07:15", "11:50", "13:10", "18:00", "20:30"],
  },
];

export const BUS_DISCLAIMER =
  "Horários meramente informativos e sujeitos a alteração pela concessionária. Confirme sempre na fonte oficial antes de se programar.";
