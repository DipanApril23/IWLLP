import { Hero } from "@/components/home/Hero";
import { MissionVisionValues } from "@/components/home/MissionVisionValues";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Team } from "@/components/home/Team";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionVisionValues />
      <WhatWeDo />
      <Team />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}
