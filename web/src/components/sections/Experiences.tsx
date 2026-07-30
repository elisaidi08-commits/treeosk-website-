"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import RevealMask from "@/components/ui/RevealMask";
import { LayoutGrid, type Card } from "@/components/ui/layout-grid";

/**
 * Expériences — grille média cliquable (mécanique 21st LayoutGrid réadaptée DA froide) :
 * les 6 expériences en vraies photos N&B (bento 3 colonnes) ; au clic, la carte s'agrandit
 * en lightbox avec titre + tagline. « On comprend directement » ce qu'on fait en magasin.
 */
const ITEMS: { slug: string; className: string }[] = [
  { slug: "photobooth", className: "md:col-span-2" },
  { slug: "kiosk-hostess", className: "md:col-span-1" },
  { slug: "gaming", className: "md:col-span-1" },
  { slug: "scent", className: "md:col-span-2" },
  { slug: "engraving", className: "md:col-span-2" },
  { slug: "custom", className: "md:col-span-1" },
];

export default function Experiences() {
  const t = useTranslations("experiences");

  const cards: Card[] = ITEMS.map((it, i) => ({
    id: i + 1,
    className: it.className,
    thumbnail: `/media/experiences/${it.slug}.png`,
    content: (
      <div>
        <p className="font-sans text-2xl font-medium tracking-[-0.02em] text-white md:text-3xl">
          {t(`items.${it.slug}.name`)}
        </p>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/70">
          {t(`items.${it.slug}.tagline`)}
        </p>
      </div>
    ),
  }));

  return (
    <section id="experiences" className="bg-section py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <h2 className="mt-4 max-w-3xl font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
            <RevealMask>{t("title")}</RevealMask>
          </h2>
        </motion.div>

        <div className="mt-10 md:mt-14">
          <LayoutGrid cards={cards} />
        </div>
      </Container>
    </section>
  );
}
