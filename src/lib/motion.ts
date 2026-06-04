import type { Variants } from 'framer-motion'

/** Soft, decisive ease — the spine of every transition in the site. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Reveal once, a touch before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE },
  },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

/** Parent that staggers its direct children when revealed. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** Child variant for use inside a staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}
