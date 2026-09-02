// Loader for src/data/content/services.json.
import servicesContent from "./content/services.json";

/** Keys of the icon map in ServicesOverview - add an icon there before adding
 *  a new value here. */
export type ServiceIcon =
  | "search"
  | "shield"
  | "home"
  | "briefcase"
  | "user-check"
  | "eye";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: ServiceIcon;
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
