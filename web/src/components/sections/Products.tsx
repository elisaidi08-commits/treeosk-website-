"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";

/**
 * Products / Expériences — SCROLLYTELLING immersif (brief refonte) : on défile les 6
 * expériences une par une ; le TEXTE reste fixé à gauche (lisible tout du long), le VISUEL
 * à droite se construit (reveal), et l'UI se teinte de la COULEUR de l'expérience active.
 * Base neutre silver-chrome ; la couleur n'apparaît que par expérience. Reduced-motion → liste.
 */
type Experience = { slug: string; accent: string };

const EXPERIENCES: Experience[] = [
  { slug: "photobooth", accent: "#A8607A" },
  { slug: "engraving", accent: "#B8925A" },
  { slug: "gaming", accent: "#4A6E9E" },
  { slug: "scent", accent: "#5E8B72" },
  { slug: "kiosk-hostess", accent: "#5B6B7A" },
  { slug: "custom", accent: "#6E5A86" },
];

export default function Products() {
  const t = useTranslations("experiences");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(EXPERIENCES.length - 1, Math.max(0, Math.floor(v * EXPERIENCES.length)));
    setActive(i);
  });

  // --- Reduced-motion : liste statique simple (pas de scroll pinné) -------------------------
  if (reduce) {
    return (
      <section id="products" className="bg-canvas py-20 md:py-28">
        <Container>
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <h2 className="mt-4 max-w-2xl font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            {t("title")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((e) => (
              <div key={e.slug} className="overflow-hidden rounded-[10px] border border-hairline bg-surface">
                <div className="relative aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/media/experiences/${e.slug}.png`} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <span className="block h-[2px] w-8" style={{ background: e.accent }} />
                  <h3 className="mt-3 font-sans text-xl font-medium text-fg">{t(`items.${e.slug}.name`)}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t(`items.${e.slug}.tagline`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  const exp = EXPERIENCES[active];
  const counter = `${String(active + 1).padStart(2, "0")} / ${String(EXPERIENCES.length).padStart(2, "0")}`;

  return (
    <section
      id="products"
      ref={ref}
      className="relative bg-canvas"
      style={{ height: `${EXPERIENCES.length * 88}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Halo teinté de la couleur de l'expérience active (subtil) */}
        <div
          className="pointer-events-none absolute right-[6%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full opacity-40 blur-[150px] transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${exp.accent}, transparent 62%)` }}
        />

        <Container className="relative grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Colonne texte — FIXE (reste lisible tout du long) */}
          <div className="order-2 md:order-1">
            <p className="t-overline text-fg-subtle">
              {t("overline")} · <span style={{ color: exp.accent }}>{counter}</span>
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={exp.slug}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="mt-7 block h-[3px] w-12" style={{ background: exp.accent }} />
                <h2 className="mt-6 font-sans text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-fg">
                  {t(`items.${exp.slug}.name`)}
                </h2>
                <p className="mt-4 max-w-md text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-fg-muted">
                  {t(`items.${exp.slug}.tagline`)}
                </p>
                <a
                  href="#cases"
                  className="mt-8 inline-flex items-center gap-2 rounded-pill border px-6 py-3 text-sm font-medium transition-colors"
                  style={{ color: exp.accent, borderColor: exp.accent }}
                >
                  {t("learnMore")}
                  <span aria-hidden>→</span>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Indicateur des 6 */}
            <div className="mt-12 flex items-center gap-2">
              {EXPERIENCES.map((e, i) => (
                <span
                  key={e.slug}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 26 : 8,
                    background: i === active ? e.accent : "var(--color-hairline)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Colonne visuel — se construit (reveal) à chaque expérience */}
          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[14px] md:order-2">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={exp.slug}
                src={`/media/experiences/${exp.slug}.png`}
                alt={t(`items.${exp.slug}.name`)}
                initial={{ opacity: 0, scale: 1.08, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            {/* filet teinté */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[14px] border transition-colors duration-500"
              style={{ borderColor: exp.accent }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
