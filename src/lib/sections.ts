import { experience, projects } from '@/i18n/content'

/** kebab-case slug used for command names and anchor ids. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Anchor id for an experience company card (shared by Experience + Terminal). */
export const expId = (company: string) => `exp-${slugify(company.split(/\s+/)[0])}`

/** Anchor id for a project card (shared by Projects + Terminal). */
export const projId = (p: { id?: string; name: string }) =>
  p.id ?? `proj-${slugify(p.name)}`

export interface TermSub {
  name: string
  label: string
  target: string
}
export interface TermCmd {
  name: string
  desc: string
  target?: string
  subs?: TermSub[]
}

/** The navigable sections, in page order — drives the terminal autocomplete. */
export const SECTION_CMDS: TermCmd[] = [
  { name: 'about', desc: 'who I am', target: 'about' },
  { name: 'impact', desc: 'numbers', target: 'impact' },
  {
    name: 'experience',
    desc: 'where I worked',
    target: 'experience',
    subs: experience.map((j) => ({
      name: slugify(j.company.split(/\s+/)[0]),
      label: j.company,
      target: expId(j.company),
    })),
  },
  {
    name: 'projects',
    desc: 'what I built',
    target: 'projects',
    subs: projects.map((p) => ({
      name: slugify(p.name),
      label: p.name,
      target: projId(p),
    })),
  },
  { name: 'stack', desc: 'tools I reach for', target: 'stack' },
  { name: 'education', desc: 'studies', target: 'education' },
  { name: 'contact', desc: 'reach me', target: 'contact' },
]
