"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";

/**
 * Section CLIENTS — mur typographique éditorial (pas un carrousel).
 * Vrais clients Treeosk (source : Dropbox/Client, 316 marques). Sélection luxe/beauté en avant.
 * Interaction adaptée du composant 21st « Hover Brand Logo » : au survol d'un nom,
 * la marque s'affiche « en avant » dans un focal animé.
 */
const CLIENTS = [
  "Chanel", "Dior", "Yves Saint Laurent", "Givenchy", "Gucci", "Prada",
  "Armani", "Valentino", "Hermès", "Versace", "Hugo Boss", "Kenzo",
  "Mugler", "Paco Rabanne", "Carolina Herrera", "Marc Jacobs",
  "Jean Paul Gaultier", "Tom Ford", "Viktor&Rolf", "Diesel",
  "Guerlain", "Lancôme", "Estée Lauder", "Clarins", "Clinique",
  "Biotherm", "Bioderma", "Avène", "Caudalie", "La Mer", "Sisley",
  "Shiseido", "Nuxe", "Filorga", "Charlotte Tilbury", "Rituals",
  "Sephora", "Douglas", "Marionnaud", "Puig",
  "Bacardi", "Jack Daniel's", "Rémy Cointreau", "Campari",
  "BMW", "Coca-Cola", "Nespresso", "LVMH", "Belfius", "Proximus",
];

/**
 * Nuance chrome PAR MARQUE (idée Dim) — micro-teinte DÉSATURÉE issue de la palette
 * de chaque maison, appliquée UNIQUEMENT au survol (jamais en aplat). Le chrome reste
 * neutre partout ailleurs. Les marques sans entrée gardent l'encre neutre.
 */
const BRAND_HUE: Record<string, string> = {
  Kenzo: "#3f6b4a", // vert
  Gucci: "#2f6146", // vert profond
  Givenchy: "#7a1f2b", // bordeaux
  Valentino: "#8e1e2e", // rouge
  Hermès: "#b0662f", // orange
  "Yves Saint Laurent": "#a8863f", // or
  Versace: "#9a7d2e", // or
  Guerlain: "#b0862f", // ambre
  Lancôme: "#9a5a6a", // rose
  "Estée Lauder": "#2a3d66", // bleu nuit
  Biotherm: "#3f7d8c", // aqua
  Bioderma: "#4a6b8a", // bleu clinique
  Dior: "#7f8794", // gris Dior
  Sephora: "#8e1e2e", // rouge
  Bacardi: "#8e2b2b", // rouge
  BMW: "#2a5a8a", // bleu
  "Coca-Cola": "#9a2b2b", // rouge
  Nespresso: "#5a3a2a", // café
};

export default function Brands() {
  const t = useTranslations("brands");
  const [hovered, setHovered] = useState<string | null>(null);
  const featured = hovered ?? CLIENTS[0];
  const featuredHue = hovered ? BRAND_HUE[hovered] : undefined;

  return (
    <section id="clients" className="border-y border-hairline bg-canvas py-20 md:py-28">
      <Container>
        {/* Accroche + chiffre */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="flex flex-col gap-3 md:flex-row md:items-end md:gap-8"
        >
          <p className="t-overline text-fg-subtle">{t("overline")}</p>
          <p className="font-sans text-[clamp(3.25rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-fg">
            {t("stat")}
          </p>
          <p className="max-w-xs pb-2 text-fg-muted">{t("statLabel")}</p>
        </motion.div>

        {/* Focal « en avant » — la marque survolée s'affiche en grand */}
        <div className="mt-12 flex items-baseline gap-4 border-t border-hairline pt-8 md:mt-16">
          <span className="t-overline shrink-0 text-fg-subtle">→</span>
          <div className="relative h-[1.15em] flex-1 overflow-hidden font-sans text-[clamp(1.5rem,4vw,2.75rem)] font-medium leading-none tracking-[-0.03em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={featured}
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: featuredHue }}
                className="absolute inset-0 text-fg transition-colors duration-300"
              >
                {featured}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Mur de noms */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.02 } } }}
          className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4"
        >
          {CLIENTS.map((c) => {
            const dim = hovered !== null && hovered !== c;
            return (
              <motion.span
                key={c}
                onMouseEnter={() => setHovered(c)}
                onMouseLeave={() => setHovered(null)}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
                }}
                style={
                  hovered === c && BRAND_HUE[c]
                    ? { color: BRAND_HUE[c], textShadow: `0 0 26px ${BRAND_HUE[c]}44` }
                    : undefined
                }
                className={`cursor-default font-sans text-[clamp(1.05rem,2.1vw,1.7rem)] font-medium tracking-tight transition-all duration-300 ${
                  hovered === c ? "text-fg" : dim ? "text-fg-subtle/40" : "text-fg-subtle hover:text-fg"
                }`}
              >
                {c}
              </motion.span>
            );
          })}
        </motion.div>
      </Container>

      {/* Ruban chrome — marquee défilant en continu (mouvement permanent) */}
      <div className="relative mt-16 flex overflow-hidden border-y border-hairline py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-20">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-sans text-[clamp(1.1rem,2vw,1.6rem)] font-medium tracking-tight text-fg-subtle/70"
            >
              {c}
              <span className="h-1 w-1 rounded-full bg-steel-400" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
