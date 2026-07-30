"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/sections/Hero3D"), { ssr: false });

/**
 * Écho 3D — le knot chrome du hero réapparaît en petit dans le footer (fil rouge 3D).
 * scrollParallax désactivé pour qu'il reste centré en bas de page.
 */
export default function FooterKnot() {
  return (
    <div className="pointer-events-none h-40 w-40 opacity-90 md:h-48 md:w-48">
      <Hero3D scrollParallax={false} />
    </div>
  );
}
