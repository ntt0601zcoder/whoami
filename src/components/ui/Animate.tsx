import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import {
  EASE,
  VIEWPORT,
  staggerContainer,
  staggerItem,
} from '@/lib/motion'

interface Common {
  children: ReactNode
  className?: string
  style?: CSSProperties
  id?: string
}

/** Reveal a single block on scroll (fade + small lift), optionally delayed. */
export function Reveal({
  children,
  className,
  style,
  id,
  delay = 0,
}: Common & { delay?: number }) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, ease: EASE, delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className, style, id }: Common) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

/** A child of <Stagger>. */
export function StaggerItem({ children, className, style }: Common) {
  return (
    <motion.div className={className} style={style} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
