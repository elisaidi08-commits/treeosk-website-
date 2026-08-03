"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import RevealMask from "@/components/ui/RevealMask";

/**
 * Products — les produits/expériences Treeosk mis en avant DIRECTEMENT (brief refonte) :
 * 3 best-sellers affichés + « Voir plus » qui révèle les 3 autres. Base neutre silver-chrome,
 * mais CHAQUE produit porte sa couleur d'accent (filet + photo qui passe en couleur au survol,
 * effet de profondeur). Le reste du site reste mono ; la couleur n'apparaît que par produit.
 */
type Product = { slug: string; accent: string };

// 3 best-sellers d'abord, puis les 3 révélés par « Voir plus ». Couleurs = accent par projet.
const FEATURED: Product[] = [
  { slug: "photobooth", accent: "#A8607A" },
  { slug: "engraving", accent: "#B8925A" },
  { slug: "kiosk-hostess", accent: "#5B6B7A" },
];
const MORE: Product[] = [
  { slug: "gaming", accent: "#4A6E9E" },
  { slug: "scent", accent: "#5E8B72" },
  { slug: "custom", accent: "#6E5A86" },
];

function Card({ p, index }: { p: Product; index: number }) {
  const t = useTranslations("experiences");
  return (
    <motion.a
      href="#cases"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ ["--accent" as string]: p.accent }}
      className="group relative block overflow-hidden rounded-[10px] border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/media/experiences/${p.slug}.png`}
          alt={t(`items.${p.slug}.name`)}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        {/* voile bas pour lisibilité du texte */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        {/* pastille couleur du projet */}
        <span
          className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full ring-2 ring-white/30"
          style={{ background: "var(--accent)" }}
        />
        {/* contenu */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span
            className="mb-3 block h-[2px] w-8 origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-[2.4]"
            style={{ background: "var(--accent)" }}
          />
          <h3 className="font-sans text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-tight tracking-[-0.02em] text-white">
            {t(`items.${p.slug}.name`)}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-white/70">{t(`items.${p.slug}.tagline`)}</p>
        </div>
      </div>
    </motion.a>
  );
}

export default function Products() {
  const t = useTranslations("experiences");
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="products" className="bg-canvas py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="t-overline text-fg-subtle">{t("overline")}</p>
            <h2 className="mt-4 font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg">
              <RevealMask>{t("title")}</RevealMask>
            </h2>
            <p className="t-body-l mt-4 text-fg-muted">{t("subtitle")}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
          {FEATURED.map((p, i) => (
            <Card key={p.slug} p={p} index={i} />
          ))}

          <AnimatePresence initial={false}>
            {expanded &&
              MORE.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card p={p} index={i} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Voir plus / moins */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex items-center gap-2 rounded-pill border border-hairline px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
          >
            {expanded ? t("seeLess") : `${t("seeMore")} (${MORE.length})`}
            <span
              aria-hidden
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}
