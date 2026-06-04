import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  education,
  experience,
  profile,
  projects,
  social,
} from '@/i18n/content'
import { SECTION_CMDS, expId, projId, slugify } from '@/lib/sections'
import { scrollToAnchor } from '@/lib/scroll'

/* ----------------------------- output model ----------------------------- */
type Tone = 'out' | 'muted' | 'err' | 'cmd'
interface Seg {
  t: string
  b?: boolean
}
type Line =
  | { kind: 'text'; segs: Seg[]; tone?: Tone }
  | { kind: 'link'; label: string; target: string }

const parse = (text: string): Seg[] =>
  text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((p) =>
      p.startsWith('**') && p.endsWith('**')
        ? { t: p.slice(2, -2), b: true }
        : { t: p },
    )

const txt = (text: string, tone?: Tone): Line => ({
  kind: 'text',
  segs: parse(text),
  tone,
})
const open = (label: string, target: string): Line => ({
  kind: 'link',
  label,
  target,
})

/* ------------------------------ command set ----------------------------- */
const UTIL = [
  { name: 'help', desc: 'list commands' },
  { name: 'whoami', desc: 'identity' },
  { name: 'clear', desc: 'clear the screen' },
]
const ALL_TOP = [...SECTION_CMDS, ...UTIL]

const expNames = experience
  .map((j) => slugify(j.company.split(/\s+/)[0]))
  .join(' · ')

function build(cmd: string, arg: string): Line[] {
  switch (cmd) {
    case 'help': {
      const lines: Line[] = [txt('available commands', 'muted')]
      SECTION_CMDS.forEach((c) =>
        lines.push(txt(`  ${c.name.padEnd(11)}${c.desc}${c.subs ? ' ›' : ''}`)),
      )
      lines.push(txt(`  ${'help'.padEnd(11)}this list`))
      lines.push(txt(`  ${'clear'.padEnd(11)}clear the screen`))
      lines.push(
        txt('experience & projects take a name — e.g. experience vieon', 'muted'),
      )
      return lines
    }
    case 'ls':
      return [txt(SECTION_CMDS.map((c) => c.name).join('  '))]
    case 'whoami':
      return [
        txt(`**${profile.name.toLowerCase().replace(/\s+/g, '_')}**`),
        txt(`role    ${profile.role}`, 'muted'),
        txt('focus   devops · platform · backend', 'muted'),
        txt(`based   ${profile.location}`, 'muted'),
        txt('status  ● available', 'muted'),
      ]
    case 'about':
      return [
        txt(
          'Senior Platform Engineer at **VieON** — I build the infrastructure behind live video and large-scale backend systems.',
        ),
        txt('Reliability, scale, and systems that stay up.', 'muted'),
        open('open about', 'about'),
      ]
    case 'impact':
      return [
        txt('**700K** peak viewers · **10B+** telemetry/day'),
        txt('**~$1,400/mo** license saved · ~5 TB/day · ~150 ms failover', 'muted'),
        open('open impact', 'impact'),
      ]
    case 'experience': {
      if (arg) {
        const job = experience.find(
          (j) =>
            slugify(j.company.split(/\s+/)[0]) === arg ||
            j.company.toLowerCase().includes(arg),
        )
        if (!job)
          return [
            txt(`no such role: ${arg}`, 'err'),
            txt(`try: ${expNames}`, 'muted'),
          ]
        return [
          txt(`**${job.company}** — ${job.role}`),
          txt(job.period, 'muted'),
          txt(job.summary),
          open(`open ${slugify(job.company.split(/\s+/)[0])}`, expId(job.company)),
        ]
      }
      const lines: Line[] = experience.map((j) =>
        txt(`**${j.company}** · ${j.role} · ${j.period}`),
      )
      lines.push(txt(`details: experience <${expNames}>`, 'muted'))
      lines.push(open('open experience', 'experience'))
      return lines
    }
    case 'projects': {
      if (arg) {
        const p = projects.find(
          (x) => slugify(x.name) === arg || x.name.toLowerCase().includes(arg),
        )
        if (!p)
          return [
            txt(`no such project: ${arg}`, 'err'),
            txt('run projects to list them', 'muted'),
          ]
        return [
          txt(`**${p.name}** · ${p.language}`),
          txt(p.tagline, 'muted'),
          txt(p.description),
          open(`open ${slugify(p.name)}`, projId(p)),
        ]
      }
      const lines: Line[] = projects.map((p) =>
        txt(`**${p.name}** — ${p.tagline}`),
      )
      lines.push(txt('details: projects <name>', 'muted'))
      lines.push(open('open projects', 'projects'))
      return lines
    }
    case 'stack':
      return [
        txt('**lang**   Go · Python · JavaScript · Bash'),
        txt('**data**   MySQL · Redis · MongoDB · Elasticsearch · Clickhouse'),
        txt('**devops** Kubernetes · Terraform · Grafana · Consul · Vault · OTel'),
        open('open stack', 'stack'),
      ]
    case 'education': {
      const e = education[0]
      return [
        txt(`**${e.degree}**`),
        txt(`${e.school} · ${e.detail} · ${e.period}`, 'muted'),
        open('open education', 'education'),
      ]
    }
    case 'contact':
      return [
        txt(`email     ${profile.email}`),
        txt(`linkedin  ${social.linkedin.replace('https://www.', '')}`),
        txt(`github    ${social.github.replace('https://', '')}`),
        txt(`phone     ${profile.phone}`),
        open('open contact', 'contact'),
      ]
    default:
      return [
        txt(`command not found: ${cmd}`, 'err'),
        txt("type 'help' to see what I can show you", 'muted'),
      ]
  }
}

const WELCOME: Line[] = [
  txt('interactive terminal — type a command, hit enter.', 'muted'),
  txt("sections: about · impact · experience · projects · stack · education · contact", 'muted'),
  txt("try 'help', or 'experience vieon'.", 'muted'),
]

interface Suggestion {
  token: string
  hint: string
  run: string
}

/* ------------------------------ component ------------------------------- */
export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Line[]>(WELCOME)
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const histRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const suggestions = useMemo<Suggestion[]>(() => {
    const trailing = /\s$/.test(input)
    const toks = input.trim().length ? input.trim().split(/\s+/) : []
    const top = (c: (typeof ALL_TOP)[number]): Suggestion => ({
      token: c.name,
      hint: 'subs' in c && c.subs ? `${c.desc} ›` : c.desc,
      run: c.name,
    })
    if (toks.length === 0) return ALL_TOP.map(top)
    if (toks.length === 1 && !trailing) {
      const q = toks[0].toLowerCase()
      return ALL_TOP.filter((c) => c.name.startsWith(q)).map(top)
    }
    const parent = SECTION_CMDS.find((c) => c.name === toks[0].toLowerCase())
    if (parent?.subs) {
      const q = (trailing ? '' : toks[1] ?? '').toLowerCase()
      return parent.subs
        .filter(
          (s) => s.name.startsWith(q) || s.label.toLowerCase().includes(q),
        )
        .map((s) => ({
          token: s.name,
          hint: s.label,
          run: `${parent.name} ${s.name}`,
        }))
    }
    return []
  }, [input])

  // keep the latest output and the input in view
  useEffect(() => {
    if (isOpen && histRef.current)
      histRef.current.scrollTop = histRef.current.scrollHeight
  }, [history, isOpen])

  // focus input + lock body scroll + global Esc while open
  useEffect(() => {
    if (!isOpen) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 60)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const run = (raw: string) => {
    const text = raw.trim()
    setInput('')
    setSel(0)
    if (!text) return
    const [cmd, ...rest] = text.split(/\s+/)
    const lower = cmd.toLowerCase()
    if (lower === 'clear') {
      setHistory([])
      return
    }
    setHistory((h) => [
      ...h,
      { kind: 'text', segs: [{ t: `$ ${text}` }], tone: 'cmd' },
      ...build(lower, rest.join(' ').toLowerCase()),
    ])
  }

  const goto = (target: string) => {
    setIsOpen(false)
    window.setTimeout(() => scrollToAnchor(target), 80)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      run(suggestions.length ? suggestions[sel]?.run ?? input : input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length) setInput(suggestions[sel]?.run ?? input)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (suggestions.length) setSel((s) => (s + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (suggestions.length)
        setSel((s) => (s - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const renderLine = (l: Line, i: number) => {
    if (l.kind === 'link')
      return (
        <button
          key={i}
          type="button"
          className="term-open"
          onClick={() => goto(l.target)}
        >
          {l.label} <span aria-hidden="true">→</span>
        </button>
      )
    return (
      <div key={i} className={`term-line term-line--${l.tone ?? 'out'}`}>
        {l.segs.map((s, j) => (s.b ? <b key={j}>{s.t}</b> : <span key={j}>{s.t}</span>))}
      </div>
    )
  }

  const dur = reduced ? 0 : 0.22

  return (
    <>
      {/* collapsed, clickable preview */}
      <button
        type="button"
        className="termcard termcard--btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open interactive terminal — type commands to explore"
      >
        <div className="termcard__bar">
          <span className="termcard__dot" />
          <span className="termcard__dot" />
          <span className="termcard__dot" />
          <span className="termcard__title mono">whoami</span>
        </div>
        <div className="termcard__body mono">
          <div className="termcard__line">
            <span className="termcard__prompt">$</span>
            <span>whoami</span>
          </div>
          <div className="termcard__line termcard__out">nguyen_trong_thuan</div>
          <div className="termcard__sep" />
          <div className="termcard__kv">
            <span className="termcard__key">role</span>
            <span className="termcard__val">{profile.role}</span>
          </div>
          <div className="termcard__kv">
            <span className="termcard__key">focus</span>
            <span className="termcard__val">devops · platform · backend</span>
          </div>
          <div className="termcard__kv">
            <span className="termcard__key">based</span>
            <span className="termcard__val">{profile.location}</span>
          </div>
          <div className="termcard__kv">
            <span className="termcard__key">status</span>
            <span className="termcard__val">
              <span className="termcard__pulse" />
              available
            </span>
          </div>
          <div className="termcard__line termcard__hintline">
            <span className="termcard__prompt">$</span>
            <span className="termcard__hint">type a command…</span>
            <span className="termcard__caret" />
          </div>
        </div>
        <span className="termcard__cta mono">
          click to run commands — try <b>experience</b> ↵
        </span>
      </button>

      {/* expanded interactive overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="term-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="term-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 }}
              transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="term-modal__bar">
                <span className="termcard__dot" />
                <span className="termcard__dot" />
                <span className="termcard__dot" />
                <span className="termcard__title mono">whoami — interactive</span>
                <button
                  type="button"
                  className="term-modal__close mono"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal"
                >
                  esc
                </button>
              </div>

              <div className="term-modal__hist mono" ref={histRef}>
                {history.map(renderLine)}
              </div>

              {suggestions.length > 0 && (
                <ul className="term-suggest mono">
                  {suggestions.map((s, i) => (
                    <li key={s.run}>
                      <button
                        type="button"
                        className={`term-suggest__item${
                          i === sel ? ' is-sel' : ''
                        }`}
                        onMouseEnter={() => setSel(i)}
                        onClick={() => run(s.run)}
                      >
                        <span className="term-suggest__token">{s.token}</span>
                        <span className="term-suggest__hint">{s.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="term-modal__inputline mono">
                <span className="termcard__prompt">$</span>
                <input
                  ref={inputRef}
                  className="term-input mono"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setSel(0)
                  }}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  placeholder="type a command…  (tab to complete · ↑↓ to pick)"
                  aria-label="Terminal command input"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
