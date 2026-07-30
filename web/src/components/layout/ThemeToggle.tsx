"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export default function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Tout ce qui dépend du thème doit être gardé par `mounted`
  // (le serveur ne connaît pas le thème) → sinon mismatch d'hydratation.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        !mounted
          ? "Changer de thème"
          : isDark
            ? "Activer le thème clair"
            : "Activer le thème sombre"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-pill border transition-colors",
        onDark
          ? "border-chrome-300/40 text-chrome-300 hover:bg-white/10"
          : "border-hairline text-fg-muted hover:bg-chrome-100 hover:text-fg",
      )}
    >
      {/* Rendu neutre avant montage pour éviter le mismatch d'hydratation */}
      {mounted && isDark ? (
        // Soleil (passer en clair)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        // Lune (passer en sombre)
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
