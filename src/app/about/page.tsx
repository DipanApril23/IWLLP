import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent, siteConfig } from "@/data";

export const metadata: Metadata = {
  title: aboutContent.metaTitle,
  description: `About ${siteConfig.name} — ${siteConfig.tagline}.`,
};

export default function AboutPage() {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow={aboutContent.eyebrow}
        title={siteConfig.name}
        description={siteConfig.description}
      />

      <div className="mt-12 max-w-2xl space-y-4 text-sm text-slate-600">
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}
