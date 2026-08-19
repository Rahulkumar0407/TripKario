/**
 * TripKario — Centralized Motion System
 *
 * All animation durations, easings, and distances
 * are defined here to maintain visual consistency.
 */

export const MOTION = {
  /** 150–250ms — hover, button, small UI changes */
  fast: 0.2,
  /** 350–650ms — glass panels, text transitions, carousel state */
  medium: 0.55,
  /** 700–1400ms — image transitions, scene changes, editorial reveals */
  slow: 0.9,
  /** 1200–2200ms — major scene transitions, hero, final CTA */
  cinematic: 1.4,
} as const;

export const EASE = {
  /** Standard power3 out */
  out: [0.16, 1, 0.3, 1] as const,
  /** Power4 in-out for major reveals */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Expo out for dramatic entrances */
  expo: [0.19, 1, 0.22, 1] as const,
  /** Smooth settle for carousels */
  settle: [0.33, 1, 0.68, 1] as const,
};

export const SPRING = {
  /** Tight spring — buttons, micro-interactions */
  snappy: { stiffness: 400, damping: 30 },
  /** Medium spring — carousel slides, card motions */
  smooth: { stiffness: 260, damping: 28, mass: 0.7 },
  /** Loose spring — scroll-driven, parallax */
  gentle: { stiffness: 120, damping: 22 },
};

/** Stagger delays in seconds */
export const STAGGER = {
  tight: 0.05,
  normal: 0.08,
  relaxed: 0.12,
};

/** Scroll reveal default variants */
export const REVEAL = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const REVEAL_TRANSITION = {
  duration: MOTION.medium,
  ease: EASE.out,
};
