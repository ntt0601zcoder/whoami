import { useLang } from '@/i18n/LanguageContext'
import { summary, ui } from '@/i18n/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Animate'
import { RichText } from '@/components/ui/RichText'

export function About() {
  const { t } = useLang()
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeader index="01" kicker="about" title={ui.sections.about.title} />

        <Stagger className="about__prose">
          {summary.map((para, i) => (
            <StaggerItem key={i}>
              <p>
                <RichText text={t(para)} />
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
