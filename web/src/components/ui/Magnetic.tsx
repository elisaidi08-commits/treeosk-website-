"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Effet magnétique : l'élément est attiré vers le curseur (spring), revient au repos
 * à la sortie. Adapté de la mécanique 21st « Magnetic » (ibelick), en framer-motion.
 * Respecte prefers-reduced-motion (désactivé).
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "inline-block",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 220, damping: 15, mass: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
