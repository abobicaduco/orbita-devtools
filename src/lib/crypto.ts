/** Hashes via Web Crypto API — roda 100% no navegador. */
export type HashAlgo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export async function hashText(text: string, algo: HashAlgo): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Decodifica um JWT (sem validar assinatura) — apenas exibe o conteúdo. */
export function decodeJWT(token: string): {
  header: unknown;
  payload: unknown;
  error?: string;
} {
  try {
    const parts = token.trim().split(".");
    if (parts.length < 2) return { header: null, payload: null, error: "Formato inválido (esperado header.payload.signature)." };
    const decode = (seg: string) => {
      const b64 = seg.replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=");
      return JSON.parse(decodeURIComponent(escape(atob(pad))));
    };
    return { header: decode(parts[0]), payload: decode(parts[1]) };
  } catch {
    return { header: null, payload: null, error: "Não foi possível decodificar o token." };
  }
}
