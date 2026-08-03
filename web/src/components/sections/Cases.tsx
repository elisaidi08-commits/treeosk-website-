"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import RevealMask from "@/components/ui/RevealMask";

function Counter({ value }: { value: string }) {
  const m = value.match(/[\d.]+/);
  const target = m ? parseFloat(m[0]) : 0;
  const prefix = m ? value.slice(0, m.index) : value;
  const suffix = m ? value.slice((m.index ?? 0) + m[0].length) : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, {
      duration: 1.4,
      ease: [0.2, 0.65, 0.3, 0.9],
      onUpdate: (v) => setN(v),
    });
    return () => c.stop();
  }, [inView, target]);
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(n)}
      {suffix}
    </span>
  );
}

/**
 * Cases / Réalisations — cartes projet : VISUEL réel (nos médias en attendant les vraies
 * photos clients — bloquées Dropbox), N&B qui passe en couleur au survol, métrique animée,
 * marque + lieu. COULEUR d'accent PAR PROJET (filet + métrique au survol) — base neutre.
 */
const CASES = [
  { key: "c1", media: "photobooth", accent: "#A8607A" },
  { key: "c2", media: "kiosk-hostess", accent: "#5B6B7A" },
  { key: "c3", media: "scent", accent: "#5E8B72" },
];

export default function Cases() {
  const t = useTranslations("cases");

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

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {CASES.map((c, i) => (
            <Tilt3D
              key={c.key}
              delay={i * 0.08}
              max={5}
              className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface transition-colors duration-300"
            >
              {/* Visuel du projet */}
              <div className="relative aspect-[16/11] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/media/experiences/${c.media}.webp`}
                  alt={t(`${c.key}b`)}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <span
                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: c.accent }}
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col p-7">
                <p className="font-sans text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.02em] tabular-nums text-fg">
                  <Counter value={t(`${c.key}v`)} />
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">{t(`${c.key}m`)}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-hairline pt-5">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.accent }} />
                  <p className="font-sans text-[15px] font-medium text-fg">{t(`${c.key}b`)}</p>
                  <span className="t-overline ml-auto text-fg-subtle">{t(`${c.key}p`)}</span>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-fg-subtle">{t("note")}</p>
      </Container>
    </section>
  );
}
