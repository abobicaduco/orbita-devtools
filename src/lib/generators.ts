/** Geradores diversos — UUID, senha, lorem ipsum, pessoa fake (BR). Tudo local. */
import { pick, randInt } from "./utils";

/* ----------------------------- UUID ---------------------------- */
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* ----------------------------- Senha --------------------------- */
export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePassword(opts: PasswordOptions): string {
  const sets: string[] = [];
  if (opts.lower) sets.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.upper) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.numbers) sets.push("0123456789");
  if (opts.symbols) sets.push("!@#$%^&*()-_=+[]{};:,.<>?");
  if (sets.length === 0) return "";
  const all = sets.join("");
  const bytes = new Uint32Array(opts.length);
  crypto.getRandomValues(bytes);
  const chars: string[] = [];
  // garante ao menos 1 de cada conjunto escolhido
  sets.forEach((set, i) => {
    chars.push(set[bytes[i % bytes.length] % set.length]);
  });
  for (let i = chars.length; i < opts.length; i++) {
    chars.push(all[bytes[i] % all.length]);
  }
  // embaralha
  for (let i = chars.length - 1; i > 0; i--) {
    const j = bytes[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, opts.length).join("");
}

export function passwordStrength(pw: string): { score: number; label: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 14) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  const labels = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte", "Excelente"];
  return { score, label: labels[Math.min(score, labels.length - 1)] };
}

/* --------------------------- Lorem Ipsum ----------------------- */
const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

export function generateLorem(paragraphs: number, sentencesPer = 5): string {
  const out: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPer; s++) {
      const len = randInt(6, 14);
      const words = Array.from({ length: len }, () => pick(LOREM_WORDS));
      const sentence = words.join(" ");
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
    }
    out.push(sentences.join(" "));
  }
  return out.join("\n\n");
}

/* ------------------------- Pessoa fake (BR) -------------------- */
const FIRST = ["Ana", "Bruno", "Carla", "Diego", "Eduardo", "Fernanda", "Gabriel", "Helena", "Igor", "Júlia", "Lucas", "Mariana", "Nicolas", "Olívia", "Pedro", "Rafaela", "Thiago", "Vitória"];
const LAST = ["Silva", "Santos", "Oliveira", "Souza", "Lima", "Costa", "Pereira", "Almeida", "Ferreira", "Rodrigues", "Gomes", "Martins", "Araújo", "Barbosa"];
const CITIES = ["Mogi das Cruzes/SP", "São Paulo/SP", "Suzano/SP", "Guarulhos/SP", "Rio de Janeiro/RJ", "Belo Horizonte/MG", "Curitiba/PR", "Salvador/BA"];
const STREETS = ["Rua das Acácias", "Av. Brasil", "Rua XV de Novembro", "Av. Paulista", "Rua dos Andradas", "Travessa do Sol", "Rua das Orquídeas"];

export interface FakePerson {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  nascimento: string;
}

export function generatePerson(): FakePerson {
  const first = pick(FIRST);
  const last = `${pick(LAST)} ${pick(LAST)}`;
  const nome = `${first} ${last}`;
  const slug = `${first}.${last.split(" ")[0]}`.toLowerCase();
  const ddd = pick(["11", "12", "13", "21", "31", "41", "71"]);
  const year = randInt(1960, 2005);
  const month = String(randInt(1, 12)).padStart(2, "0");
  const day = String(randInt(1, 28)).padStart(2, "0");
  return {
    nome,
    email: `${slug}${randInt(1, 99)}@exemplo.com`,
    telefone: `(${ddd}) 9${randInt(1000, 9999)}-${randInt(1000, 9999)}`,
    endereco: `${pick(STREETS)}, ${randInt(1, 1999)}`,
    cidade: pick(CITIES),
    nascimento: `${day}/${month}/${year}`,
  };
}
