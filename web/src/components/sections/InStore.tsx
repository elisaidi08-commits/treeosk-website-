"use client";

import { useTranslations } from "next-intl";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";

/**
 * Section In-store — révélation par fenêtre chrome (mécanique 21st SmoothScrollHero
 * réadaptée DA froide) : un plan d'install en magasin s'ouvre au scroll d'une fenêtre
 * centrale jusqu'au plein cadre, puis le titre se révèle sur un voile encre. Média N&B froid.
 */
export default function InStore() {
  const t = useTranslations("instore");

  return (
    <SmoothScrollHero
      id="instore"
      scrollVh={220}
      desktopImage="/media/instore/after.webp"
      mobileImage="/media/experiences/kiosk-hostess.webp"
      initialClipPercentage={25}
      finalClipPercentage={75}
    >
      <div className="mx-auto max-w-3xl px-6 text-center text-on-dark">
        <p className="t-overline text-white/55">{t("overline")}</p>
        <h2 className="mt-5 font-sans text-[clamp(1.9rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
          {t("title")}
        </h2>
        <p className="t-body-l mx-auto mt-4 max-w-xl text-white/70">{t("subtitle")}</p>
      </div>
    </SmoothScrollHero>
  );
}
