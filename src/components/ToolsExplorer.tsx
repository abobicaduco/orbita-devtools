"use client";
import { useMemo, useState } from "react";
import { TOOLS, CATEGORIES, type ToolCategory } from "@/lib/tools-meta";
import { ToolCard } from "./ToolCard";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export function ToolsExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ToolCategory | "Todas">("Todas");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return TOOLS.filter((t) => {
      const matchCat = cat === "Todas" || t.category === cat;
      const matchTerm =
        !term ||
        t.name.toLowerCase().includes(term) ||
        t.short.toLowerCase().includes(term) ||
        t.keywords.some((k) => k.includes(term));
      return matchCat && matchTerm;
    });
  }, [q, cat]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Icon name="Search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          className="input pl-11 py-3"
          placeholder="Buscar ferramenta… (ex.: cpf, json, senha)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar ferramenta"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["Todas", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              cat === c
                ? "border-primary/60 bg-primary/15 text-white"
                : "border-white/10 bg-white/5 text-muted hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">Nenhuma ferramenta encontrada para “{q}”.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
