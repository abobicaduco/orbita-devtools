"use client";
import { useMemo, useState } from "react";
import { BUS_LINES } from "@/data/onibus-mogi";
import { Icon } from "./Icon";

export function BusExplorer() {
  const [q, setQ] = useState("");
  const lines = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return BUS_LINES;
    return BUS_LINES.filter((l) => l.numero.includes(t) || l.nome.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Icon name="Search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input className="input py-3 pl-11" placeholder="Buscar por número ou bairro… (ex.: 47, César de Souza)" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {lines.length === 0 ? (
        <p className="py-10 text-center text-muted">Nenhuma linha encontrada.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {lines.map((l) => (
            <div key={l.numero} className="card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-nebula font-display font-bold text-white">{l.numero}</span>
                <div>
                  <h3 className="font-display font-semibold leading-tight">{l.nome}</h3>
                  <p className="text-xs text-muted">{l.empresa} · {l.sentido}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {l.horarios.map((h) => (
                  <span key={h} className="rounded-lg border border-white/10 bg-base/60 px-2 py-1 font-mono text-xs text-primary-glow">{h}</span>
                ))}
              </div>
              {l.observacao && <p className="mt-3 text-xs text-warn">{l.observacao}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
