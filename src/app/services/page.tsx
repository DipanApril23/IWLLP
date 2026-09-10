import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, servicesPage } from "@/data";
import { serviceListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Container className="py-24">
      <JsonLd schema={serviceListSchema(services)} />

      <SectionHeading
        level={1}
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        description={servicesPage.description}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="rounded-lg border border-slate-200 p-6 transition-colors hover:border-slate-400"
          >
            <Icon name={service.icon} className="text-brand h-6 w-6" />
            {/* h2 because the page heading above is the h1. */}
            <h2 className="mt-4 text-base font-medium text-slate-900">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {service.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
