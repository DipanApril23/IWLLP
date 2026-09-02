// Loader for src/data/content/nav.json.
import navContent from "./content/nav.json";

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = navContent.main;

/** The button sitting to the right of the header nav. */
export const headerCta: NavLink = navContent.headerCta;
