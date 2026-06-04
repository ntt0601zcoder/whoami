import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/theme/ThemeContext'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Metrics } from '@/components/sections/Metrics'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Stack } from '@/components/sections/Stack'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <a className="skip-link" href="#about">
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <About />
          <Metrics />
          <Experience />
          <Projects />
          <Stack />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ThemeProvider>
    </MotionConfig>
  )
}
