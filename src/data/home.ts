// Loader for src/data/content/home.json - the copy for every section of the
// home page below the hero.
import homeContent from "./content/home.json";
import { siteConfig } from "./site";
import { interpolate } from "@/lib/text";

export const whyChooseUs = homeContent.whyChooseUs;

/** The `{phone}` placeholder in the JSON is filled from site.json. */
export const homeCta = {
  ...homeContent.cta,
  description: interpolate(homeContent.cta.description, {
    phone: siteConfig.phone,
  }),
};
