import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PALETTE_BY_MODE, type Mode, type Palette } from './themes'

const MODE_KEY = 'whoami:mode'

interface ThemeCtx {
  mode: Mode
  palette: Palette
  setMode: (m: Mode) => void
  toggleMode: () => void
}

const Ctx = createContext<ThemeCtx | null>(null)

function initialMode(): Mode {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(MODE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode)
  const palette = PALETTE_BY_MODE[mode]

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-mode', mode)
    root.setAttribute('data-palette', palette)
    try {
      localStorage.setItem(MODE_KEY, mode)
    } catch {
      /* ignore */
    }
  }, [mode, palette])

  const setMode = useCallback((m: Mode) => setModeState(m), [])
  const toggleMode = useCallback(
    () => setModeState((p) => (p === 'dark' ? 'light' : 'dark')),
    [],
  )

  const value = useMemo<ThemeCtx>(
    () => ({ mode, palette, setMode, toggleMode }),
    [mode, palette, setMode, toggleMode],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
