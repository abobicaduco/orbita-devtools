import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** og:image gerada em runtime — tema espacial azul/roxo do site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% -10%, #1B2540 0%, #0A0E1A 70%)",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* estrelas */}
        {[
          [110, 90], [300, 200], [520, 60], [760, 150], [1020, 90],
          [180, 480], [420, 560], [700, 520], [950, 470], [1120, 560],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              borderRadius: 9999,
              background: i % 2 === 0 ? "#60A5FA" : "#A78BFA",
              opacity: 0.9,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
            }}
          >
            🚀
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#9BA3B4",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Ferramentas online gratuitas para devs — CPF/CNPJ, JSON, Base64, hash,
          senhas, QR Code e horários de ônibus de Mogi.
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 14,
            fontSize: 24,
            color: "#60A5FA",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(96,165,250,.4)",
              borderRadius: 9999,
              padding: "8px 24px",
              display: "flex",
            }}
          >
            100% no navegador
          </div>
          <div
            style={{
              border: "1px solid rgba(167,139,250,.4)",
              borderRadius: 9999,
              padding: "8px 24px",
              display: "flex",
              color: "#A78BFA",
            }}
          >
            Open source
          </div>
          <div
            style={{
              border: "1px solid rgba(230,237,243,.3)",
              borderRadius: 9999,
              padding: "8px 24px",
              display: "flex",
              color: "#E6EDF3",
            }}
          >
            abobiferramentas.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
