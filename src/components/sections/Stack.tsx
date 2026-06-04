import { stack, ui } from '@/i18n/content'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Animate'

function TagRow({ items }: { items: string[] }) {
  return (
    <div className="tag-row">
      {items.map((it) => (
        <span className="tag" key={it}>
          {it}
        </span>
      ))}
    </div>
  )
}

export function Stack() {
  return (
    <section className="section stack" id="stack">
      <div className="container">
        <SectionHeader
          index="05"
          kicker="stack"
          title={ui.sections.stack.title}
          lead={ui.sections.stack.lead}
        />

        <Stagger className="stack__panel card">
          {stack.map((group) => (
            <StaggerItem key={group.label} className="stack__row">
              <div className="stack__row-label">{group.label}</div>
              <div className="stack__row-body">
                {group.items && <TagRow items={group.items} />}

                {group.subgroups &&
                  group.subgroups.map((sub) => (
                    <div className="stack__subrow" key={sub.label}>
                      <span className="stack__subrow-label">{sub.label}</span>
                      <TagRow items={sub.items} />
                    </div>
                  ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
