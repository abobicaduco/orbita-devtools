"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Result, ActionButton, Field } from "./_ui";
import { generateUUID, generatePassword, passwordStrength, generateLorem } from "@/lib/generators";
import { Icon } from "@/components/Icon";
import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

export function UuidGen() {
  const [list, setList] = useState<string[]>([]);
  const [n, setN] = useState(1);
  return (
    <div className="space-y-4">
      <Field label="Quantidade">
        <input type="number" min={1} max={50} className="input" value={n} onChange={(e) => setN(Math.max(1, Math.min(50, +e.target.value || 1)))} />
      </Field>
      <ActionButton onClick={() => setList(Array.from({ length: n }, generateUUID))}>Gerar UUID</ActionButton>
      {list.length > 0 && <Result value={list.join("\n")} multiline />}
    </div>
  );
}

export function SenhaGen() {
  const [opts, setOpts] = useState({ length: 16, upper: true, lower: true, numbers: true, symbols: true });
  const [pw, setPw] = useState("");
  const gen = () => setPw(generatePassword(opts));
  useEffect(() => { gen(); /* eslint-disable-next-line */ }, []);
  const strength = passwordStrength(pw);
  const toggles: [keyof typeof opts, string][] = [
    ["upper", "Maiúsculas"], ["lower", "Minúsculas"], ["numbers", "Números"], ["symbols", "Símbolos"],
  ];
  return (
    <div className="space-y-4">
      <Field label={`Tamanho: ${opts.length}`}>
        <input type="range" min={4} max={64} value={opts.length} onChange={(e) => setOpts({ ...opts, length: +e.target.value })} className="w-full accent-primary" />
      </Field>
      <div className="flex flex-wrap gap-3">
        {toggles.map(([k, label]) => (
          <label key={k} className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={opts[k] as boolean} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="accent-primary" />
            {label}
          </label>
        ))}
      </div>
      <ActionButton onClick={gen}>Gerar senha</ActionButton>
      {pw && (
        <div className="space-y-2">
          <Result value={pw} />
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className={cn("h-full transition-all", strength.score >= 4 ? "bg-ok" : strength.score >= 2 ? "bg-warn" : "bg-accent")} style={{ width: `${(strength.score / 5) * 100}%` }} />
            </div>
            <span className="text-xs text-muted">{strength.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function LoremGen() {
  const [n, setN] = useState(3);
  const [out, setOut] = useState("");
  return (
    <div className="space-y-4">
      <Field label="Parágrafos">
        <input type="number" min={1} max={20} className="input" value={n} onChange={(e) => setN(Math.max(1, Math.min(20, +e.target.value || 1)))} />
      </Field>
      <ActionButton onClick={() => setOut(generateLorem(n))}>Gerar texto</ActionButton>
      {out && <Result value={out} multiline />}
    </div>
  );
}

export function QrGen() {
  const [text, setText] = useState("https://");
  const [url, setUrl] = useState("");
  const gen = async () => {
    if (!text.trim()) return;
    const data = await QRCode.toDataURL(text, { width: 320, margin: 2, color: { dark: "#0A0E1A", light: "#ffffff" } });
    setUrl(data);
  };
  return (
    <div className="space-y-4">
      <Field label="Texto ou URL">
        <input className="input" value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <ActionButton onClick={gen}>Gerar QR Code</ActionButton>
      {url && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="QR Code gerado" width={256} height={256} className="rounded-xl border border-white/10 bg-white p-2" />
          <a href={url} download="qrcode.png" className="btn-ghost">
            <Icon name="Download" className="h-4 w-4" /> Baixar PNG
          </a>
        </div>
      )}
    </div>
  );
}
