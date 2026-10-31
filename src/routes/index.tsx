import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactSection } from '@/components/sections/contact-section'
import { FirmApproach } from '@/components/sections/firm-approach'
import { HeroParallax } from '@/components/sections/hero-parallax'
import { PracticeAreas } from '@/components/sections/practice-areas'
import { Testimonials } from '@/components/sections/testimonials'
import { ValuesStrip } from '@/components/sections/values-strip'

export const Route = createFileRoute('/')({ component: Home })

// Mismo orden que `Main.dc.html` del canvas; cada sección tiene además su propia ruta.
function Home() {
  return (
    <>
      <HeroParallax />
      <ValuesStrip />
      <PracticeAreas />
      <FirmApproach />
      <AttorneyProfile />
      <Testimonials />
      <ContactSection />
    </>
  )
}
