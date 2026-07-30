"use client";

import { useEffect, useState } from "react";
import { Sparkles, Minus } from "lucide-react";

/**
 * Toggle Safe / Immersive (façon Utopia Tokyo). Ajoute `data-motion="reduced"` sur <html>
 * → coupe les animations en boucle (marquee, halos, shimmer), masque le WebGL 3D et le
 * curseur custom (CSS dans globals). Persiste dans localStorage.
 */
export default function MotionToggle() {
  const [immersive, setImmersive] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("treeosk-motion");
    const on = saved !== "reduced";
    setImmersive(on);
    document.documentElement.dataset.motion = on ? "full" : "reduced";
  }, []);

  const toggle = () => {
    const next = !immersive;
    setImmersive(next);
    document.documentElement.dataset.motion = next ? "full" : "reduced";
    localStorage.setItem("treeosk-motion", next ? "full" : "reduced");
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={immersive}
      className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-pill border border-hairline/60 bg-canvas/70 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted backdrop-blur-md transition-colors hover:text-fg"
    >
      {immersive ? <Sparkles className="h-3.5 w-3.5 text-accent" /> : <Minus className="h-3.5 w-3.5" />}
      {immersive ? "Immersive" : "Safe"}
    </button>
  );
}
