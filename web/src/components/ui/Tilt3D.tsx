"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Carte à inclinaison 3D : suit le curseur en perspective (spring) + reveal au scroll.
 * Remplace un motion.article/li. Respecte prefers-reduced-motion (pas d'inclinaison).
 */
export default function Tilt3D({
  children,
  className,
  delay = 0,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);
  const rotateX = useSpring(rX, { stiffness: 250, damping: 20, mass: 0.4 });
  const rotateY = useSpring(rY, { stiffness: 250, damping: 20, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rY.set(px * max * 2);
    rX.set(-py * max * 2);
  };
  const reset = () => {
    rX.set(0);
    rY.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
