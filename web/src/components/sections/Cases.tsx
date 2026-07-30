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
 * Cases — cartes éditoriales façon « testimonial » (mécanique adaptée du composant 21st
 * « Testimonials » de santiago) : glyphe guillemet, stagger à l'entrée, hover-lift —
 * réhabillées DA greyscale. La métrique illustrative sert d'accroche.
 */
export default function Cases() {
  const t = useTranslations("cases");
  const items = [
    { b: t("c1b"), p: t("c1p"), v: t("c1v"), m: t("c1m") },
    { b: t("c2b"), p: t("c2p"), v: t("c2v"), m: t("c2m") },
    { b: t("c3b"), p: t("c3p"), v: t("c3v"), m: t("c3m") },
  ];
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
          {items.map((it, i) => (
            <Tilt3D
              key={i}
              delay={i * 0.08}
              max={6}
              className="group relative flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-8 transition-colors duration-300 hover:border-steel-400"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 left-5 select-none font-sans text-7xl leading-none text-hairline"
              >
                &ldquo;
              </span>
              <p className="mt-8 font-sans text-[clamp(2.5rem,4.5vw,3.5rem)] font-medium leading-none tracking-[-0.02em] text-fg tabular-nums">
                <Counter value={it.v} />
              </p>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fg-muted">{it.m}</p>
              <div className="mt-6 border-t border-hairline pt-5">
                <p className="font-sans text-[15px] font-medium text-fg">{it.b}</p>
                <p className="t-overline mt-1 text-fg-subtle">{it.p}</p>
              </div>
            </Tilt3D>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-fg-subtle">{t("note")}</p>
      </Container>
    </section>
  );
}
