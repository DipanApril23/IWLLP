// Barrel for the data layer. Components import from "@/data" and never reach
// into a JSON file directly - that keeps the shape of the content a decision
// made in one place.
//
//   content/*.json   editable copy
//   config/*.json    developer settings (hosts, timings, thresholds)
//   *.ts             thin typed loaders over the two folders above

export { siteConfig, type SiteConfig } from "./site";
export { mainNav, headerCta, type NavLink } from "./nav";
export {
  heroHeading,
  heroSlides,
  heroCtas,
  HERO_AUTOPLAY_MS,
  HERO_SWIPE_THRESHOLD_PX,
  type HeroHeading,
  type HeroSlide,
  type HeroCta,
} from "./hero";
export {
  services,
  servicesPage,
  serviceDetail,
  getServiceBySlug,
  type Service,
  type ServiceIcon,
} from "./services";
export { servicesOverview, whyChooseUs, homeCta } from "./home";
export { whatWeDo, type WhatWeDoCard } from "./what-we-do";
export { aboutContent } from "./about";
export { contactContent, type ContactField } from "./contact";
export { footerContent, footerCopyright } from "./footer";
