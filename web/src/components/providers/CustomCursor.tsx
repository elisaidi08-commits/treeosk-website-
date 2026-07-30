"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur custom — un point laiton (suivi exact) + un anneau qui suit en spring.
 * L'anneau grossit au survol des éléments interactifs. mix-blend-difference pour
 * rester lisible sur chrome clair comme sur fond sombre. Désactivé au tactile /
 * reduced-motion (le curseur natif reprend la main).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // survol interactif

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setActive(!!el.closest('a, button, [role="slider"], input, [data-cursor="grow"]'));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[300] hidden md:block" aria-hidden>
      {/* point exact */}
      <motion.div
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      {/* anneau spring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 1 : 0.7 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent"
      />
    </div>
  );
}
