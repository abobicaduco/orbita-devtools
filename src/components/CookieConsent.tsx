"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

const KEY = "orbita-consent-v1";

type AdsGlobal = { requestNonPersonalizedAds?: number; push?: (v: unknown) => void };

/**
 * O script do AdSense é carregado sempre (no layout) — exigência prática da
 * revisão do Google. O consentimento controla apenas a personalização:
 * "Rejeitar" ativa anúncios NÃO personalizados (sem cookies de perfil).
 */
function applyConsent(val: "accepted" | "rejected") {
  const w = window as unknown as { adsbygoogle?: AdsGlobal };
  w.adsbygoogle = w.adsbygoogle || ({} as AdsGlobal);
  w.adsbygoogle.requestNonPersonalizedAds = val === "rejected" ? 1 : 0;
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (v === "accepted" || v === "rejected") applyConsent(v);
    else setShow(true);
  }, []);

  const choose = (val: "accepted" | "rejected") => {
    localStorage.setItem(KEY, val);
    applyConsent(val);
    setShow(false);
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
              Ao rejeitar, você continua vendo anúncios, mas <strong className="text-white">não personalizados</strong>.
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
