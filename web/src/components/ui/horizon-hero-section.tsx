"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

/**
 * HorizonHero — hero ÉPURÉ : vidéo plein cadre (nos assets chrome, gradée N&B froid) dont
 * les clips s'enchaînent en boucle continue, + titre court révélé en « machine à écrire »
 * (TypewriterEffectSmooth, curseur acier). Volontairement peu de texte. La vidéo garde un
 * léger zoom/parallax au scroll. Reduced-motion → poster statique.
 */
interface HorizonHeroProps {
  /** Un ou plusieurs clips : ils s'enchaînent en continu (fondu) et bouclent à l'infini. */
  videoSrcs: string[];
  posterSrc?: string;
  overline?: string;
  /** Titre court, mot par mot (reveal typewriter). */
  headline: { text: string; className?: string }[];
  /** CTA. */
  children?: React.ReactNode;
  grayscale?: boolean;
}

export function HorizonHero({
  videoSrcs,
  posterSrc,
  overline,
  headline,
  children,
  grayscale = true,
}: HorizonHeroProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  const filter = grayscale ? "grayscale(1) contrast(1.06) brightness(0.98)" : undefined;
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
      {/* Vidéo plein cadre — les clips chrome s'enchaînent en continu (fondu), boucle infinie */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : videoScale, y: reduce ? 0 : videoY }}>
          {reduce ? (
            posterSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterSrc} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter }} />
            )
          ) : (
            <AnimatePresence>
              <motion.video
                key={index}
                src={videoSrcs[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter }}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={posterSrc}
                onEnded={() => setIndex((i) => (i + 1) % videoSrcs.length)}
              />
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Voiles thémables : lisibilité de la colonne texte (silver/sombre selon thème) */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-canvas via-canvas/68 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-canvas/72 via-transparent to-canvas/20" />

      {/* Contenu — épuré */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1248px] items-center px-6 py-32 md:px-10">
        <div className="w-full max-w-5xl">
          {overline && (
            <motion.p {...fade(0)} className="t-overline text-fg-subtle">
              {overline}
            </motion.p>
          )}

          <TypewriterEffectSmooth
            words={headline}
            className="mt-6 justify-start"
            textClassName="text-[clamp(1.6rem,5.4vw,3.75rem)] leading-[1.0] tracking-[-0.03em]"
            cursorClassName="h-[clamp(1.6rem,5.4vw,3.75rem)]"
          />

          {children && (
            <motion.div {...fade(0.5)} className="mt-12 flex flex-wrap items-center gap-6">
              {children}
            </motion.div>
          )}
        </div>
      </div>

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
