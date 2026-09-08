// Loader for src/data/content/contact-band.json - the "Your Trusted Partner"
// contact band, and the embed settings for the form inside it.
//
//   ./content/contact-band.json  copy: heading, lede, the ways to reach us
//   ./config/contact-band.json   the third-party form's URL and ids
import contactBandContent from "./content/contact-band.json";
import contactBandConfig from "./config/contact-band.json";
import imagesConfig from "./config/images.json";
import { siteConfig } from "./site";
import { interpolate } from "@/lib/text";
import type { IconName } from "@/components/ui/Icon";

export type ContactDetail = {
  /** A key of the icon map in src/components/ui/Icon.tsx. */
  icon: IconName;
  label: string;
  value: string;
  /** Empty for the ones with nowhere to go, like the office address. */
  href: string;
};

const { address } = siteConfig;

/** Everything the copy is allowed to pull in from site.json. */
const tokens = {
  phone: siteConfig.phone,
  phoneHref: siteConfig.phoneHref,
  email: siteConfig.email,
  address: [address.line1, address.line2, address.city, address.state].join(
    ", ",
  ),
};

export const contactBand = {
  ...contactBandContent,
  // JSON widens string literals, so `icon` needs narrowing back to the union.
  icon: contactBandContent.icon as IconName,
  background: {
    ...contactBandContent.background,
    image: contactBandContent.background.image
      ? `${imagesConfig.baseUrl}/${contactBandContent.background.image}`
      : "",
  },
  // The phone number and address are written once, in site.json. The band
  // takes them through the same {token} substitution the footer already uses,
  // so changing the number in one place changes it everywhere.
  details: contactBandContent.details.map(
    (detail): ContactDetail => ({
      ...detail,
      icon: detail.icon as IconName,
      value: interpolate(detail.value, tokens),
      href: detail.href ? interpolate(detail.href, tokens) : "",
    }),
  ),
};

/**
 * The embedded enquiry form.
 *
 * `embedScript` is the widget host's own resizer - iframe-resizer under the
 * hood - derived from the form's URL so the two can never point at different
 * instances. It sizes the frame to the form in every state, which matters
 * because the form does not stay one height: a submit with the required fields
 * empty adds an error line under each of the four and grows it by ~166px.
 *
 * The iframe it manages must NOT be lazy. The script hides the frame while it
 * initialises, and a hidden frame never enters the viewport, so a lazy one sits
 * there and never requests its source at all.
 */
export const contactForm = {
  ...contactBandConfig.form,
  embedScript: new URL("/js/form_embed.js", contactBandConfig.form.src).href,
};
