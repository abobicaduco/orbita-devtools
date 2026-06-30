"use client";
import { useMemo, useState } from "react";
import { OFERTAS } from "@/data/ofertas";
import { Icon } from "./Icon";

export function OfertasExplorer() {
  const [q, setQ] = useState("");
  const ofertas = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return OFERTAS;
    return OFERTAS.filter((o) => String(o.numero) === t || o.titulo.toLowerCase().includes(t) || o.categoria.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Icon name="Search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          className="input py-3 pl-11"
          placeholder="Digite o número do produto (ex.: 1) ou busque por nome…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          inputMode="text"
          aria-label="Buscar oferta"
        />
      </div>

      {ofertas.length === 0 ? (
        <p className="py-10 text-center text-muted">Nenhum produto encontrado para “{q}”.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ofertas.map((o) => (
            <a
              key={o.numero}
              href={o.link}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group card flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-glow-purple"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-nebula font-display font-bold text-white">#{o.numero}</span>
                <span className="label-hud">{o.loja}</span>
              </div>
              <div>
                <h3 className="font-display font-semibold leading-tight text-white">{o.titulo}</h3>
                <p className="mt-0.5 text-xs text-muted">{o.categoria}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm text-secondary-glow">
                Ver oferta <Icon name="ExternalLink" className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
