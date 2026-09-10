import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactContent, siteConfig } from "@/data";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  // Explicit, because a page without one inherits the root layout's
  // canonical and would declare itself a duplicate of the home page.
  alternates: { canonical: "/contact" },
  title: contactContent.metaTitle,
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  const { details } = contactContent;

  return (
    <Container className="py-24">
      <SectionHeading
        level={1}
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        description={contactContent.description}
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-6 text-sm text-slate-600">
          <div>
            <p className="font-medium text-slate-900">{details.phoneLabel}</p>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </div>
          <div>
            <p className="font-medium text-slate-900">{details.emailLabel}</p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div>
            <p className="font-medium text-slate-900">{details.officeLabel}</p>
            <p>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
