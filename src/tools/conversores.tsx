"use client";
import { useMemo, useState } from "react";
import { Result, Field, Status } from "./_ui";

/* --------------------------- Cores ---------------------------- */
function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function CoresTool() {
  const [hex, setHex] = useState("#3B82F6");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = rgb ? rgbToHsl(...rgb) : null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={rgb ? hex : "#3B82F6"} onChange={(e) => setHex(e.target.value)} className="h-14 w-14 cursor-pointer rounded-xl border border-white/10 bg-transparent" />
        <div className="flex-1"><Field label="HEX"><input className="input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} /></Field></div>
      </div>
      {rgb && hsl ? (
        <div className="space-y-2">
          <Result value={`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`} />
          <Result value={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`} />
          <div className="h-16 rounded-xl border border-white/10" style={{ background: hex }} />
        </div>
      ) : (
        <Status ok={false}>HEX inválido. Use o formato #RRGGBB.</Status>
      )}
    </div>
  );
}

/* ----------------------- Base numérica ------------------------ */
export function BaseTool() {
  const [val, setVal] = useState("42");
  const [from, setFrom] = useState(10);
  const parsed = useMemo(() => {
    const n = parseInt(val.trim(), from);
    return isNaN(n) ? null : n;
  }, [val, from]);
  const bases: [string, number][] = [["Binário", 2], ["Octal", 8], ["Decimal", 10], ["Hexadecimal", 16]];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1"><Field label="Valor"><input className="input font-mono" value={val} onChange={(e) => setVal(e.target.value)} /></Field></div>
        <div className="w-40">
          <Field label="Base de origem">
            <select className="input" value={from} onChange={(e) => setFrom(+e.target.value)}>
              {bases.map(([l, b]) => <option key={b} value={b}>{l} ({b})</option>)}
            </select>
          </Field>
        </div>
      </div>
      {parsed === null ? (
        <Status ok={false}>Valor inválido para a base {from}.</Status>
      ) : (
        <div className="space-y-2">
          {bases.map(([label, b]) => (
            <div key={b} className="space-y-1"><p className="label-hud">{label}</p><Result value={parsed.toString(b).toUpperCase()} /></div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------- Timestamp -------------------------- */
export function TimestampTool() {
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [dt, setDt] = useState("");
  const fromTs = useMemo(() => {
    const n = Number(ts.trim());
    if (!ts.trim() || isNaN(n)) return null;
    const ms = ts.trim().length > 10 ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }, [ts]);
  const fromDt = useMemo(() => {
    if (!dt) return null;
    const d = new Date(dt);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  }, [dt]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Field label="Unix timestamp → data"><input className="input font-mono" value={ts} onChange={(e) => setTs(e.target.value)} /></Field>
        {fromTs ? (
          <div className="space-y-2">
            <Result value={fromTs.toLocaleString("pt-BR")} />
            <Result value={fromTs.toISOString()} />
          </div>
        ) : <Status ok={false}>Timestamp inválido.</Status>}
      </div>
      <div className="space-y-3">
        <Field label="Data → Unix timestamp"><input type="datetime-local" className="input" value={dt} onChange={(e) => setDt(e.target.value)} /></Field>
        {fromDt !== null && <Result value={String(fromDt)} />}
      </div>
    </div>
  );
}
