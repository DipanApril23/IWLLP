import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services, servicesOverview } from "@/data";

export function ServicesOverview() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow={servicesOverview.eyebrow}
          title={servicesOverview.title}
          description={servicesOverview.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-lg border border-slate-200 p-6 transition-colors hover:border-slate-400"
            >
              <ServiceIcon
                name={service.icon}
                className="h-6 w-6 text-slate-700"
              />
              <p className="mt-4 text-base font-medium text-slate-900">
                {service.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
