"use client";

import { useTranslations } from "next-intl";
import Magnetic from "@/components/ui/Magnetic";
import { HorizonHero } from "@/components/ui/horizon-hero-section";

/**
 * Hero — épuré : vidéo plein cadre (nos assets chrome + hero.mp4, froid N&B) dont les clips
 * s'enchaînent en boucle continue + titre court révélé en machine à écrire (HorizonHero).
 * Peu de texte, volontairement. Pour changer/réordonner les clips : éditer VIDEOS.
 */
const VIDEOS = [
  "/media/textures/chrome-ribbon.mp4",
  "/media/textures/liquid-chrome.mp4",
  "/media/hero/hero.mp4",
  "/media/textures/liquid-metal.mp4",
];
const POSTER = "/media/hero/hero-poster.webp";

export default function HeroImmersive() {
  const t = useTranslations("hero");
  const headline = t("titleLine1")
    .split(" ")
    .map((text) => ({ text }));

  return (
    <HorizonHero videoSrcs={VIDEOS} posterSrc={POSTER} overline={t("overline")} headline={headline}>
      <Magnetic>
        <a
          href="#products"
          className="inline-flex items-center rounded-pill border border-brass px-8 py-3.5 text-sm font-medium text-brass transition hover:border-brass-hover hover:bg-brass/[0.08] hover:text-brass-hover"
        >
          {t("ctaPrimary")}
        </a>
      </Magnetic>
      <a
        href="#cases"
        className="group inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition hover:text-fg"
      >
        {t("ctaSecondary")}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </a>
    </HorizonHero>
  );
}
