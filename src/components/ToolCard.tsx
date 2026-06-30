import Link from "next/link";
import { Icon } from "./Icon";
import type { ToolMeta } from "@/lib/tools-meta";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link
      href={`/ferramentas/${tool.slug}`}
      className="group card flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-base/60 text-primary-glow transition-colors group-hover:border-primary/40">
          <Icon name={tool.icon} className="h-5 w-5" />
        </span>
        <span className="label-hud">{tool.category}</span>
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-white">{tool.name}</h3>
        <p className="mt-1 text-sm text-muted">{tool.short}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm text-primary-glow opacity-0 transition-opacity group-hover:opacity-100">
        Abrir <Icon name="ArrowRight" className="h-4 w-4" />
      </span>
    </Link>
  );
}
