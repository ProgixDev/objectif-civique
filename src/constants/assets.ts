/**
 * Centralized asset registry for "Objectif Civique".
 *
 * Location: src/constants/assets.ts
 *
 * Usage in components:
 *   import { Assets } from "@/constants/assets";
 *   <Image source={Assets.onboarding.exam} />
 *
 * All assets are loaded via require() so Metro bundles them at build time.
 * If a file is missing, Metro will throw at startup — replace with a placeholder
 * (e.g. require("../../assets/images/_placeholder.png")) until the real asset is added.
 */

export const Assets = {
  // ─────────────────────────────────────────────────────────────────
  // BRANDING — logo + app icon variants
  // ─────────────────────────────────────────────────────────────────
  branding: {
    icon: require("../../assets/branding/icon.png"),
    iconForeground: require("../../assets/branding/icon-foreground.png"),
    logoHorizontal: require("../../assets/branding/logo-horizontal.png"),
    logo: require("../../assets/branding/logo.png"),
    logoMonoWhite: require("../../assets/branding/logo-mono-white.png"),
    favicon: require("../../assets/branding/favicon.png"),
    splash: require("../../assets/branding/splash.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // ONBOARDING — 3 swipeable slides (3D claymorphism illustrations)
  // ─────────────────────────────────────────────────────────────────
  onboarding: {
    exam: require("../../assets/images/on1.png"),
    questions: require("../../assets/images/on2.png"),
    progress: require("../../assets/images/on3.png"),
    heroProgress: require("../../assets/images/onboarding-progress.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // PERSO — personalization onboarding flow (3D icons per choice)
  // ─────────────────────────────────────────────────────────────────
  perso: {
    naturalisation: require("../../assets/images/perso-naturalisation.png"),
    csp: require("../../assets/images/perso-csp.png"),
    cr: require("../../assets/images/perso-cr.png"),
    channelSocial: require("../../assets/images/perso-channel-social.png"),
    channelSearch: require("../../assets/images/perso-channel-search.png"),
    channelFriend: require("../../assets/images/perso-channel-friend.png"),
    channelOther: require("../../assets/images/perso-channel-other.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // ASSESSMENT — mini-test screens
  // ─────────────────────────────────────────────────────────────────
  assessment: {
    intro: require("../../assets/images/assessment-intro.png"),
    celebration: require("../../assets/images/result-celebration.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // SIMULATION — exam blanc
  // ─────────────────────────────────────────────────────────────────
  simulation: {
    intro: require("../../assets/images/sim-intro.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // THEMES — 5 official theme illustrations
  // ─────────────────────────────────────────────────────────────────
  themes: {
    institutions: require("../../assets/images/theme-institutions.png"),
    histoire: require("../../assets/images/theme-histoire.png"),
    valeurs: require("../../assets/images/theme-valeurs.png"),
    geographie: require("../../assets/images/theme-geographie.png"),
    culture: require("../../assets/images/theme-culture.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // COACHING — human upsell screen (REAL PHOTOS, not 3D)
  // ─────────────────────────────────────────────────────────────────
  coaching: {
    hero: require("../../assets/images/coach-hero.png"),
    teaser: require("../../assets/images/coach-teaser.png"),
    avatar1: require("../../assets/images/coach-1.png"),
    avatar2: require("../../assets/images/coach-2.png"),
    avatar3: require("../../assets/images/coach-3.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // ACHIEVEMENTS — locked/unlocked badge art (10 badges)
  // ─────────────────────────────────────────────────────────────────
  achievements: {
    firstStep: require("../../assets/images/badge-first-step.png"),
    streak7: require("../../assets/images/badge-streak-7.png"),
    centurion: require("../../assets/images/badge-centurion.png"),
    excellence: require("../../assets/images/badge-excellence.png"),
    perfectTheme: require("../../assets/images/badge-perfect-theme.png"),
    earlyBird: require("../../assets/images/badge-early-bird.png"),
    nightOwl: require("../../assets/images/badge-night-owl.png"),
    marathon: require("../../assets/images/badge-marathon.png"),
    scholar: require("../../assets/images/badge-scholar.png"),
    citizen: require("../../assets/images/badge-citizen.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // EMPTY STATES — friendly illustrations for empty lists
  // ─────────────────────────────────────────────────────────────────
  emptyStates: {
    noBookmarks: require("../../assets/images/empty-bookmarks.png"),
    noActivity: require("../../assets/images/empty-activity.png"),
    noResults: require("../../assets/images/empty-results.png"),
  },

  // ─────────────────────────────────────────────────────────────────
  // DECORATIVE — backgrounds, blobs, accents
  // ─────────────────────────────────────────────────────────────────
  decorative: {
    blobYellow: require("../../assets/images/blob-yellow.png"),
    blobNavy: require("../../assets/images/blob-navy.png"),
    paperTexture: require("../../assets/images/paper-texture.png"),
    confetti: require("../../assets/images/confetti.png"),
  },
} as const;

export type AssetCategory = keyof typeof Assets;
export type AssetKey<C extends AssetCategory> = keyof (typeof Assets)[C];

export const ALL_ASSETS = [
  ...Object.values(Assets.branding),
  ...Object.values(Assets.onboarding),
  ...Object.values(Assets.perso),
  ...Object.values(Assets.assessment),
  ...Object.values(Assets.simulation),
  ...Object.values(Assets.themes),
  ...Object.values(Assets.coaching),
  ...Object.values(Assets.achievements),
  ...Object.values(Assets.emptyStates),
  ...Object.values(Assets.decorative),
];
