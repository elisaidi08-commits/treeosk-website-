"use client";

import { useEffect, useState } from "react";

/** Overlay grain animé, très subtil, sur toute la page (texture argentique). */
export default function GrainOverlay() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!on) return null;
  return (
    <video
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full object-cover opacity-[0.045] mix-blend-overlay"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/media/textures/grain.mp4" type="video/mp4" />
    </video>
  );
}
