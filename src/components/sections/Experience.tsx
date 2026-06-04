import { motion } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { experience, ui } from '@/i18n/content'
import { fadeUp, VIEWPORT } from '@/lib/motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { RichText } from '@/components/ui/RichText'

export function Experience() {
  const { t } = useLang()
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <SectionHeader
          index="03"
          kicker="experience"
          title={ui.sections.experience.title}
          lead={ui.sections.experience.lead}
        />

        <ol className="timeline">
          {experience.map((job) => (
            <motion.li
              key={job.company}
              className="timeline__item"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <span className="timeline__marker" aria-hidden="true" />
              <div className="timeline__card card">
                <div className="timeline__head">
                  <div className="timeline__id">
                    <h3 className="timeline__company">
                      {job.company}
                      {job.org && (
                        <span className="timeline__org"> · {job.org}</span>
                      )}
                    </h3>
                    <p className="timeline__role">{t(job.role)}</p>
                  </div>
                  <span className="timeline__period mono">
                    {job.current && (
                      <span className="timeline__now">
                        <span className="timeline__now-dot" aria-hidden="true" />
                        {t(ui.meta.current)}
                      </span>
                    )}
                    {t(job.period)}
                  </span>
                </div>

                <p className="timeline__summary">{t(job.summary)}</p>

                <ul className="timeline__highlights">
                  {job.highlights.map((h, idx) => (
                    <li key={idx} id={h.id}>
                      <RichText text={t(h.text)} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
