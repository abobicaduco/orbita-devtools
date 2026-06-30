"use client";
import { useEffect, useState } from "react";
import { Result, Field, Status } from "./_ui";
import { hashText, decodeJWT, type HashAlgo } from "@/lib/crypto";

const ALGOS: HashAlgo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function HashTool() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<HashAlgo>("SHA-256");
  const [hash, setHash] = useState("");
  useEffect(() => {
    let active = true;
    if (!text) { setHash(""); return; }
    hashText(text, algo).then((h) => { if (active) setHash(h); });
    return () => { active = false; };
  }, [text, algo]);
  return (
    <div className="space-y-4">
      <Field label="Texto">
        <textarea className="input min-h-[120px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite o texto para gerar o hash" />
      </Field>
      <Field label="Algoritmo">
        <div className="flex flex-wrap gap-2">
          {ALGOS.map((a) => (
            <button key={a} onClick={() => setAlgo(a)} className={a === algo ? "btn-primary" : "btn-ghost"}>{a}</button>
          ))}
        </div>
      </Field>
      {hash && <Result value={hash} multiline />}
    </div>
  );
}

export function JwtTool() {
  const [token, setToken] = useState("");
  const decoded = token.trim() ? decodeJWT(token) : null;
  return (
    <div className="space-y-4">
      <Field label="JWT">
        <textarea className="input min-h-[100px] font-mono text-xs" value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOi..." />
      </Field>
      {decoded?.error && <Status ok={false}>{decoded.error}</Status>}
      {decoded && !decoded.error && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <p className="label-hud">Header</p>
            <Result value={JSON.stringify(decoded.header, null, 2)} multiline />
          </div>
          <div className="space-y-1.5">
            <p className="label-hud">Payload</p>
            <Result value={JSON.stringify(decoded.payload, null, 2)} multiline />
          </div>
        </div>
      )}
      <p className="text-xs text-muted">A assinatura não é validada — esta ferramenta apenas decodifica o conteúdo, localmente.</p>
    </div>
  );
}
