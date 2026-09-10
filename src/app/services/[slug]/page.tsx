import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceBySlug, serviceDetail, services } from "@/data";
import { serviceSchema, serviceUrl } from "@/lib/seo";

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
  // Written per service rather than reused from the title: a search result has
  // to earn the click, and "Private Investigation" alone does not say where
  // the firm works or what the service covers.
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: serviceUrl(service.slug),
      type: "website",
    },
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
      <JsonLd schema={serviceSchema(service)} />

      <p className="text-sm font-medium text-slate-500">
        {serviceDetail.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {service.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-700">
        {service.shortDescription}
      </p>
      <p className="mt-4 max-w-2xl text-base text-slate-600">
        {service.description}
      </p>

      <div className="mt-10">
        <Button href={serviceDetail.ctaHref}>{serviceDetail.ctaLabel}</Button>
      </div>
    </Container>
  );
}
