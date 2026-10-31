import { createFileRoute } from '@tanstack/react-router'

import { ContactCta } from '@/components/sections/contact-cta'
import { PracticeAreas } from '@/components/sections/practice-areas'

export const Route = createFileRoute('/practice-areas/')({ component: AreasPage })

function AreasPage() {
  return (
    <>
      <PracticeAreas headingAs="h1" />
      <ContactCta />
    </>
  )
}
