import type { Localized } from './content'

/**
 * The site is English-only. `useLang` keeps a tiny `t()` passthrough so
 * components read uniformly; there is no language switching.
 */
export function useLang() {
  return { t: (value: Localized) => value }
}
