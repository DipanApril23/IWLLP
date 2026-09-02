// Loader for src/data/content/site.json. Holds no copy of its own - edit the
// JSON and every page that reads it updates.
import siteContent from "./content/site.json";

export type SiteConfig = typeof siteContent;

export const siteConfig: SiteConfig = siteContent;
