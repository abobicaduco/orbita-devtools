"use client";
import { useMemo, useState } from "react";
import { Result, Field, Status } from "./_ui";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export function JsonFmt() {
  const [input, setInput] = useState('{"ola":"mundo","lista":[1,2,3]}');
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const run = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      setOut(JSON.stringify(parsed, null, minify ? 0 : 2));
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "JSON inválido");
      setOut("");
    }
  };
  return (
    <div className="space-y-4">
      <Field label="JSON de entrada">
        <textarea className="input min-h-[140px] font-mono text-sm" value={input} onChange={(e) => setInput(e.target.value)} />
      </Field>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => run(false)}><Icon name="Braces" className="h-4 w-4" /> Formatar</button>
        <button className="btn-ghost" onClick={() => run(true)}>Minificar</button>
      </div>
      {err && <Status ok={false}>{err}</Status>}
      {out && <Result value={out} multiline />}
    </div>
  );
}

export function Base64Tool() {
  const [text, setText] = useState("");
  const enc = useMemo(() => { try { return btoa(unescape(encodeURIComponent(text))); } catch { return ""; } }, [text]);
  const [b64, setB64] = useState("");
  const dec = useMemo(() => { try { return decodeURIComponent(escape(atob(b64.trim()))); } catch { return b64 ? "⚠ Base64 inválido" : ""; } }, [b64]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Field label="Texto → Base64">
          <textarea className="input min-h-[120px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite o texto" />
        </Field>
        <Result value={enc} multiline />
      </div>
      <div className="space-y-3">
        <Field label="Base64 → Texto">
          <textarea className="input min-h-[120px] font-mono text-sm" value={b64} onChange={(e) => setB64(e.target.value)} placeholder="Cole o Base64" />
        </Field>
        <Result value={dec} multiline />
      </div>
    </div>
  );
}

export function UrlTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const enc = useMemo(() => { try { return encodeURIComponent(a); } catch { return ""; } }, [a]);
  const dec = useMemo(() => { try { return decodeURIComponent(b); } catch { return b ? "⚠ URL inválida" : ""; } }, [b]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <Field label="Texto → URL encode"><textarea className="input min-h-[120px]" value={a} onChange={(e) => setA(e.target.value)} /></Field>
        <Result value={enc} multiline />
      </div>
      <div className="space-y-3">
        <Field label="URL → decode"><textarea className="input min-h-[120px] font-mono text-sm" value={b} onChange={(e) => setB(e.target.value)} /></Field>
        <Result value={dec} multiline />
      </div>
    </div>
  );
}

export function ContadorTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const paras = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
    return { chars, charsNoSpace, words, lines, paras };
  }, [text]);
  const cards: [string, number][] = [
    ["Caracteres", stats.chars], ["Sem espaços", stats.charsNoSpace],
    ["Palavras", stats.words], ["Linhas", stats.lines], ["Parágrafos", stats.paras],
  ];
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[180px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Cole ou digite seu texto…" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {cards.map(([label, v]) => (
          <div key={label} className="card p-4 text-center">
            <p className="font-display text-2xl font-bold gradient-text">{v}</p>
            <p className="label-hud mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const CASES: [string, (s: string) => string][] = [
  ["MAIÚSCULAS", (s) => s.toUpperCase()],
  ["minúsculas", (s) => s.toLowerCase()],
  ["Título", (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())],
  ["camelCase", (s) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase())],
  ["snake_case", (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")],
  ["kebab-case", (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")],
];

export function CaseTool() {
  const [text, setText] = useState("");
  return (
    <div className="space-y-4">
      <Field label="Texto"><textarea className="input min-h-[100px]" value={text} onChange={(e) => setText(e.target.value)} /></Field>
      <div className="space-y-3">
        {CASES.map(([label, fn]) => (
          <div key={label} className="space-y-1.5">
            <p className="label-hud">{label}</p>
            <Result value={text ? fn(text) : ""} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegexTool() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Pedido 123 enviado em 2026, total 456 reais.");
  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];
      return { ok: true, count: matches.length, matches: matches.map((m) => m[0]), re };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Regex inválida" };
    }
  }, [pattern, flags, text]);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1"><Field label="Padrão"><input className="input font-mono" value={pattern} onChange={(e) => setPattern(e.target.value)} /></Field></div>
        <div className="w-24"><Field label="Flags"><input className="input font-mono" value={flags} onChange={(e) => setFlags(e.target.value)} /></Field></div>
      </div>
      <Field label="Texto de teste"><textarea className="input min-h-[120px] font-mono text-sm" value={text} onChange={(e) => setText(e.target.value)} /></Field>
      {!result.ok ? (
        <Status ok={false}>{result.error}</Status>
      ) : (
        <div className="space-y-2">
          <Status ok={(result.count ?? 0) > 0}>{result.count} correspondência(s)</Status>
          {result.matches && result.matches.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {result.matches.map((m, i) => (
                <code key={i} className="rounded-lg border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-xs text-primary-glow">{m}</code>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
