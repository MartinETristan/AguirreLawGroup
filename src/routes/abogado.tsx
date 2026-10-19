import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactCta } from '@/components/sections/contact-cta'

export const Route = createFileRoute('/abogado')({ component: AttorneyPage })

function AttorneyPage() {
  return (
    <>
      <AttorneyProfile headingAs="h1" />
      <ContactCta />
    </>
  )
}
