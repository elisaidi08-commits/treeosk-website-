"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type React from "react";

/**
 * Typo isométrique en couches (mécanique 21st « layered-text ») réhabillée DA :
 * font-sans, encre, une ligne d'accent laiton, léger décalage au survol (GSAP).
 * Effet « installation typographique » — épuré/galerie.
 */
interface LayeredTextProps {
  words: string[];
  accentIndex?: number; // ligne mise en laiton
  fontSize?: string;
  lineHeight?: number;
  className?: string;
}

export function LayeredText({
  words,
  accentIndex = -1,
  fontSize = "clamp(2.5rem, 8vw, 6rem)",
  lineHeight = 72,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // lignes empilées : chaque palier montre le mot courant + le suivant
  const lines: Array<{ top: string; bottom: string; accent: boolean }> = [
    { top: " ", bottom: words[0], accent: accentIndex === 0 },
    ...words.slice(1).map((w, k) => ({ top: words[k], bottom: w, accent: accentIndex === k + 1 })),
    { top: words[words.length - 1], bottom: " ", accent: false },
  ];

  const translateX = (index: number) => (index - Math.floor(lines.length / 2)) * 34;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paragraphs = container.querySelectorAll("p");
    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current.to(paragraphs, {
      y: -lineHeight,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.07,
    });

    const enter = () => timelineRef.current?.play();
    const leave = () => timelineRef.current?.reverse();
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);
    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
      timelineRef.current?.kill();
    };
  }, [lineHeight, words]);

  return (
    <div
      ref={containerRef}
      className={`mx-auto cursor-default select-none py-16 font-sans font-medium uppercase tracking-[-0.02em] antialiased ${className}`}
      style={{ fontSize }}
    >
      <ul className="m-0 flex list-none flex-col items-center p-0">
        {lines.map((line, index) => (
          <li
            key={index}
            className="relative overflow-hidden"
            style={{
              height: `${lineHeight}px`,
              transform: `translateX(${translateX(index)}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? 0.66667 : 1.33333})`,
            }}
          >
            <p
              className={`m-0 whitespace-nowrap px-[0.2em] align-top ${line.accent ? "text-brass" : ""}`}
              style={{ height: `${lineHeight}px`, lineHeight: `${lineHeight - 6}px` }}
            >
              {line.top}
            </p>
            <p
              className={`m-0 whitespace-nowrap px-[0.2em] align-top ${line.accent ? "text-brass" : ""}`}
              style={{ height: `${lineHeight}px`, lineHeight: `${lineHeight - 6}px` }}
            >
              {line.bottom}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
