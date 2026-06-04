import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  tags: string[]
  className?: string
  label?: string
}

const FADE = '26px'

/**
 * A single-line tag strip that gently auto-scrolls (ping-pong) and can be
 * dragged (mouse) or scrolled (touch/wheel). Edge fades + the grab cursor
 * only appear when the content actually overflows, and each edge only fades
 * when there is hidden content on that side. Auto-scroll pauses on hover and
 * while the pointer is down, and is disabled under prefers-reduced-motion.
 */
export function TagMarquee({ tags, className, label = 'Technologies' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let dir = 1
    let acc = 0
    let hovering = false
    let pointerDown = false
    let dragging = false
    let startX = 0
    let startScroll = 0
    let curL = ''
    let curR = ''
    let curScrollable: boolean | null = null
    const speed = 0.4 // px per frame

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth
      const overflow = max > 2

      if (!reduced && !hovering && !pointerDown && overflow) {
        // accumulate fractionally but only write integer scrollLeft
        // (browsers round scrollLeft, so sub-pixel writes never move it)
        acc += speed
        const step = Math.floor(acc)
        if (step >= 1) {
          acc -= step
          let next = el.scrollLeft + step * dir
          if (next >= max) {
            next = max
            dir = -1
          } else if (next <= 0) {
            next = 0
            dir = 1
          }
          el.scrollLeft = next
        }
      }

      // fade only the side(s) that still have hidden content
      const l = overflow && el.scrollLeft > 1 ? FADE : '0px'
      const r = overflow && el.scrollLeft < max - 1 ? FADE : '0px'
      if (l !== curL) {
        curL = l
        el.style.setProperty('--fade-l', l)
      }
      if (r !== curR) {
        curR = r
        el.style.setProperty('--fade-r', r)
      }
      if (overflow !== curScrollable) {
        curScrollable = overflow
        el.classList.toggle('is-scrollable', overflow)
      }

      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      hovering = true
    }
    const onLeave = () => {
      hovering = false
    }
    const onDown = (e: PointerEvent) => {
      pointerDown = true
      if (e.pointerType === 'mouse') {
        dragging = true
        startX = e.clientX
        startScroll = el.scrollLeft
        el.setPointerCapture(e.pointerId)
        el.classList.add('is-dragging')
      }
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      el.scrollLeft = startScroll - (e.clientX - startX)
    }
    const onUp = (e: PointerEvent) => {
      pointerDown = false
      if (dragging) {
        dragging = false
        el.classList.remove('is-dragging')
        try {
          el.releasePointerCapture(e.pointerId)
        } catch {
          /* ignore */
        }
      }
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [reduced, tags])

  return (
    <div
      ref={ref}
      className={`tag-marquee${className ? ` ${className}` : ''}`}
      role="list"
      aria-label={label}
    >
      {tags.map((t) => (
        <span className="tag" role="listitem" key={t}>
          {t}
        </span>
      ))}
    </div>
  )
}
