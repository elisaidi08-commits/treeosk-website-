"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Magnetic from "@/components/ui/Magnetic";
import { HorizonHero } from "@/components/ui/horizon-hero-section";

// Le kiosque 3D est chargé côté client uniquement (WebGL).
const HeroKiosk3D = dynamic(() => import("@/components/sections/HeroKiosk3D"), { ssr: false });

/**
 * Hero — produit-first : titre massif à gauche (silver, reste affiché) + kiosque Treeosk en 3D
 * qui tourne à droite (HorizonHero). Remplace la vidéo chrome abstraite par le PRODUIT.
 */
export default function HeroImmersive() {
  const t = useTranslations("hero");
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme !== "dark";

  return (
    <HorizonHero
      overline={t("overline")}
      title={t("titleLine1")}
      visual={<HeroKiosk3D light={light} />}
    >
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
