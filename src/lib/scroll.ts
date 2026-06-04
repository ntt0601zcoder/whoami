/**
 * Smooth-scroll to an element by id and briefly flash it so the eye lands
 * on the right line. Used by Impact metrics to deep-link into Experience.
 */
export function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('anchor-flash')
  // restart the animation even on repeated clicks
  void el.offsetWidth
  el.classList.add('anchor-flash')
  window.setTimeout(() => el.classList.remove('anchor-flash'), 3100)
}
