"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * SmoothScrollHero — mécanique 21st.dev (révélation par clip-path + parallax) RÉADAPTÉE DA
 * « chrome argenté froid » : cadre silver (pas de noir), média traité N&B froid, et scroll
 * relatif au conteneur (fonctionne en milieu de page, pas seulement en tête). Un voile encre
 * optionnel garde le texte overlay lisible quand la fenêtre est ouverte. Reduced-motion → statique.
 */
interface SmoothScrollHeroProps {
  /** Hauteur de scroll de la section, en vh (défaut 220). */
  scrollVh?: number;
  /** Média plein cadre (desktop). */
  desktopImage: string;
  /** Média mobile (défaut = desktopImage). */
  mobileImage?: string;
  /** % de clip initial (fenêtre fermée) — défaut 25. */
  initialClipPercentage?: number;
  /** % de clip final (plein cadre) — défaut 75 → 100. */
  finalClipPercentage?: number;
  /** Traitement N&B froid du média (défaut true, DA). */
  grayscale?: boolean;
  /** Overlay révélé quand la fenêtre est ouverte (titre, etc.). */
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SmoothScrollHero({
  scrollVh = 220,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  grayscale = true,
  children,
  className = "",
  id,
}: SmoothScrollHeroProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const clipStart = useTransform(scrollYProgress, [0, 1], [initialClipPercentage, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [finalClipPercentage, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["150%", "100%"]);

  const overlayOpacity = useTransform(scrollYProgress, [0.35, 0.85], [0, 0.5]);
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.55, 0.85], [24, 0]);

  const mobile = mobileImage ?? desktopImage;
  const filter = grayscale ? "grayscale(1) contrast(1.05) brightness(0.98)" : undefined;

  // Reduced-motion : média statique plein cadre + overlay visible, sans animation.
  if (reduce) {
    return (
      <section id={id} className={`relative h-screen w-full overflow-hidden bg-section ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${desktopImage})`, filter }}
        />
        <div className="absolute inset-0 bg-ink/45" />
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        )}
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full bg-canvas ${className}`}
      style={{ height: `${scrollVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fenêtre chrome qui s'ouvre au scroll */}
        <motion.div
          className="absolute inset-0 bg-section"
          style={{ clipPath, willChange: "clip-path" }}
        >
          {/* Média mobile */}
          <motion.div
            className="absolute inset-0 bg-no-repeat bg-center md:hidden"
            style={{ backgroundImage: `url(${mobile})`, backgroundSize, filter }}
          />
          {/* Média desktop */}
          <motion.div
            className="absolute inset-0 hidden bg-no-repeat bg-center md:block"
            style={{ backgroundImage: `url(${desktopImage})`, backgroundSize, filter }}
          />
          {/* Voile encre pour la lisibilité du texte */}
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlayOpacity }} />
        </motion.div>

        {/* Overlay révélé */}
        {children && (
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
