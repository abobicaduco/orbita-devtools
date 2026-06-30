import type { NextConfig } from "next";

/**
 * Content Security Policy — endurecida, mas compatível com Google AdSense.
 * Como o site não armazena dados, a CSP é a principal barreira contra XSS/clickjacking.
 */
const csp = [
  "default-src 'self'",
  // AdSense exige inline/eval + domínios Google
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.googleadservices.com https://*.doubleclick.net https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google-analytics.com https://pagead2.googlesyndication.com",
  "frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/ads.txt",
        headers: [{ key: "Content-Type", value: "text/plain" }],
      },
    ];
  },
};

export default nextConfig;
