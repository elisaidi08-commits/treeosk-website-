"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Chemin vidéo dans /public (ex: "/media/hero/hero.mp4"). Optionnel → placeholder. */
  videoSrc?: string;
  /** Image fixe (poster + fallback reduced-motion), ex: "/media/hero/hero.webp". */
  posterSrc?: string;
  /** Label du placeholder quand aucun média n'est fourni. */
  label?: string;
  className?: string;
};

/**
 * Fenêtre immersive « sombre » Graphite Chrome.
 * - vidéo en boucle (autoplay/muted/loop/playsInline) si videoSrc fourni,
 * - image fixe si prefers-reduced-motion (ou si seul posterSrc est fourni),
 * - sinon dégradé graphite + label placeholder.
 * Prêt à recevoir les assets IA : il suffit de passer videoSrc / posterSrc.
 */
export default function ImmersiveMedia({
  videoSrc,
  posterSrc,
  label = "Immersive visual",
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const showVideo = Boolean(videoSrc) && !reduced;
  const showPoster = Boolean(posterSrc) && !showVideo;

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-immersive",
        className,
      )}
    >
      {/* Base tobacco → encre (jamais un aplat plat) */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_70%_15%,#37200d_0%,#110e06_62%)]" />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {showPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!showVideo && !showPoster && (
        <span className="t-overline relative text-steel-400/60">{label}</span>
      )}

      {/* Reflet chrome haut */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
    </div>
  );
}
