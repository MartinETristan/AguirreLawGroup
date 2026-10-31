import { createFileRoute } from '@tanstack/react-router'

import { ContactCta } from '@/components/sections/contact-cta'
import { FirmApproach } from '@/components/sections/firm-approach'
import { ValuesStrip } from '@/components/sections/values-strip'

export const Route = createFileRoute('/firm')({ component: FirmPage })

function FirmPage() {
  return (
    <>
      <FirmApproach headingAs="h1" />
      <ValuesStrip />
      <ContactCta />
    </>
  )
}
