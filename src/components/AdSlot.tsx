"use client";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/site.config";

/**
 * Slot de anúncio AdSense (display responsivo).
 * Só renderiza se adsense estiver habilitado. Não coleta dados por conta própria.
 */
export function AdSlot({ slot, className }: { slot?: string; className?: string }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!siteConfig.adsense.enabled) return;
    try {
      // @ts-expect-error - adsbygoogle injetado pelo script global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignora */
    }
  }, []);

  if (!siteConfig.adsense.enabled) return null;

  return (
    <div className={className} aria-hidden>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={siteConfig.adsense.client}
        data-ad-slot={slot ?? ""}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
