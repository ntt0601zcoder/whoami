export type Palette = 'terminal' | 'navy' | 'light' | 'slate'
export type Mode = 'dark' | 'light'

/**
 * Shipped palette per color mode. Both modes use the terminal (green)
 * palette — green-on-near-black in the dark, green-on-off-white in the light.
 * tokens.css still defines the other palettes; point a mode here to ship one.
 */
export const PALETTE_BY_MODE: Record<Mode, Palette> = {
  dark: 'terminal',
  light: 'terminal',
}
