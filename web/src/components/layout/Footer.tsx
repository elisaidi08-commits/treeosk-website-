"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import FooterKnot from "@/components/sections/FooterKnot";

function Col({ title, links }: { title: string; links: { h: string; l: string }[] }) {
  return (
    <div>
      <p className="t-overline text-fg-subtle">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((x) => (
          <li key={x.h}>
            <a
              href={x.h}
              className="text-[14px] text-fg-muted transition-colors hover:text-accent"
            >
              {x.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-canvas py-16 text-fg md:py-20">
      {/* écho 3D — le knot du hero, en petit */}
      <div className="absolute -right-4 top-4 hidden lg:block">
        <FooterKnot />
      </div>
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/treeosk-wordmark-black.webp"
              alt="Treeosk"
              width={130}
              height={21}
              className="h-[20px] w-auto dark:hidden"
            />
            <Image
              src="/brand/treeosk-wordmark-white.webp"
              alt="Treeosk"
              width={130}
              height={21}
              className="hidden h-[20px] w-auto dark:block"
            />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-fg-muted">
              {t("tagline")}
            </p>
          </div>
          <Col
            title={t("colExp")}
            links={[
              { h: "#experiences", l: tn("experiences") },
              { h: "#instore", l: "In-store" },
              { h: "#how", l: tn("howItWorks") },
            ]}
          />
          <Col
            title={t("colCompany")}
            links={[
              { h: "#about", l: t("about") },
              { h: "#cases", l: t("cases") },
              { h: "#clients", l: "Clients" },
            ]}
          />
          <Col title={t("colContact")} links={[{ h: "#contact", l: t("contact") }]} />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-hairline pt-6 text-[12px] text-fg-subtle md:flex-row">
          <span>© 2026 Treeosk — {t("rights")}</span>
          <span>Brussels · Belgium</span>
        </div>
      </Container>
    </footer>
  );
}
