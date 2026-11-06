import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactSection } from '@/components/sections/contact-section'
import { HeroParallax } from '@/components/sections/hero-parallax'
import { PersonalInjuryFocus } from '@/components/sections/personal-injury-focus'
import { PracticeAreas } from '@/components/sections/practice-areas'
import { Testimonials } from '@/components/sections/testimonials'

export const Route = createFileRoute('/')({ component: Home })

// Lesiones personales es la prioridad: va justo después del hero. Lo penal queda como
// secundario (lista compacta) y el proceso penal de `FirmApproach` vive en `/firm` y `/about-us`.
// `condensed` deja lo esencial; el texto completo vive en la ruta propia de cada sección.
function Home() {
  return (
    <>
      <HeroParallax />
      <PersonalInjuryFocus />
      <AttorneyProfile condensed />
      <PracticeAreas condensed />
      <Testimonials />
      <ContactSection condensed />
    </>
  )
}
