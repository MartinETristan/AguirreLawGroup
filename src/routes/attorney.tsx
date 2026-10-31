import { createFileRoute } from '@tanstack/react-router'

import { AttorneyProfile } from '@/components/sections/attorney-profile'
import { ContactCta } from '@/components/sections/contact-cta'

export const Route = createFileRoute('/attorney')({ component: AttorneyPage })

function AttorneyPage() {
  return (
    <>
      {/* Mismo perfil que /about-us, con foto; aquí es el título principal de la página */}
      <AttorneyProfile headingAs="h1" />
      <ContactCta />
    </>
  )
}
