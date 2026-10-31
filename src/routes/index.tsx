import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactSection } from '@/components/sections/contact-section'
import { FirmApproach } from '@/components/sections/firm-approach'
import { HeroParallax } from '@/components/sections/hero-parallax'
import { PracticeAreas } from '@/components/sections/practice-areas'
import { Testimonials } from '@/components/sections/testimonials'

export const Route = createFileRoute('/')({ component: Home })

// Orden de `Main.dc.html` del canvas, sin la franja de valores (el lema sigue en el footer).
// `condensed` deja lo esencial; el texto completo vive en la ruta propia de cada sección.
function Home() {
  return (
    <>
      <HeroParallax />
      <PracticeAreas condensed />
      <FirmApproach condensed />
      <AttorneyProfile condensed />
      <Testimonials />
      <ContactSection condensed />
    </>
  )
}
