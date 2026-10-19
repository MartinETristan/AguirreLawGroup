import { createFileRoute } from '@tanstack/react-router'

import { ContactSection } from '@/components/sections/contact-section'
import { isPracticeArea } from '@/content/practice-areas'
import type { PracticeArea } from '@/content/practice-areas'

type ContactSearch = {
  area?: PracticeArea
}

export const Route = createFileRoute('/contacto')({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    isPracticeArea(search.area) ? { area: search.area } : {},
  component: ContactPage,
})

function ContactPage() {
  const { area } = Route.useSearch()
  // key: si cambia el área desde otra tarjeta, el formulario se reinicia con ella
  return <ContactSection key={area} defaultArea={area} headingAs="h1" />
}
