// Loader for src/data/content/what-we-do.json - the "Our Services" band on
// the home page.
import whatWeDoContent from "./content/what-we-do.json";
import imagesConfig from "./config/images.json";
import whatWeDoConfig from "./config/what-we-do.json";
import { services, type ServiceIcon } from "./services";

export type WhatWeDoCard = {
  /** A key of the icon map in src/components/ui/Icon.tsx. */
  icon: ServiceIcon;
  title: string;
  description: string;
  /** The service this card summarises. */
  slug: string;
  /** Built from the slug, so a card and its page can never point apart. */
  href: string;
};

export const whatWeDo = {
  ...whatWeDoContent,
  // Each card names the service it summarises rather than repeating its URL:
  // the band is the home page's only route into the service pages, so the two
  // have to stay in step. The check below fails the build if a card names a
  // service that does not exist.
  cards: whatWeDoContent.cards.map((card): WhatWeDoCard => {
    if (!services.some((service) => service.slug === card.slug)) {
      throw new Error(
        `what-we-do.json card "${card.title}" points at an unknown service: "${card.slug}"`,
      );
    }
    return {
      ...card,
      // JSON widens string literals, so `icon` needs narrowing back.
      icon: card.icon as ServiceIcon,
      href: `/services/${card.slug}`,
    };
  }),
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
