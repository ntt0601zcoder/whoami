import { useLang } from '@/i18n/LanguageContext'
import { projects, ui } from '@/i18n/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Animate'
import { ArrowUpRight } from '@/components/ui/Icons'
import { projId } from '@/lib/sections'

export function Projects() {
  const { t } = useLang()
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <SectionHeader
          index="04"
          kicker="projects"
          title={ui.sections.projects.title}
          lead={ui.sections.projects.lead}
        />

        <Stagger className="projects__grid">
          {projects.map((p) => (
            <StaggerItem
              key={p.name}
              className={`projects__cell${
                p.featured ? ' projects__cell--featured' : ''
              }`}
            >
              <a
                id={projId(p)}
                className="project card"
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} — ${t(p.tagline)} (opens GitHub)`}
              >
                <div className="project__top">
                  <span className="project__lang mono">
                    <span className="project__lang-dot" aria-hidden="true" />
                    {p.language}
                  </span>
                  <span className="project__arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <h3 className="project__name">{p.name}</h3>
                <p className="project__tagline">{t(p.tagline)}</p>
                <p className="project__desc">{t(p.description)}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
