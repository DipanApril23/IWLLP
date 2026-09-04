// Loader for src/data/content/mission-vision-values.json - the three panels
// sitting directly under the hero.
import missionVisionValuesContent from "./content/mission-vision-values.json";
import imagesConfig from "./config/images.json";
import type { IconName } from "@/components/ui/Icon";

export type MissionVisionValuesCard = {
  title: string;
  /** A key of the icon map in src/components/ui/Icon.tsx. */
  icon: IconName;
  /** Resolved against the shared image host. Empty falls back to a gradient. */
  image: string;
  alt: string;
  description: string;
};

export const missionVisionValues: MissionVisionValuesCard[] =
  missionVisionValuesContent.cards.map((card) => ({
    ...card,
    // JSON widens string literals, so `icon` needs narrowing back to the union.
    icon: card.icon as IconName,
    image: card.image ? `${imagesConfig.baseUrl}/${card.image}` : "",
  }));
