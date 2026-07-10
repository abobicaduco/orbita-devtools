"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const NAV = [
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/onibus-mogi", label: "Ônibus Mogi" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-space/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-nebula shadow-glow-purple">
            <Icon name="Rocket" className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={siteConfig.repo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg p-2 text-muted transition-colors hover:text-white"
            aria-label="Código no GitHub"
          >
            <Icon name="Github" className="h-5 w-5" />
          </a>
        </nav>

        <button
          className="rounded-lg p-2 text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <Icon name={open ? "X" : "Menu"} className="h-6 w-6" />
        </button>
      </div>

      <div className={cn("border-t border-white/10 md:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
