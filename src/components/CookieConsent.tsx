"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Icon } from "./Icon";

const KEY = "orbita-consent-v1";

/** Carrega o script do AdSense só depois do consentimento. */
function loadAds() {
  if (!siteConfig.adsense.enabled) return;
  if (document.getElementById("adsbygoogle-js")) return;
  const s = document.createElement("script");
  s.id = "adsbygoogle-js";
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.client}`;
  document.head.appendChild(s);
  (window as unknown as { __orbitaAds?: boolean }).__orbitaAds = true;
  window.dispatchEvent(new Event("orbita-consent-changed"));
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (v === "accepted") loadAds();
    else if (v !== "rejected") setShow(true);
  }, []);

  const choose = (val: "accepted" | "rejected") => {
    localStorage.setItem(KEY, val);
    setShow(false);
    if (val === "accepted") loadAds();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="container-page">
        <div className="card flex flex-col gap-4 border-primary/30 p-4 shadow-glow sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Icon name="Lock" className="mt-0.5 h-5 w-5 shrink-0 text-primary-glow" />
            <p className="text-sm text-muted">
              Usamos cookies apenas para exibir anúncios (Google AdSense) e manter o site gratuito.
              As ferramentas funcionam sem coletar seus dados. Veja a{" "}
              <Link href="/privacidade" className="text-primary-glow underline">política de privacidade</Link>.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => choose("rejected")} className="btn-ghost text-sm">Rejeitar</button>
            <button onClick={() => choose("accepted")} className="btn-primary text-sm">Aceitar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
