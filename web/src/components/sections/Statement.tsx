"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import TextMarquee from "@/components/ui/text-marque";

const CHROME_VIDEO = "/media/textures/liquid-chrome.mp4";
const LINE = "Attract — Engage — Convert — ";

/**
 * Statement (philosophie) — fond vidéo chrome liquide (N&B froid) + voile pour la lisibilité,
 * et le triptyque « Attract — Engage — Convert » en GRAND sur 2 bandeaux qui défilent en sens
 * opposés (TextMarquee, réactif au scroll). Encre + gris, DA respectée.
 */
export default function Statement() {
  const t = useTranslations("statement");
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-canvas py-24 md:py-36">
      {/* Fond chrome (masqué en reduced-motion → fond silver simple) */}
      {!reduce && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.05) brightness(1.03)" }}
          >
            <source src={CHROME_VIDEO} type="video/mp4" />
          </video>
        </div>
      )}
      {/* Voile thémable : fond chrome au centre, fondu vers le silver en haut/bas + lisibilité */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-canvas via-canvas/55 to-canvas" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <p className="mx-auto mt-5 max-w-xl text-fg-muted">{t("text")}</p>
        </motion.div>
      </Container>

      {/* Triade en grand — pleine largeur, sens opposés */}
      <div className="relative z-10 mt-16 space-y-0 md:mt-24">
        <TextMarquee
          baseVelocity={-2.4}
          scrollDependent
          className="font-medium uppercase leading-[1] tracking-[-0.045em] text-fg text-[11vw]"
        >
          {LINE}
        </TextMarquee>
        <TextMarquee
          baseVelocity={2.4}
          scrollDependent
          className="font-medium uppercase leading-[1] tracking-[-0.045em] text-fg-subtle text-[11vw]"
        >
          {LINE}
        </TextMarquee>
      </div>
    </section>
  );
}
