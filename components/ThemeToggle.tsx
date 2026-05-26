"use client";

import { useEffect, useState } from "react";

type ResolvedTheme = "light" | "dark";

function readResolvedTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(readResolvedTheme());

    // Synchronise si l'OS change (utile si pas de choix explicite stocké)
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      const stored = window.localStorage.getItem("theme");
      if (stored !== "light" && stored !== "dark") {
        setTheme(mql.matches ? "dark" : "light");
      }
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: ResolvedTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  // Évite le mismatch SSR/CSR — placeholder même taille
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Changer le thème"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated"
      >
        <span className="block h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isDark ? "Activer le mode clair" : "Activer le mode sombre"
      }
      title={isDark ? "Mode clair" : "Mode sombre"}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-foreground"
    >
      {isDark ? (
        /* Soleil — visible en dark, on passe en light au clic */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:rotate-45 group-hover:text-brand-400"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        /* Lune — visible en light, on passe en dark au clic */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:text-brand-500"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
