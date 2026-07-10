import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // "space" (não "base") — `text-base` é tamanho de fonte no Tailwind;
        // uma cor chamada `base` sobrescreve e deixa o texto quase preto.
        space: "#0A0E1A",
        surface: "#131A2A",
        elevated: "#1B2540",
        primary: {
          DEFAULT: "#3B82F6",
          deep: "#2563EB",
          glow: "#60A5FA",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          deep: "#7C3AED",
          glow: "#A78BFA",
        },
        accent: {
          DEFAULT: "#EF4444",
          deep: "#DC2626",
        },
        muted: "#8B949E",
        ok: "#10B981",
        warn: "#F59E0B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        nebula: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        cosmos: "radial-gradient(ellipse at 50% -10%, #1B2540 0%, #0A0E1A 70%)",
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(59,130,246,.35)",
        "glow-purple": "0 0 24px -4px rgba(139,92,246,.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up .4s ease both",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
