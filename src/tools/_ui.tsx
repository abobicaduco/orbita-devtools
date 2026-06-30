"use client";
import { CopyButton } from "@/components/CopyButton";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

/** Caixa de resultado monoespaçada com botão copiar. */
export function Result({ value, multiline, className }: { value: string; multiline?: boolean; className?: string }) {
  if (multiline) {
    return (
      <div className="space-y-2">
        <textarea readOnly value={value} className={cn("input min-h-[160px] font-mono text-sm", className)} />
        <div className="flex justify-end">
          <CopyButton value={value} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <code className="flex-1 truncate rounded-xl border border-white/10 bg-base/60 px-3.5 py-2.5 font-mono text-sm text-primary-glow">
        {value || "—"}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

/** Botão de ação (ex.: Gerar). */
export function ActionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn-primary">
      <Icon name="Sparkles" className="h-4 w-4" />
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="label-hud">{label}</span>
      {children}
    </label>
  );
}

export function Status({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
        ok ? "border-ok/40 bg-ok/10 text-ok" : "border-accent/40 bg-accent/10 text-accent"
      )}
    >
      <Icon name={ok ? "Check" : "X"} className="h-4 w-4" />
      {children}
    </div>
  );
}
