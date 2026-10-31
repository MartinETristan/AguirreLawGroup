import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactCta } from '@/components/sections/contact-cta'
import { FirmApproach } from '@/components/sections/firm-approach'

export const Route = createFileRoute('/about-us')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <FirmApproach headingAs="h1" />
      <AttorneyProfile />
      <ContactCta />
    </>
  )
}
