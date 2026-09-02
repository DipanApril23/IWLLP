// Loader for the hero carousel.
//
//   ./content/hero.json   copy: slide headlines, descriptions, alt text, CTAs
//   ./config/hero.json    developer config: where the images are hosted, how
//                         long a slide holds, how far a swipe has to travel
//
// The split is deliberate. Slide copy is something an editor changes; the
// image host and the autoplay interval are deployment/behaviour settings, and
// mixing the two is how a content file turns into a config file nobody wants
// to touch.
import heroContent from "./content/hero.json";
import heroConfig from "./config/hero.json";

export type HeroSlide = {
  /** Absolute URL, resolved from the filename in the JSON plus the base URL. */
  image: string;
  alt: string;
  /** One entry per rendered line - this is how the live site breaks them. */
  headline: string[];
  description: string;
};

export type HeroCta = {
  label: string;
  href: string;
};

export const heroSlides: HeroSlide[] = heroContent.slides.map((slide) => ({
  ...slide,
  image: `${heroConfig.imageBaseUrl}/${slide.image}`,
}));

/** Identical on every slide, so they sit beside the slide list, not inside it. */
export const heroCtas: { primary: HeroCta; secondary: HeroCta } =
  heroContent.ctas;

/** How long each slide stays on screen before the carousel advances. */
export const HERO_AUTOPLAY_MS = heroConfig.autoplayMs;

/** How far a touch has to travel before it counts as a swipe. */
export const HERO_SWIPE_THRESHOLD_PX = heroConfig.swipeThresholdPx;
