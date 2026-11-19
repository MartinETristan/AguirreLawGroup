import { Suspense, lazy, useState } from 'react'
import { NavigationIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@/components/ui/segmented-control'
import { Spinner } from '@/components/ui/spinner'
import { officeAddress, officeDirectionsUrl, site } from '@/content/site'
import type { OfficeId } from '@/content/site'

// MapLibre pesa 1 MB: el título y la dirección se pintan sin esperarlo, y el recuadro
// guarda su sitio para que la página no salte cuando llega el mapa.
const OfficeMapCanvas = lazy(() =>
  import('@/components/sections/office-map-canvas').then((module) => ({
    default: module.OfficeMapCanvas,
  })),
)

export function OfficeMap() {
  const { t } = useTranslation()
  const [officeId, setOfficeId] = useState<OfficeId>(site.offices[0].id)
  const office = site.offices.find(({ id }) => id === officeId)!
  const address = officeAddress(office)

  const loading = (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner
        aria-label={t('contact.map.loading')}
        className="size-6 text-muted-foreground"
      />
    </div>
  )

  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionHeading title={t('contact.map.title')} />
        <p className="text-[15px] text-muted-foreground">
          {address}
          {office.kind === 'appointment' &&
            ` · ${t('common.officeAppointment')}`}
        </p>
      </div>

      <SegmentedControl
        value={officeId}
        onValueChange={(value) => setOfficeId(value as OfficeId)}
        aria-label={t('contact.map.offices')}
      >
        {site.offices.map(({ id, city }) => (
          <SegmentedControlItem key={id} value={id}>
            {city}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>

      {/* `isolate` encierra los z-index del mapa para que no tapen el header ni el menú */}
      <div
        role="region"
        aria-label={t('contact.map.label', { address })}
        className="relative isolate h-96 overflow-hidden rounded-lg border border-border bg-card sm:h-110"
      >
        <Suspense fallback={loading}>
          <OfficeMapCanvas office={office} loading={loading} />
        </Suspense>
      </div>

      <Button asChild size="lg" className="h-12 w-full gap-2 text-base">
        <a href={officeDirectionsUrl(office)} target="_blank" rel="noreferrer">
          <NavigationIcon />
          {t('contact.map.directions')}
        </a>
      </Button>
    </Section>
  )
}
