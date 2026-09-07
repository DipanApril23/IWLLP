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
