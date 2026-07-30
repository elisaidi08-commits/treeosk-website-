"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Transition de page — wipe chrome (façon Barba.js) au changement de route/langue :
 * un panneau métallique couvre par le bas puis découvre par le haut, avec un filet laiton.
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      setShow(true);
      const t = setTimeout(() => setShow(false), 620);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="route-wipe"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[350] flex items-center justify-center bg-graphite-metal"
        >
          <span className="text-[11px] uppercase tracking-[0.5em] text-on-dark/80">Treeosk</span>
          <span className="absolute bottom-0 left-0 h-px w-full bg-accent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
