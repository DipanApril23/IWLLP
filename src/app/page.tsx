import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}
