import { createFileRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

import { ContactSection } from '@/components/sections/contact-section'
import { isPracticeArea } from '@/content/practice-areas'
import type { PracticeArea } from '@/content/practice-areas'

// Leaflet y MapLibre son pesados: solo se descargan al abrir esta página.
const OfficeMap = lazy(() =>
  import('@/components/sections/office-map').then((module) => ({
    default: module.OfficeMap,
  })),
)

type ContactSearch = {
  area?: PracticeArea
}

export const Route = createFileRoute('/contact-us')({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    isPracticeArea(search.area) ? { area: search.area } : {},
  component: ContactPage,
})

function ContactPage() {
  const { area } = Route.useSearch()
  return (
    <>
      {/* key: si cambia el área desde otra tarjeta, el formulario se reinicia con ella */}
      <ContactSection key={area} defaultArea={area} headingAs="h1" />
      <Suspense fallback={<div className="h-160" />}>
        <OfficeMap />
      </Suspense>
    </>
  )
}
