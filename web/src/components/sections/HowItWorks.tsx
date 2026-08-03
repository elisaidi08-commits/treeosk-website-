"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ClipboardList, Box, FlaskConical, Factory, MapPin, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import RevealMask from "@/components/ui/RevealMask";

/** Un palier du process ; sa pastille s'allume en acier quand la vague l'atteint. */
function Step({
  n,
  title,
  text,
  at,
  index,
  active,
  progress,
}: {
  n: string;
  title: string;
  text: string;
  at: number;
  index: number;
  active: boolean;
  progress: MotionValue<number>;
}) {
  const borderColor = useTransform(progress, (v) =>
    v >= at ? "var(--color-accent)" : "var(--color-hairline)",
  );
  const color = useTransform(progress, (v) => (v >= at ? "var(--color-accent)" : "var(--color-fg)"));

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`relative transition-opacity duration-300 ${active ? "opacity-100" : "opacity-60"}`}
    >
      <motion.span
        style={{ borderColor, color }}
        className="absolute -left-16 top-1 flex size-10 items-center justify-center rounded-full border bg-section font-sans text-[13px] font-medium md:-left-20"
      >
        {n}
      </motion.span>
      <h3 className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">{text}</p>
    </motion.li>
  );
}

/**
 * How it works — process INTERACTIF : à gauche les 5 étapes reliées par un « fil chrome »
 * (vague SVG qui se dessine au scroll), à droite un panneau STICKY qui illustre l'étape active
 * (icône + n° + titre) et change au fil du scroll. Répond au brief « timeline interactive ».
 */
const WAVE =
  "M40 6 C 74 66, 6 130, 40 194 C 74 258, 6 322, 40 386 C 74 450, 6 514, 40 578 C 74 642, 6 706, 40 770 C 66 828, 50 862, 40 894";

export default function HowItWorks() {
  const t = useTranslations("how");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const steps: { n: string; t: string; x: string; at: number; Icon: LucideIcon }[] = [
    { n: "01", t: t("s1t"), x: t("s1x"), at: 0.06, Icon: ClipboardList },
    { n: "02", t: t("s2t"), x: t("s2x"), at: 0.26, Icon: Box },
    { n: "03", t: t("s3t"), x: t("s3x"), at: 0.48, Icon: FlaskConical },
    { n: "04", t: t("s4t"), x: t("s4x"), at: 0.7, Icon: Factory },
    { n: "05", t: t("s5t"), x: t("s5x"), at: 0.9, Icon: MapPin },
  ];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < steps.length; i++) if (v >= steps[i].at) idx = i;
    setActive(idx);
  });

  const ActiveIcon = steps[active].Icon;

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

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
          {/* Colonne gauche — étapes + vague chrome */}
          <div ref={ref} className="relative pl-16 md:pl-20">
            <svg
              className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-20"
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
              <motion.path
                d={WAVE}
                stroke="url(#chromeWave)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
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

            <ol className="space-y-14 md:space-y-20">
              {steps.map((s, i) => (
                <Step
                  key={s.n}
                  n={s.n}
                  title={s.t}
                  text={s.x}
                  at={s.at}
                  index={i}
                  active={i === active}
                  progress={scrollYProgress}
                />
              ))}
            </ol>
          </div>

          {/* Colonne droite — panneau sticky illustrant l'étape active */}
          <div className="hidden md:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[18px] border border-hairline bg-surface p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="t-overline text-fg-subtle">
                      {steps[active].n} / {steps[steps.length - 1].n}
                    </p>
                    <motion.div
                      initial={{ scale: 0.85, rotate: -6, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-8 flex size-20 items-center justify-center rounded-2xl border border-accent/30 text-accent"
                    >
                      <ActiveIcon size={34} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="mt-8 font-sans text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
                      {steps[active].t}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-muted">
                      {steps[active].x}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex items-center gap-2">
                  {steps.map((s, i) => (
                    <span
                      key={s.n}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? 26 : 8,
                        background: i === active ? "var(--color-accent)" : "var(--color-hairline)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
