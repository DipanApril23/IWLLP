// Loader for src/data/content/team.json - the "Our Team" band under the
// services section.
import teamContent from "./content/team.json";
import imagesConfig from "./config/images.json";
import { siteConfig } from "./site";
import { interpolate } from "@/lib/text";
import type { IconName } from "@/components/ui/Icon";

export const team = {
  ...teamContent,
  // JSON widens string literals, so `icon` needs narrowing back to the union.
  icon: teamContent.icon as IconName,
  photo: {
    ...teamContent.photo,
    /**
     * The group photograph is one of the assets the original build left on the
     * host, so it resolves against `mediaBaseUrl` rather than the folder the
     * rebuild's own images were uploaded to. Its intrinsic size travels with
     * it in the JSON, which is what keeps the frame from reflowing while the
     * picture loads.
     */
    image: `${imagesConfig.mediaBaseUrl}/${teamContent.photo.image}`,
  },
  /** The city comes from site.json so the office is named in exactly one place. */
  caption: interpolate(teamContent.caption, { city: siteConfig.address.city }),
};
