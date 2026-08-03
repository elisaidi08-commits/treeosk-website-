"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import RevealMask from "@/components/ui/RevealMask";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { WebGLFallback } from "@/components/ui/animated-gradient-utils/webgl-error-boundary";

/**
 * CTA — bloc sombre premium de clôture : fond WebGL animé (AnimatedGradient) réglé en
 * DÉSATURÉ (graphite → argent, lent et doux) pour rester luxe, pas néon. Reduced-motion →
 * dégradé statique. Texte on-dark.
 */
export default function CTA() {
  const t = useTranslations("cta");
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-28 text-on-dark md:py-40">
      {reduce ? (
        <WebGLFallback />
      ) : (
        <AnimatedGradient
          radius="0px"
          config={{
            preset: "custom",
            color1: "#0b0b0d",
            color2: "#20242a",
            color3: "#5a636b",
            rotation: -28,
            proportion: 52,
            scale: 0.5,
            speed: 6,
            distortion: 14,
            swirl: 34,
            swirlIterations: 8,
            softness: 100,
            offset: 120,
            shape: "Edge",
            shapeSize: 55,
          }}
          noise={{ opacity: 0.5, scale: 1 }}
        />
      )}

      {/* Voile pour la lisibilité du texte */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative z-10 max-w-3xl"
        >
          <h2 className="font-sans text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.03] tracking-[-0.03em] text-white">
            <RevealMask>{t("title")}</RevealMask>
          </h2>
          <p className="t-body-l mt-5 max-w-xl text-white/70">{t("subtitle")}</p>
          <div className="mt-9">
            <Button variant="brass" href="mailto:hello@treeosk.com">
              {t("button")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
