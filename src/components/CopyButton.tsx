"use client";
import { useState } from "react";
import { copyToClipboard, cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function CopyButton({ value, className, label = "Copiar" }: { value: string; className?: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      className={cn("btn-ghost", className)}
      onClick={async () => {
        if (!value) return;
        const ok = await copyToClipboard(value);
        if (ok) {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        }
      }}
    >
      <Icon name={done ? "Check" : "Copy"} className={cn("h-4 w-4", done && "text-ok")} />
      {done ? "Copiado!" : label}
    </button>
  );
}
