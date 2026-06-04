import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { profile, social, ui } from '@/i18n/content'
import { EASE } from '@/lib/motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Animate'
import { Github, LinkedIn, Mail, MapPin, Phone } from '@/components/ui/Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'
interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    const errs: FieldErrors = {}
    if (!name) errs.name = t(ui.contact.required)
    if (!email) errs.email = t(ui.contact.required)
    else if (!EMAIL_RE.test(email)) errs.email = t(ui.contact.invalidEmail)
    if (!message) errs.message = t(ui.contact.required)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio — message from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      form.reset()
      return
    }

    try {
      setStatus('sending')
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const directs = [
    { icon: <Mail />, label: profile.email, href: social.email },
    {
      icon: <LinkedIn />,
      label: 'linkedin.com/in/nguyen-trong-thuan',
      href: social.linkedin,
      external: true,
    },
    {
      icon: <Github />,
      label: 'github.com/ntt0601zcoder',
      href: social.github,
      external: true,
    },
    {
      icon: <Phone />,
      label: profile.phone,
      href: `tel:${profile.phoneHref}`,
    },
  ]

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeader
          index="07"
          kicker="contact"
          title={ui.sections.contact.title}
          lead={ui.sections.contact.lead}
        />

        <div className="contact__grid">
          <Reveal className="contact__form-wrap card">
            {status === 'sent' ? (
              <motion.div
                className="contact__sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="contact__sent-mark" aria-hidden="true">
                  ✓
                </span>
                <p>{t(ui.contact.sent)}</p>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="cf-name">{t(ui.contact.nameLabel)}</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t(ui.contact.namePh)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                  />
                  {errors.name && (
                    <span className="field__err" id="cf-name-err" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="cf-email">{t(ui.contact.emailLabel)}</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t(ui.contact.emailPh)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                  />
                  {errors.email && (
                    <span className="field__err" id="cf-email-err" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="cf-message">
                    {t(ui.contact.messageLabel)}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder={t(ui.contact.messagePh)}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? 'cf-message-err' : undefined
                    }
                  />
                  {errors.message && (
                    <span
                      className="field__err"
                      id="cf-message-err"
                      role="alert"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending'
                    ? t(ui.contact.sending)
                    : t(ui.contact.send)}
                </button>

                {status === 'error' && (
                  <p className="contact__error" role="alert">
                    {t(ui.contact.error)}
                  </p>
                )}
              </form>
            )}
          </Reveal>

          <Reveal className="contact__direct" delay={0.1}>
            <span className="contact__direct-label mono">
              {t(ui.contact.orReach)}
            </span>
            <ul className="contact__links">
              {directs.map((d) => (
                <li key={d.label}>
                  <a
                    className="contact__link"
                    href={d.href}
                    {...(d.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    <span className="contact__link-icon">{d.icon}</span>
                    <span className="contact__link-text">{d.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="contact__location">
              <MapPin /> {t(profile.location)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
