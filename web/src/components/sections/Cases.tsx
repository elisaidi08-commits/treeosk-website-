"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import RevealMask from "@/components/ui/RevealMask";

// « Télé » 3D (WebGL, client only) qui affiche du texte.
const WorkScreen3D = dynamic(() => import("@/components/sections/WorkScreen3D"), { ssr: false });

/**
 * Selected Work — plus de chiffres ni de photos : une « télé » Treeosk en full 3D affiche EN
 * TEXTE ce que fait Treeosk (cycle les 6 expériences), et un CARROUSEL détaille « comment ça
 * fonctionne » (les 5 étapes du process), avec navigation + autoplay.
 */
const WHAT = [
  { slug: "photobooth", accent: "#9E818C" },
  { slug: "engraving", accent: "#A08F6E" },
  { slug: "gaming", accent: "#74857E" },
  { slug: "scent", accent: "#83808E" },
  { slug: "kiosk-hostess", accent: "#75839A" },
  { slug: "custom", accent: "#878B92" },
];
const STEPS = ["s1", "s2", "s3", "s4", "s5"];

export default function Cases() {
  const t = useTranslations("cases");
  const te = useTranslations("experiences");
  const th = useTranslations("how");
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme !== "dark";

  const [tv, setTv] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTv((v) => (v + 1) % WHAT.length), 2600);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setSlide((v) => (v + 1) % STEPS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const cur = WHAT[tv];
  const step = STEPS[slide];
  const go = (d: number) => setSlide((s) => (s + d + STEPS.length) % STEPS.length);

  return (
    <section id="cases" className="bg-canvas py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="max-w-2xl"
        >
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <h2 className="mt-4 font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            <RevealMask>{t("title")}</RevealMask>
          </h2>
          <p className="t-body-l mt-4 text-fg-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 md:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Télé 3D — affiche ce que fait Treeosk */}
          <div className="relative order-1 h-[44vh] w-full lg:h-[62vh]">
            <WorkScreen3D text={te(`items.${cur.slug}.name`)} accent={cur.accent} light={light} />
          </div>

          {/* Carrousel — comment ça fonctionne */}
          <div className="order-2">
            <p className="t-overline text-fg-subtle">{th("overline")}</p>

            <div className="relative mt-6 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-sans text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.03em] text-hairline">
                    0{slide + 1}
                  </span>
                  <h3 className="mt-4 font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
                    {th(`${step}t`)}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">{th(`${step}x`)}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Précédent"
                className="flex size-10 items-center justify-center rounded-full border border-hairline text-fg transition hover:border-accent hover:text-accent"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSlide(i)}
                    aria-label={`Étape ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === slide ? 26 : 8,
                      background: i === slide ? "var(--color-accent)" : "var(--color-hairline)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Suivant"
                className="flex size-10 items-center justify-center rounded-full border border-hairline text-fg transition hover:border-accent hover:text-accent"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
