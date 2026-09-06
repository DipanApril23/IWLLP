// Loader for src/data/content/pillars.json - "The Pillars", the carousel of
// individual team members under the group photograph.
import pillarsContent from "./content/pillars.json";
import pillarsConfig from "./config/pillars.json";
import imagesConfig from "./config/images.json";
import { interpolate } from "@/lib/text";

export type PillarMember = {
  name: string;
  /** Years of service. The sentence around it lives in `labels.experience`. */
  years: number;
  /** Absolute URL, resolved from the filename in the JSON plus the base URL. */
  image: string;
  alt: string;
  experience: string;
  bio: string;
};

export const pillars = {
  ...pillarsContent,
  members: pillarsContent.members.map(
    (member): PillarMember => ({
      ...member,
      image: `${imagesConfig.baseUrl}/${pillarsConfig.imagePath}/${member.image}`,
      // Built here rather than stored per member: both are the same sentence
      // with one value swapped, and an editor should only have to fix the
      // wording once for all eight.
      alt: interpolate(pillarsContent.labels.portraitAlt, { name: member.name }),
      experience: interpolate(pillarsContent.labels.experience, {
        years: member.years,
      }),
    }),
  ),
};

/** How long a page of members holds before the track advances. */
export const PILLARS_ADVANCE_MS = pillarsConfig.advanceMs;

/** How long to leave the track alone after someone scrolls or taps it. */
export const PILLARS_RESUME_MS = pillarsConfig.resumeAfterInteractionMs;
