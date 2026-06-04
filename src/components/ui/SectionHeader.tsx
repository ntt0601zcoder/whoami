import type { Localized } from '@/i18n/content'
import { useLang } from '@/i18n/LanguageContext'
import { Reveal } from './Animate'

interface Props {
  index: string
  kicker: string
  title: Localized
  lead?: Localized
}

export function SectionHeader({ index, kicker, title, lead }: Props) {
  const { t } = useLang()
  return (
    <Reveal className="section-head">
      <span className="eyebrow">
        <span className="section-index">{index}</span>
        {kicker}
      </span>
      <h2 className="section-title">{t(title)}</h2>
      {lead && <p className="section-lead">{t(lead)}</p>}
    </Reveal>
  )
}
