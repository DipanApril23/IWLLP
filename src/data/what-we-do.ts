// Loader for src/data/content/what-we-do.json - the "Our Services" band on
// the home page.
import whatWeDoContent from "./content/what-we-do.json";
import imagesConfig from "./config/images.json";
import whatWeDoConfig from "./config/what-we-do.json";
import type { ServiceIcon } from "./services";

export type WhatWeDoCard = {
  /** A key of the icon map in src/components/ui/Icon.tsx. */
  icon: ServiceIcon;
  title: string;
  description: string;
};

export const whatWeDo = {
  ...whatWeDoContent,
  // JSON widens string literals, so `icon` needs narrowing back to the union.
  cards: whatWeDoContent.cards as WhatWeDoCard[],
  background: {
    ...whatWeDoContent.background,
    /**
     * Resolved against the shared image host. Set `background.image` to "" in
     * the JSON and the section falls back to its gradient, so a missing photo
     * degrades instead of breaking.
     */
    image: whatWeDoContent.background.image
      ? `${imagesConfig.baseUrl}/${whatWeDoContent.background.image}`
      : "",
  },
};

/** How long a card holds before the track advances. */
export const WHAT_WE_DO_ADVANCE_MS = whatWeDoConfig.advanceMs;

/** How long to leave the track alone after someone scrolls or taps it. */
export const WHAT_WE_DO_RESUME_MS = whatWeDoConfig.resumeAfterInteractionMs;
