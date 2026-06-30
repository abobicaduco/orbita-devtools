import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware de segurança leve (Edge).
 * Como o site NÃO armazena dados, o foco é barrar scanners/bots e reforçar headers.
 */

// Caminhos típicos de varredura/exploração → respondem 404 imediato.
const HONEYPOT = [
  "/wp-admin", "/wp-login.php", "/xmlrpc.php", "/.env", "/.git",
  "/phpmyadmin", "/administrator", "/.aws", "/config.php", "/vendor/",
  "/.well-known/security.txt.bak",
];

// User-agents de ferramentas de ataque conhecidas.
const BAD_UA = /(sqlmap|nikto|nmap|nuclei|masscan|acunetix|wpscan|dirbuster|gobuster)/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") || "";

  if (BAD_UA.test(ua) || HONEYPOT.some((p) => pathname.toLowerCase().startsWith(p))) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  // Ignora assets estáticos e otimizações internas do Next.
  matcher: ["/((?!_next/static|_next/image|favicon.svg|ads.txt|robots.txt|sitemap.xml).*)"],
};
