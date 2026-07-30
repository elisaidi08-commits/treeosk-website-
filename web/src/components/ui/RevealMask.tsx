"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Titre cinétique : le texte monte derrière un masque (overflow-hidden) à l'entrée
 * dans le viewport. On observe le conteneur STATIQUE (useInView sur le span externe),
 * pas l'enfant translaté — sinon le déclenchement rate et le titre reste masqué.
 * Reduced-motion géré globalement via MotionConfig (SmoothScroll).
 */
export default function RevealMask({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <span ref={ref} className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : { y: "115%" }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
