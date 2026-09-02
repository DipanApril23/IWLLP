// Loader for src/data/content/footer.json.
import footerContentJson from "./content/footer.json";
import { siteConfig } from "./site";
import { interpolate } from "@/lib/text";

export const footerContent = footerContentJson;

/**
 * Fills the `{year}` and `{name}` placeholders in the copyright line. The year
 * has to be passed in rather than read here, so the caller decides whether it
 * comes from the render or from a fixed value.
 */
export function footerCopyright(year: number) {
  return interpolate(footerContentJson.copyright, {
    year,
    name: siteConfig.name,
  });
}
