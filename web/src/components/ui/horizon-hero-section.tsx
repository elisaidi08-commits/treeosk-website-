"use client";

import * as React from "react";
import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Container from "@/components/layout/Container";
import SplitText from "@/components/ui/SplitText";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

/**
 * HorizonHero — hero PRODUIT-FIRST + IMMERSION AU SCROLL : typo massive à gauche (SplitText,
 * reste STABLE), produit 3D à droite (le kiosque). Fond = dégradé animé WebGL SUBTIL, clair en
 * light mode / graphite en dark (désaturé, premium). Au scroll : le kiosque grossit / avance,
 * le texte parallaxe, le fond s'intensifie. Reduced-motion → dégradé statique.
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
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme !== "dark";
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });

  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.82]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Config mémoïsée (ne change qu'au switch de thème → pas de ré-init WebGL à chaque render).
  const gradientConfig = useMemo(
    () =>
      ({
        preset: "custom" as const,
        color1: light ? "#e6e8ea" : "#0b0b0d",
        color2: light ? "#f5f6f8" : "#181a1e",
        color3: light ? "#ccd2d8" : "#2b3037",
        rotation: -22,
        proportion: 55,
        scale: 0.5,
        speed: 5,
        distortion: 12,
        swirl: 30,
        swirlIterations: 8,
        softness: 100,
        offset: 90,
        shape: "Edge" as const,
        shapeSize: 55,
      }),
    [light],
  );

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
      {/* Fond : dégradé animé subtil (clair en light, graphite en dark) */}
      <motion.div style={{ opacity: reduce ? 0.85 : bgOpacity }} className="pointer-events-none absolute inset-0 z-0">
        {reduce ? (
          <div
            className="absolute inset-0"
            style={{
              background: light
                ? "radial-gradient(120% 120% at 72% 18%, #f4f5f6, #e4e7ea 70%)"
                : "radial-gradient(120% 120% at 72% 18%, #17181b, #0b0b0d 70%)",
            }}
          />
        ) : (
          <AnimatedGradient config={gradientConfig} />
        )}
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
