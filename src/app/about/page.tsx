import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent, siteConfig } from "@/data";

export const metadata: Metadata = {
  // Explicit, because a page without one inherits the root layout's
  // canonical and would declare itself a duplicate of the home page.
  alternates: { canonical: "/about" },
  title: aboutContent.metaTitle,
  description: `About ${siteConfig.name} — ${siteConfig.tagline}.`,
};

export default function AboutPage() {
  return (
    <Container className="py-24">
      <SectionHeading
        level={1}
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
