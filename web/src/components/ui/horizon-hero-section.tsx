"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/layout/Container";
import SplitText from "@/components/ui/SplitText";

/**
 * HorizonHero — hero PRODUIT-FIRST + IMMERSION AU SCROLL : typo massive à gauche (SplitText,
 * révélée puis STABLE — elle ne s'efface pas), produit 3D à droite (le kiosque). Quand on
 * scrolle, le kiosque grossit / avance (on « entre » dans le produit), le texte fait un léger
 * parallax et les halos s'intensifient → transition douce vers les expériences. Reduced-motion géré.
 */
interface HorizonHeroProps {
  overline?: string;
  title: string;
  subtitle?: string;
  visual?: React.ReactNode;
  children?: React.ReactNode;
}

export function HorizonHero({ overline, title, subtitle, visual, children }: HorizonHeroProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });

  // Immersion : le produit grossit et avance, le texte parallaxe, les halos montent.
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.82]);
  const haloOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section ref={rootRef} className="relative min-h-screen w-full overflow-hidden bg-canvas text-fg">
      {/* Halos ambiants froids (silver + fine touche d'acier), s'intensifient au scroll */}
      <motion.div style={{ opacity: reduce ? 0.7 : haloOpacity }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[8%] top-[12%] h-[62vh] w-[62vh] rounded-full blur-[120px] motion-safe:animate-[drift-a_18s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(244,245,247,0.9), transparent 66%)" }}
        />
        <div
          className="absolute right-[24%] top-[40%] h-[46vh] w-[46vh] rounded-full blur-[130px] motion-safe:animate-[drift-b_24s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(58,90,122,0.14), transparent 64%)" }}
        />
      </motion.div>

      <Container className="relative z-10 grid min-h-screen items-center gap-6 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Colonne texte — massive, reste affichée (léger parallax) */}
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          className="order-2 max-w-2xl lg:order-1"
        >
          {overline && (
            <motion.p {...fade(0)} className="t-overline text-fg-subtle">
              {overline}
            </motion.p>
          )}

          <h1 className="mt-6 font-sans text-[clamp(3rem,7.5vw,6rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <SplitText text={title} className="block" delay={0.35} />
          </h1>

          {subtitle && (
            <motion.p {...fade(0.6)} className="mt-8 max-w-md text-[15px] leading-relaxed text-fg-muted">
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div {...fade(0.75)} className="mt-11 flex flex-wrap items-center gap-6">
              {children}
            </motion.div>
          )}
        </motion.div>

        {/* Colonne produit — le kiosque grossit / avance au scroll (immersion) */}
        <motion.div
          style={reduce ? undefined : { scale: visualScale, y: visualY }}
          className="relative order-1 h-[42vh] w-full lg:order-2 lg:h-[76vh]"
        >
          {visual}
        </motion.div>
      </Container>

      {/* Indice de scroll — s'efface dès qu'on descend */}
      <motion.div
        style={{ opacity: reduce ? 1 : cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-fg-subtle">
          <span className="h-px w-8 bg-fg-subtle/40" />
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
