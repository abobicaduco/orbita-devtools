"use client";
import { useMemo, useState } from "react";
import { Result, ActionButton, Field, Status } from "./_ui";
import { randInt } from "@/lib/utils";

/* ---------------------- Cartão de teste (Luhn) ---------------------- */
function luhnCheck(numNoCheck: string): number {
  let sum = 0, alt = true;
  for (let i = numNoCheck.length - 1; i >= 0; i--) {
    let n = +numNoCheck[i];
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return (10 - (sum % 10)) % 10;
}
const BANDEIRAS = {
  Visa: { prefix: "4", len: 16 },
  Mastercard: { prefix: "5", len: 16 },
  Amex: { prefix: "37", len: 15 },
} as const;

export function CartaoGen() {
  const [band, setBand] = useState<keyof typeof BANDEIRAS>("Visa");
  const [card, setCard] = useState("");
  const gen = () => {
    const { prefix, len } = BANDEIRAS[band];
    let body = prefix;
    while (body.length < len - 1) body += randInt(0, 9);
    const full = body + luhnCheck(body);
    setCard(full.replace(/(.{4})/g, "$1 ").trim());
  };
  return (
    <div className="space-y-4">
      <Field label="Bandeira">
        <div className="flex flex-wrap gap-2">
          {Object.keys(BANDEIRAS).map((b) => (
            <button key={b} onClick={() => setBand(b as keyof typeof BANDEIRAS)} className={b === band ? "btn-primary" : "btn-ghost"}>{b}</button>
          ))}
        </div>
      </Field>
      <ActionButton onClick={gen}>Gerar cartão</ActionButton>
      {card && <Result value={card} />}
      <p className="text-xs text-muted">Números fictícios válidos pelo algoritmo de Luhn — apenas para testar formulários. Não funcionam em compras.</p>
    </div>
  );
}

/* ------------------------- Temperatura ------------------------- */
export function TemperaturaTool() {
  const [val, setVal] = useState("25");
  const [from, setFrom] = useState<"C" | "F" | "K">("C");
  const out = useMemo(() => {
    const n = parseFloat(val.replace(",", "."));
    if (isNaN(n)) return null;
    let c = n;
    if (from === "F") c = (n - 32) * 5 / 9;
    if (from === "K") c = n - 273.15;
    const f = c * 9 / 5 + 32;
    const k = c + 273.15;
    const r = (x: number) => (Math.round(x * 100) / 100).toString();
    return { c: r(c), f: r(f), k: r(k) };
  }, [val, from]);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1"><Field label="Valor"><input className="input font-mono" value={val} onChange={(e) => setVal(e.target.value)} /></Field></div>
        <div className="w-32"><Field label="Unidade">
          <select className="input" value={from} onChange={(e) => setFrom(e.target.value as "C" | "F" | "K")}>
            <option value="C">Celsius</option><option value="F">Fahrenheit</option><option value="K">Kelvin</option>
          </select>
        </Field></div>
      </div>
      {out ? (
        <div className="space-y-2">
          <Result value={`${out.c} °C`} /><Result value={`${out.f} °F`} /><Result value={`${out.k} K`} />
        </div>
      ) : <Status ok={false}>Valor inválido.</Status>}
    </div>
  );
}

/* ----------------------- Número aleatório ---------------------- */
export function NumeroGen() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [qtd, setQtd] = useState(1);
  const [out, setOut] = useState("");
  const gen = () => {
    const lo = Math.min(min, max), hi = Math.max(min, max);
    const list = Array.from({ length: Math.max(1, Math.min(100, qtd)) }, () => randInt(lo, hi));
    setOut(list.join(", "));
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Field label="Mínimo"><input type="number" className="input" value={min} onChange={(e) => setMin(+e.target.value)} /></Field>
        <Field label="Máximo"><input type="number" className="input" value={max} onChange={(e) => setMax(+e.target.value)} /></Field>
        <Field label="Quantidade"><input type="number" min={1} max={100} className="input" value={qtd} onChange={(e) => setQtd(+e.target.value)} /></Field>
      </div>
      <ActionButton onClick={gen}>Sortear</ActionButton>
      {out && <Result value={out} />}
    </div>
  );
}

/* ------------------------ Texto ↔ Binário ---------------------- */
export function BinarioTool() {
  const [text, setText] = useState("");
  const [bin, setBin] = useState("");
  const toBin = useMemo(() => text ? [...text].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ") : "", [text]);
  const toText = useMemo(() => {
    if (!bin.trim()) return "";
    try { return bin.trim().split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join(""); }
    catch { return "⚠ binário inválido"; }
  }, [bin]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Field label="Texto → Binário"><textarea className="input min-h-[100px]" value={text} onChange={(e) => setText(e.target.value)} /></Field>
        <Result value={toBin} multiline />
      </div>
      <div className="space-y-3">
        <Field label="Binário → Texto"><textarea className="input min-h-[100px] font-mono text-sm" value={bin} onChange={(e) => setBin(e.target.value)} placeholder="01001000 01101001" /></Field>
        <Result value={toText} multiline />
      </div>
    </div>
  );
}

/* ------------------------ Números romanos ---------------------- */
const ROMAN: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
function toRoman(n: number): string { let r = ""; for (const [v, s] of ROMAN) while (n >= v) { r += s; n -= v; } return r; }
function fromRoman(s: string): number | null {
  const m: Record<string, number> = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };
  let sum = 0, prev = 0;
  for (const ch of s.toUpperCase()) { const v = m[ch]; if (!v) return null; sum += v > prev ? v - 2 * prev : v; prev = v; }
  return toRoman(sum) === s.toUpperCase() ? sum : null;
}

export function RomanosTool() {
  const [dec, setDec] = useState("2026");
  const [rom, setRom] = useState("");
  const decToRom = useMemo(() => { const n = parseInt(dec); return n > 0 && n < 4000 ? toRoman(n) : ""; }, [dec]);
  const romToDec = useMemo(() => rom ? fromRoman(rom) : null, [rom]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Field label="Decimal → Romano (1–3999)"><input className="input font-mono" value={dec} onChange={(e) => setDec(e.target.value)} /></Field>
        {decToRom ? <Result value={decToRom} /> : <Status ok={false}>Use 1 a 3999.</Status>}
      </div>
      <div className="space-y-3">
        <Field label="Romano → Decimal"><input className="input font-mono uppercase" value={rom} onChange={(e) => setRom(e.target.value)} placeholder="MMXXVI" /></Field>
        {rom && (romToDec ? <Result value={String(romToDec)} /> : <Status ok={false}>Romano inválido.</Status>)}
      </div>
    </div>
  );
}

/* ----------------------- Calculadora de datas ------------------ */
export function DatasTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [nasc, setNasc] = useState("");
  const diff = useMemo(() => {
    if (!a || !b) return null;
    const d = Math.abs(new Date(b).getTime() - new Date(a).getTime());
    return Math.round(d / 86400000);
  }, [a, b]);
  const idade = useMemo(() => {
    if (!nasc) return null;
    const n = new Date(nasc), t = new Date();
    let age = t.getFullYear() - n.getFullYear();
    const m = t.getMonth() - n.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < n.getDate())) age--;
    return age >= 0 ? age : null;
  }, [nasc]);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="label-hud">Dias entre duas datas</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="date" className="input" value={a} onChange={(e) => setA(e.target.value)} />
          <input type="date" className="input" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
        {diff !== null && <Result value={`${diff} dia(s)`} />}
      </div>
      <div className="space-y-3">
        <p className="label-hud">Idade a partir do nascimento</p>
        <input type="date" className="input" value={nasc} onChange={(e) => setNasc(e.target.value)} />
        {idade !== null && <Result value={`${idade} anos`} />}
      </div>
    </div>
  );
}
