"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";

/**
 * Section CLIENTS — sélection PREMIUM (brief : plus de bandeau défilant « bas de gamme »).
 * On garde le chiffre « 300+ » comme preuve d'échelle, puis 8 maisons prestigieuses en grille
 * FIXE, monochrome, avec un « glow » de la couleur de la maison au survol. Base neutre ; la
 * couleur n'apparaît qu'au survol. (Vrais logos = images à venir via Dropbox — noms en attendant.)
 */
const FEATURED: { name: string; hue: string }[] = [
  { name: "Chanel", hue: "#8a7f70" },
  { name: "Dior", hue: "#8a929e" },
  { name: "Givenchy", hue: "#7a1f2b" },
  { name: "Yves Saint Laurent", hue: "#a8863f" },
  { name: "Gucci", hue: "#2f6146" },
  { name: "Hermès", hue: "#c06a2a" },
  { name: "Guerlain", hue: "#b0862f" },
  { name: "Valentino", hue: "#9a1e2e" },
];

export default function Brands() {
  const t = useTranslations("brands");

  return (
    <section id="clients" className="border-y border-hairline bg-canvas py-20 md:py-28">
      <Container>
        {/* Accroche + chiffre d'échelle */}
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

        {/* Sélection premium — grille fixe, glow au survol */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-14 grid grid-cols-2 items-center gap-x-8 gap-y-10 border-t border-hairline pt-14 sm:grid-cols-3 md:mt-20 md:grid-cols-4"
        >
          {FEATURED.map((b) => (
            <motion.div
              key={b.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 0.9] } },
              }}
              className="group flex items-center justify-center text-center"
            >
              <span
                className="cursor-default font-sans text-[clamp(1.1rem,2.2vw,1.65rem)] font-medium tracking-tight text-fg-subtle transition-all duration-300 group-hover:scale-[1.03] group-hover:text-fg"
                style={{ ["--hue" as string]: b.hue }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = b.hue;
                  e.currentTarget.style.textShadow = `0 0 22px ${b.hue}2e`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.textShadow = "";
                }}
              >
                {b.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
