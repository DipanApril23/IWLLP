// Loader for src/data/content/services.json.
import servicesContent from "./content/services.json";

/** Keys of the icon map in src/components/ui/Icon.tsx - add an entry there
 *  before adding a new value here. */
export type ServiceIcon =
  | "search"
  | "shield"
  | "home"
  | "briefcase"
  | "user-check"
  | "eye"
  | "globe"
  | "fingerprint";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  /** One line, used on the services index and as the card summary. */
  shortDescription: string;
  /** The body of the service's own page. */
  description: string;
  /** Written per service rather than reused from `title` - a page title has to
   *  earn a click from a search result, which a bare service name does not. */
  metaTitle: string;
  metaDescription: string;
  /** The terms this page is written to answer. Emitted as meta keywords, but
   *  they matter because they appear in the title, description and copy. */
  keywords: string[];
};

// JSON widens string literals, so `icon` needs narrowing back to the union.
export const services = servicesContent.items as Service[];

/** Copy for the /services index page. */
export const servicesPage = servicesContent.page;

/** Copy shared by every /services/[slug] page. */
export const serviceDetail = servicesContent.detail;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
