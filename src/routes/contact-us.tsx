import { createFileRoute } from '@tanstack/react-router'

import { ContactSection } from '@/components/sections/contact-section'
import { OfficeMap } from '@/components/sections/office-map'
import { isPracticeArea } from '@/content/practice-areas'
import { preloadOfficeMap } from '@/lib/office-map'
import type { PracticeArea } from '@/content/practice-areas'

type ContactSearch = {
  area?: PracticeArea
}

export const Route = createFileRoute('/contact-us')({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    isPracticeArea(search.area) ? { area: search.area } : {},
  loader: () => preloadOfficeMap(),
  component: ContactPage,
})

function ContactPage() {
  const { area } = Route.useSearch()
  return (
    <>
      {/* key: si cambia el área desde otra tarjeta, el formulario se reinicia con ella */}
      <ContactSection key={area} defaultArea={area} headingAs="h1" />
      <OfficeMap />
    </>
  )
}
