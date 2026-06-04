import { useLang } from '@/i18n/LanguageContext'
import { profile, social, ui } from '@/i18n/content'
import { ArrowUp, Github, LinkedIn, Mail } from '@/components/ui/Icons'

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="mono footer__name">
            nguyen<span className="accent">.thuan</span>
          </span>
          <span className="footer__copy">
            © {year} {profile.name}. {t(ui.footer.rights)}
          </span>
        </div>

        <div className="footer__right">
          <div className="footer__socials">
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="footer__social"
            >
              <Github />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer__social"
            >
              <LinkedIn />
            </a>
            <a href={social.email} aria-label="Email" className="footer__social">
              <Mail />
            </a>
          </div>
          <button
            type="button"
            className="footer__totop"
            onClick={toTop}
            aria-label={t(ui.actions.backToTop)}
          >
            {t(ui.actions.backToTop)}
            <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
