import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesPage } from "@/data";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
};

export default function ServicesPage() {
  return (
    <Container className="py-24">
      <SectionHeading
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        description={servicesPage.description}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="rounded-lg border border-slate-200 p-6 hover:border-slate-400"
          >
            <p className="text-base font-medium text-slate-900">
              {service.title}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {service.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
