import { useLang } from '@/i18n/LanguageContext'
import { education, ui } from '@/i18n/content'
import { Reveal } from '@/components/ui/Animate'

export function Education() {
  const { t } = useLang()
  return (
    <section className="section education" id="education">
      <div className="container">
        <Reveal>
          <span className="eyebrow">
            <span className="section-index">06</span>
            education
          </span>
          <h2 className="section-title education__title">
            {t(ui.sections.education.title)}
          </h2>

          <div className="edu">
            {education.map((e, i) => (
              <div className="edu__row" key={i}>
                <div className="edu__main">
                  <h3 className="edu__degree">{t(e.degree)}</h3>
                  <p className="edu__school">{t(e.school)}</p>
                </div>
                <div className="edu__meta">
                  <span className="edu__detail mono">{t(e.detail)}</span>
                  <span className="edu__period mono">{e.period}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
