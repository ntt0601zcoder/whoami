import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { profile, social, ui } from '@/i18n/content'
import { EASE } from '@/lib/motion'
import {
  Download,
  Github,
  LinkedIn,
  Mail,
  MapPin,
  Sparkle,
} from '@/components/ui/Icons'
import { Terminal } from '@/components/ui/Terminal'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const scrollTo = (id: string) => (e: MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <motion.div
          className="hero__main"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="hero__avail" variants={item}>
            <span className="hero__avail-dot" aria-hidden="true" />
            {t(ui.hero.available)}
          </motion.span>

          <motion.p className="hero__role mono" variants={item}>
            {t(ui.hero.tagline)}
            <Sparkle className="hero__role-icon" />
          </motion.p>

          <motion.h1 className="hero__name" variants={item}>
            {profile.name}
          </motion.h1>

          <motion.p className="hero__headline" variants={item}>
            {t(ui.hero.headline)}
          </motion.p>

          <motion.p className="hero__sub" variants={item}>
            {t(ui.hero.sub)}
          </motion.p>

          <motion.div className="hero__cta" variants={item}>
            <a
              className="btn btn--primary"
              href={profile.resumePath}
              download="Resume - Nguyen Trong Thuan - Software Engineer.pdf"
            >
              <Download />
              {t(ui.actions.downloadCv)}
            </a>
            <a
              className="btn btn--ghost"
              href="#contact"
              onClick={scrollTo('contact')}
            >
              {t(ui.actions.getInTouch)}
            </a>
          </motion.div>

          <motion.div className="hero__meta" variants={item}>
            <span className="hero__loc">
              <MapPin /> {t(profile.location)}
            </span>
            <span className="hero__socials">
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hero__social"
              >
                <Github />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hero__social"
              >
                <LinkedIn />
              </a>
              <a
                href={social.email}
                aria-label="Email"
                className="hero__social"
              >
                <Mail />
              </a>
            </span>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero__aside"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
        >
          <Terminal />
        </motion.aside>
      </div>

      <a className="hero__scroll" href="#about" onClick={scrollTo('about')}>
        <span className="hero__scroll-track" aria-hidden="true">
          <span className="hero__scroll-thumb" />
        </span>
      </a>
    </section>
  )
}
