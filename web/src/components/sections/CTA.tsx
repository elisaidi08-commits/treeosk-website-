"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import RevealMask from "@/components/ui/RevealMask";

export default function CTA() {
  const t = useTranslations("cta");
  return (
    <section id="contact" className="bg-canvas py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="max-w-3xl"
        >
          <h2 className="font-sans text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.03] tracking-[-0.03em] text-fg">
            <RevealMask>{t("title")}</RevealMask>
          </h2>
          <p className="t-body-l mt-5 max-w-xl text-fg-muted">{t("subtitle")}</p>
          <div className="mt-9">
            <Button variant="brass" href="mailto:hello@treeosk.com">
              {t("button")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
