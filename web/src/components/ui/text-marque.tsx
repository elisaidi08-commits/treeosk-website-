"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextMarquee — bandeau de texte défilant, réactif à la vitesse/direction du scroll
 * (21st.dev). Adapté : imports `motion/react` → `framer-motion`, `wrap` inliné (pas de
 * dépendance `@motionone/utils`), taille pilotée par `className`, reduced-motion → statique.
 */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface TextMarqueeProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

export default function TextMarquee({
  children,
  baseVelocity = -5,
  className,
  scrollDependent = false,
  delay = 0,
}: TextMarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasStarted.current = true;
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useAnimationFrame((_, delta) => {
    if (reduce || !hasStarted.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) directionFactor.current = -1;
      else if (velocityFactor.get() > 0) directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap gap-10 whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("block", className)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
