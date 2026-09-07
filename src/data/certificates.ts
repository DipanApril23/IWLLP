// Loader for src/data/content/certificates.json - the credential wall.
import certificatesContent from "./content/certificates.json";
import certificatesConfig from "./config/certificates.json";
import imagesConfig from "./config/images.json";
import { interpolate } from "@/lib/text";
import type { IconName } from "@/components/ui/Icon";

export type Certificate = {
  /** Absolute URL, resolved from the filename in the JSON plus the base URL. */
  image: string;
  alt: string;
  /** Short form used on the card's chip - "CAPSI", "ISO 9001:2015". */
  issuer: string;
  /** Spelled out in the dialog. */
  issuerName: string;
  title: string;
  holder: string;
  detail: string;
  /** Already worded - "Valid to December 2026". */
  validity: string;
  /** Empty where the number on the scan could not be read with confidence. */
  reference: string;
};

export const certificates = {
  ...certificatesContent,
  // JSON widens string literals, so `icon` needs narrowing back to the union.
  icon: certificatesContent.icon as IconName,
  items: certificatesContent.items.map(
    (item): Certificate => ({
      ...item,
      image: `${imagesConfig.baseUrl}/${certificatesConfig.imagePath}/${item.image}`,
      // Built from the same fields the dialog shows, so an editor never writes
      // the alt text and the scan separately and lets them drift apart.
      alt: interpolate(certificatesContent.labels.scanAlt, {
        title: item.title,
        holder: item.holder,
        issuerName: item.issuerName,
      }),
      validity: interpolate(certificatesContent.labels.validUntil, {
        date: item.validUntil,
      }),
    }),
  ),
};

/**
 * How many rows of the wall are shown before the "show all" toggle.
 *
 * Rows rather than cards, because a card count that bounds one layout does not
 * bound the others: eight cards is two rows and about 1200px on a desktop, but
 * eight rows and 3700px on a phone. Two rows is roughly the same height at
 * every width, whatever the column count works out to be.
 */
export const CERTIFICATES_ROWS_BEFORE_TOGGLE = certificatesConfig.rowsBeforeToggle;

/**
 * Never hide the list behind a toggle below this many cards.
 *
 * Two rows is one card per row on a phone, so a set of four would arrive as two
 * cards and a "show all 4" button - more furniture than the four cards it was
 * saving. The floor keeps a small set whole and only takes effect where the row
 * cap would be stricter.
 */
export const CERTIFICATES_MIN_VISIBLE = certificatesConfig.minVisible;

/**
 * Cards rendered before the column count has been measured - the server render
 * and anything without JavaScript. Sized for the widest layout so a desktop
 * first paint is already correct and only narrower ones settle.
 */
export const CERTIFICATES_INITIAL_COUNT = certificatesConfig.initialCount;
