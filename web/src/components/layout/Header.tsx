"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/cn";

export default function Header() {
  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    setMounted(true);
    const onScroll = () =>
      setOverHero(window.scrollY < window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Le hero suit désormais le thème (ivoire en light) → la couleur du header suit le thème,
  // plus le survol du hero. `overHero` ne sert plus qu'à la transparence du fond en haut.
  const onDark = mounted && resolvedTheme === "dark";

  const links = [
    { href: "#products", label: t("experiences") },
    { href: "#cases", label: t("cases") },
    { href: "#how", label: t("howItWorks") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-hairline/60 bg-canvas/70 backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="Treeosk — home">
          <Image
            src={
              onDark
                ? "/brand/treeosk-wordmark-white.png"
                : "/brand/treeosk-wordmark-black.png"
            }
            alt="Treeosk"
            width={140}
            height={23}
            priority
            className="h-[21px] w-auto"
          />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-[14px] transition-colors duration-300 md:flex",
            onDark ? "text-on-dark/70" : "text-fg-muted",
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                // Cible inexistante → on annule le clic (pas de saut cassé).
                if (!document.querySelector(l.href)) e.preventDefault();
              }}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <ThemeToggle onDark={onDark} />
          <LocaleSwitcher onDark={onDark} />
          <Button variant="brass" size="sm" href="#contact">
            {t("bookDemo")}
          </Button>
        </div>
      </Container>
    </header>
  );
}
