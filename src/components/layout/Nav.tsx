import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { ui } from '@/i18n/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { ModeToggle } from './Controls'

const NAV_ITEMS = [
  { id: 'about', label: ui.nav.about },
  { id: 'impact', label: ui.nav.impact },
  { id: 'experience', label: ui.nav.experience },
  { id: 'projects', label: ui.nav.projects },
  { id: 'stack', label: ui.nav.stack },
  { id: 'education', label: ui.nav.education },
  { id: 'contact', label: ui.nav.contact },
] as const

const SECTION_IDS = NAV_ITEMS.map((i) => i.id)

function Burger({ open }: { open: boolean }) {
  return (
    <span className={`burger${open ? ' burger--open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

export function Nav() {
  const { t } = useLang()
  const active = useActiveSection(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toTop = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a
          href="#top"
          className="nav__brand"
          onClick={(e) => {
            e.preventDefault()
            toTop()
          }}
        >
          <span className="nav__brand-dot" aria-hidden="true" />
          <span className="mono">
            nguyen<span className="nav__brand-accent">.thuan</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav__link${
                active === item.id ? ' nav__link--active' : ''
              }`}
              onClick={() => go(item.id)}
            >
              {t(item.label)}
            </button>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__actions-core">
            <ModeToggle />
          </span>
          <button
            type="button"
            className="nav__menu-btn ctrl"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Burger open={open} />
          </button>
        </div>
      </div>

      <motion.div
        className="nav__progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__panel"
            aria-label="Sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav__panel-link${
                  active === item.id ? ' nav__panel-link--active' : ''
                }`}
                onClick={() => go(item.id)}
              >
                {t(item.label)}
              </button>
            ))}
            <div className="nav__panel-controls">
              <ModeToggle />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
