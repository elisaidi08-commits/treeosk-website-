import HeroImmersive from "@/components/sections/HeroImmersive";
import Products from "@/components/sections/Products";
import Cases from "@/components/sections/Cases";
import HowItWorks from "@/components/sections/HowItWorks";
import InStore from "@/components/sections/InStore";
import Brands from "@/components/sections/Brands";
import Statement from "@/components/sections/Statement";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroImmersive />
        <Products />
        <Cases />
        <HowItWorks />
        <InStore />
        <Brands />
        <Statement />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
