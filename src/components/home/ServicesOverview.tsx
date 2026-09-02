import Link from "next/link";
import {
  Search,
  Shield,
  Home,
  Briefcase,
  UserCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesOverview, type ServiceIcon } from "@/data";

/** Maps the `icon` value in content/services.json to a component. */
const icons: Record<ServiceIcon, LucideIcon> = {
  search: Search,
  shield: Shield,
  home: Home,
  briefcase: Briefcase,
  "user-check": UserCheck,
  eye: Eye,
};

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
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg border border-slate-200 p-6 transition-colors hover:border-slate-400"
              >
                <Icon className="h-6 w-6 text-slate-700" strokeWidth={1.5} />
                <p className="mt-4 text-base font-medium text-slate-900">
                  {service.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {service.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
