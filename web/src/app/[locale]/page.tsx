import HeroImmersive from "@/components/sections/HeroImmersive";
import Brands from "@/components/sections/Brands";
import Experiences from "@/components/sections/Experiences";
import InStore from "@/components/sections/InStore";
import HowItWorks from "@/components/sections/HowItWorks";
import Cases from "@/components/sections/Cases";
import Statement from "@/components/sections/Statement";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroImmersive />
        <Brands />
        <Experiences />
        <InStore />
        <HowItWorks />
        <Cases />
        <Statement />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
