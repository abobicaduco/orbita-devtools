"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

type LineIndex = { linha: string; nome: string };

export function BusExplorer({ lines }: { lines: LineIndex[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return lines;
    return lines.filter((l) => l.linha.toLowerCase().includes(t) || l.nome.toLowerCase().includes(t));
  }, [q, lines]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Icon name="Search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          className="input py-3 pl-11"
          placeholder="Buscar por número ou destino… (ex.: 47, Jundiapeba, Circular)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar linha de ônibus"
        />
      </div>

      <p className="text-sm text-muted">{filtered.length} de {lines.length} linhas</p>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-muted">Nenhuma linha encontrada.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <Link
              key={l.linha}
              href={`/onibus-mogi/${encodeURIComponent(l.linha)}`}
              className="group card flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-nebula font-display text-sm font-bold text-white">
                {l.linha}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">{l.nome}</span>
                <span className="text-xs text-muted">Ver horários</span>
              </span>
              <Icon name="ChevronRight" className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
