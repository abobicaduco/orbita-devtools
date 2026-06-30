/**
 * Geração e validação de documentos brasileiros — CPF, CNPJ, PIS/PASEP.
 * Tudo síncrono e local. Nenhum dado é enviado a lugar nenhum.
 */
import { randInt } from "./utils";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

function dv(numbers: number[], startWeight: number): number {
  let sum = 0;
  let weight = startWeight;
  for (const n of numbers) {
    sum += n * weight;
    weight = weight === 2 ? startWeight : weight - 1;
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

/* ----------------------------- CPF ----------------------------- */
export function generateCPF(formatted = true): string {
  const base = Array.from({ length: 9 }, () => randInt(0, 9));
  const d1 = dv(base, 10);
  const d2 = dv([...base, d1], 11);
  const digits = [...base, d1, d2].join("");
  return formatted ? formatCPF(digits) : digits;
}

export function isValidCPF(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
  const nums = c.split("").map(Number);
  const d1 = dv(nums.slice(0, 9), 10);
  const d2 = dv(nums.slice(0, 10), 11);
  return d1 === nums[9] && d2 === nums[10];
}

export function formatCPF(value: string): string {
  const c = onlyDigits(value).padEnd(11, "0").slice(0, 11);
  return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`;
}

/* ----------------------------- CNPJ ---------------------------- */
export function generateCNPJ(formatted = true): string {
  const base = [...Array.from({ length: 8 }, () => randInt(0, 9)), 0, 0, 0, 1];
  const d1 = dv(base, 5);
  const d2 = dv([...base, d1], 6);
  const digits = [...base, d1, d2].join("");
  return formatted ? formatCNPJ(digits) : digits;
}

export function isValidCNPJ(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
  const nums = c.split("").map(Number);
  const d1 = dv(nums.slice(0, 12), 5);
  const d2 = dv(nums.slice(0, 13), 6);
  return d1 === nums[12] && d2 === nums[13];
}

export function formatCNPJ(value: string): string {
  const c = onlyDigits(value).padEnd(14, "0").slice(0, 14);
  return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12, 14)}`;
}

/* --------------------------- PIS/PASEP ------------------------- */
export function generatePIS(formatted = true): string {
  const base = Array.from({ length: 10 }, () => randInt(0, 9));
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = base.reduce((acc, n, i) => acc + n * weights[i], 0);
  const rest = sum % 11;
  const d = rest < 2 ? 0 : 11 - rest;
  const digits = [...base, d].join("");
  return formatted ? formatPIS(digits) : digits;
}

export function isValidPIS(value: string): boolean {
  const c = onlyDigits(value);
  if (c.length !== 11) return false;
  const nums = c.split("").map(Number);
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = nums.slice(0, 10).reduce((acc, n, i) => acc + n * weights[i], 0);
  const rest = sum % 11;
  const d = rest < 2 ? 0 : 11 - rest;
  return d === nums[10];
}

export function formatPIS(value: string): string {
  const c = onlyDigits(value).padEnd(11, "0").slice(0, 11);
  return `${c.slice(0, 3)}.${c.slice(3, 8)}.${c.slice(8, 10)}-${c.slice(10, 11)}`;
}
