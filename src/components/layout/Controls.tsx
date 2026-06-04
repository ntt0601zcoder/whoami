import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { ui } from '@/i18n/content'
import { useTheme } from '@/theme/ThemeContext'
import { Moon, Sun } from '@/components/ui/Icons'

export function ModeToggle() {
  const { mode, toggleMode } = useTheme()
  const { t } = useLang()
  const isDark = mode === 'dark'
  return (
    <button
      type="button"
      className="ctrl"
      onClick={toggleMode}
      aria-label={t(ui.actions.toggleTheme)}
      title={t(ui.actions.toggleTheme)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-flex' }}
        >
          {isDark ? <Moon /> : <Sun />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
