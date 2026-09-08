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
  heroLabels,
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
export { whyChooseUs, homeCta } from "./home";
export {
  whatWeDo,
  WHAT_WE_DO_ADVANCE_MS,
  WHAT_WE_DO_RESUME_MS,
  type WhatWeDoCard,
} from "./what-we-do";
export {
  missionVisionValues,
  type MissionVisionValuesCard,
} from "./mission-vision-values";
export { team } from "./team";
export {
  pillars,
  PILLARS_ADVANCE_MS,
  PILLARS_RESUME_MS,
  type PillarMember,
} from "./pillars";
export {
  certificates,
  CERTIFICATES_ADVANCE_MS,
  CERTIFICATES_INITIAL_COUNT,
  CERTIFICATES_MIN_VISIBLE,
  CERTIFICATES_RESUME_MS,
  CERTIFICATES_ROWS_BEFORE_TOGGLE,
  type Certificate,
} from "./certificates";
export {
  contactBand,
  contactForm,
  type ContactDetail,
} from "./contact-band";
export { aboutContent } from "./about";
export { contactContent, type ContactField } from "./contact";
export { footerContent, footerCopyright } from "./footer";
