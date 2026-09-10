import { siteConfig, type Service } from "@/data";

/**
 * Structured data for the service pages.
 *
 * Search engines read the copy, but they only *understand* a services business
 * from markup like this: what is offered, by whom, where, and how to make
 * contact. Everything below is built from site.json and services.json, so
 * nothing here can claim something the pages do not already say.
 */

const provider = {
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    addressCountry: siteConfig.address.country,
  },
} as const;

const areaServed = {
  "@type": "State",
  name: `${siteConfig.address.state}, ${siteConfig.address.country}`,
} as const;

export function serviceUrl(slug: string) {
  return `${siteConfig.url}/services/${slug}`;
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: serviceUrl(service.slug),
    provider,
    areaServed,
  };
}

/** The services index, as a list search engines can read as a catalogue. */
export function serviceListSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services offered by ${siteConfig.name}`,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      description: service.shortDescription,
      url: serviceUrl(service.slug),
    })),
  };
}
