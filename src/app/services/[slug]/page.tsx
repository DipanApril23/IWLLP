import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getServiceBySlug, serviceDetail, services } from "@/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <Container className="py-24">
      <p className="text-sm font-medium text-slate-500">
        {serviceDetail.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {service.title}
      </h1>
      <p className="mt-6 max-w-2xl text-base text-slate-600">
        {service.description}
      </p>

      <div className="mt-10">
        <Button href={serviceDetail.ctaHref}>{serviceDetail.ctaLabel}</Button>
      </div>
    </Container>
  );
}
