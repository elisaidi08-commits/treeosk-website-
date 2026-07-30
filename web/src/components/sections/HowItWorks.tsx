"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import RevealMask from "@/components/ui/RevealMask";

/** Un palier du process ; sa pastille s'allume en laiton quand la vague l'atteint. */
function Step({
  n,
  title,
  text,
  at,
  index,
  progress,
}: {
  n: string;
  title: string;
  text: string;
  at: number;
  index: number;
  progress: MotionValue<number>;
}) {
  const borderColor = useTransform(progress, (v) =>
    v >= at ? "var(--color-brass)" : "var(--color-hairline)",
  );
  const color = useTransform(progress, (v) => (v >= at ? "var(--color-brass)" : "var(--color-fg)"));

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.span
        style={{ borderColor, color }}
        className="absolute -left-16 top-1 flex size-10 items-center justify-center rounded-full border bg-canvas font-sans text-[13px] font-medium md:-left-28"
      >
        {n}
      </motion.span>
      <h3 className="font-sans text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
        {title}
      </h3>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">{text}</p>
    </motion.li>
  );
}

/**
 * How it works — process VERTICAL avec un « fil chrome » en vague qui se dessine au scroll
 * pour relier les étapes de conception (idée Hugo). Tracé SVG à stroke chrome iridescent ;
 * sa longueur (pathLength) suit la progression du scroll ; les paliers 01·02·03 s'allument
 * en laiton quand la vague les atteint.
 */
export default function HowItWorks() {
  const t = useTranslations("how");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const WAVE =
    "M40 6 C 74 66, 6 130, 40 194 C 74 258, 6 322, 40 386 C 74 450, 6 514, 40 578 C 74 642, 6 706, 40 770 C 66 828, 50 862, 40 894";
  const steps = [
    { n: "01", t: t("s1t"), x: t("s1x"), at: 0.08 },
    { n: "02", t: t("s2t"), x: t("s2x"), at: 0.28 },
    { n: "03", t: t("s3t"), x: t("s3x"), at: 0.5 },
    { n: "04", t: t("s4t"), x: t("s4x"), at: 0.72 },
    { n: "05", t: t("s5t"), x: t("s5x"), at: 0.9 },
  ];

  return (
    <section id="how" className="bg-section py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <h2 className="mt-4 font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            <RevealMask>{t("title")}</RevealMask>
          </h2>
          <p className="t-body-l mt-4 text-fg-muted">{t("subtitle")}</p>
        </div>

        <div ref={ref} className="relative mt-16 pl-16 md:mt-20 md:pl-28">
          {/* Vague chrome qui se dessine au scroll */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-28"
            viewBox="0 0 80 900"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="chromeWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="18%" stopColor="#e6f0f6" />
                <stop offset="40%" stopColor="#3a5a7a" />
                <stop offset="60%" stopColor="#d6e7db" />
                <stop offset="80%" stopColor="#a8acb0" />
                <stop offset="100%" stopColor="#5f6266" />
              </linearGradient>
            </defs>
            <path d={WAVE} stroke="var(--color-hairline)" strokeWidth="1.5" strokeLinecap="round" />
            {/* tracé chrome qui se dessine au scroll */}
            <motion.path
              d={WAVE}
              stroke="url(#chromeWave)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            {/* reflet chrome qui coule le long de la vague (liquide) — prononcé */}
            <motion.path
              d={WAVE}
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="0.07 0.93"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
              style={{ opacity: 1, filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}
            />
          </svg>

          {/* Étapes */}
          <ol className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <Step key={s.n} n={s.n} title={s.t} text={s.x} at={s.at} index={i} progress={scrollYProgress} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
