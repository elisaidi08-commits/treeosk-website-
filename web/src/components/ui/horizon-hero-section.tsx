"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import SplitText from "@/components/ui/SplitText";

/**
 * HorizonHero — hero PRODUIT-FIRST : typo massive à gauche (SplitText, révélée puis STABLE —
 * elle ne s'efface pas), produit 3D à droite (le kiosque qui tourne). Fond silver-chrome froid
 * + halos ambiants subtils. Le texte reste ancré (aucun scroll-scrub). Reduced-motion géré.
 */
interface HorizonHeroProps {
  overline?: string;
  /** Titre massif (révélé lettre par lettre). */
  title: string;
  subtitle?: string;
  /** Visuel produit (objet 3D). */
  visual?: React.ReactNode;
  /** CTA. */
  children?: React.ReactNode;
}

export function HorizonHero({ overline, title, subtitle, visual, children }: HorizonHeroProps) {
  const reduce = useReducedMotion();
  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas text-fg">
      {/* Halos ambiants froids (silver + fine touche d'acier) */}
      <div
        className="pointer-events-none absolute right-[8%] top-[12%] h-[62vh] w-[62vh] rounded-full opacity-70 blur-[120px] motion-safe:animate-[drift-a_18s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, rgba(244,245,247,0.9), transparent 66%)" }}
      />
      <div
        className="pointer-events-none absolute right-[24%] top-[40%] h-[46vh] w-[46vh] rounded-full opacity-45 blur-[130px] motion-safe:animate-[drift-b_24s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, rgba(58,90,122,0.12), transparent 64%)" }}
      />

      <Container className="relative z-10 grid min-h-screen items-center gap-6 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Colonne texte — massive, reste affichée */}
        <div className="order-2 max-w-2xl lg:order-1">
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
        </div>

        {/* Colonne produit — kiosque 3D qui tourne */}
        <div className="relative order-1 h-[42vh] w-full lg:order-2 lg:h-[76vh]">{visual}</div>
      </Container>

      {/* Indice de scroll */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-fg-subtle">
          <span className="h-px w-8 bg-fg-subtle/40" />
          Scroll
        </span>
      </div>
    </section>
  );
}
