"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "clients", label: "Clients" },
  { id: "experiences", label: "Experiences" },
  { id: "instore", label: "In-store" },
  { id: "how", label: "How it works" },
  { id: "cases", label: "Cases" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * Navigation fluide : barre de progression laiton en haut + dot-nav vertical à droite.
 * La section active s'allonge en laiton ; clic = scroll doux. Point de repère permanent.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id || "top");
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = s.id === "top" ? document.querySelector("section") : document.getElementById(s.id);
      if (el) {
        if (s.id === "top" && !el.id) el.id = "top";
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = id === "top" ? document.querySelector("section") : document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* barre de progression en haut */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      />

      {/* dot-nav vertical */}
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      >
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-label={s.label}
              aria-current={on ? "true" : undefined}
              className="group relative flex h-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  on ? "h-6 w-1.5 bg-accent" : "h-1.5 w-1.5 bg-fg-subtle/40 group-hover:bg-fg-subtle"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-on-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
