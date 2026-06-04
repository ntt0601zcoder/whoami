import { motion } from 'framer-motion'
import { useLang } from '@/i18n/LanguageContext'
import { metrics, ui } from '@/i18n/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { scrollToAnchor } from '@/lib/scroll'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Counter } from '@/components/ui/Counter'
import { ArrowUpRight } from '@/components/ui/Icons'

export function Metrics() {
  const { t } = useLang()
  return (
    <section className="section impact" id="impact">
      <div className="container">
        <SectionHeader
          index="02"
          kicker="impact"
          title={ui.sections.impact.title}
          lead={ui.sections.impact.lead}
        />

        <motion.div
          className="impact__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {metrics.map((m, i) => {
            const full = `${m.prefix ?? ''}${m.value.toLocaleString('en-US')}${m.suffix}`
            const cell = `impact__cell${m.wide ? ' impact__cell--feature' : ''}`
            const inner = (
              <>
                <div className="impact__value mono" aria-hidden="true">
                  {m.prefix}
                  <Counter value={m.value} decimals={m.decimals} />
                  {m.suffix}
                </div>
                <div className="impact__meta">
                  <div className="impact__label">{t(m.label)}</div>
                  <div className="impact__context mono">{t(m.context)}</div>
                </div>
              </>
            )

            if (m.target) {
              return (
                <motion.button
                  key={i}
                  type="button"
                  className={`${cell} impact__cell--link`}
                  variants={staggerItem}
                  onClick={() => scrollToAnchor(m.target!)}
                  aria-label={`${full} — ${t(m.label)}. See where this comes from.`}
                >
                  {inner}
                  <span className="impact__cell-cue" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </motion.button>
              )
            }

            return (
              <motion.div
                key={i}
                className={cell}
                variants={staggerItem}
                aria-label={full}
              >
                {inner}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
