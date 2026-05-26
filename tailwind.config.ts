import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
        },
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        tech: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        agent: {
          architecte: "#6366f1",
          moex: "#f59e0b",
          economiste: "#10b981",
          geometre: "#a855f7",
          "ingenieur-structure": "#ef4444",
          "expert-comptable-btp": "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(80% 60% at 50% 0%, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 60%)",
        "radial-tech":
          "radial-gradient(60% 40% at 80% 0%, rgba(56,189,248,0.14) 0%, rgba(56,189,248,0) 70%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up": "slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,158,11,0.25), 0 8px 32px -8px rgba(245,158,11,0.35)",
        "glow-sm": "0 0 0 1px rgba(245,158,11,0.20), 0 4px 16px -4px rgba(245,158,11,0.25)",
        "tech-glow": "0 0 0 1px rgba(56,189,248,0.25), 0 8px 32px -8px rgba(56,189,248,0.30)",
        card: "0 1px 2px rgba(0,0,0,0.3), 0 8px 32px -16px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
