"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "@/components/layout/Container";

export default function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-h='video']", { opacity: 0, duration: 1.4 })
        .from("[data-h='overline']", { y: 14, opacity: 0, duration: 0.7 }, "-=0.6")
        .from("[data-h='line']", { yPercent: 110, duration: 0.9, stagger: 0.12 }, "-=0.4")
        .from("[data-h='cue']", { opacity: 0, duration: 0.8 }, "-=0.3");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-immersive"
    >
      {/* Vidéo plein écran — pure beauté visuelle */}
      <div data-h="video" className="absolute inset-0">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/media/hero/hero-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/hero-poster.jpg"
          >
            <source src="/media/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Voile bas discret pour lisibilité + fondu vers le contenu */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
      </div>

      {/* Texte minimal, ancré en bas */}
      <Container className="relative w-full pb-16 md:pb-24">
        <p data-h="overline" className="t-overline mb-5 text-on-dark/70">
          {t("overline")}
        </p>
        <h1 className="max-w-3xl font-sans text-[clamp(2.25rem,5.4vw,4.5rem)] font-medium leading-[1.03] tracking-[-0.03em] text-on-dark">
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-h="line" className="block">
              {t("titleLine1")}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-h="line" className="block">
              {t("titleLine2")}
            </span>
          </span>
        </h1>
      </Container>

      {/* Indicateur de scroll */}
      <div
        data-h="cue"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-on-dark/50">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-on-dark/50 to-transparent" />
      </div>
    </section>
  );
}
