import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { TextLink } from '@/components/shared/text-link'
import { Spinner } from '@/components/ui/spinner'
import { fullAddress, site } from '@/content/site'

// MapLibre pesa 1 MB: el título y la dirección se pintan sin esperarlo, y el recuadro
// guarda su sitio para que la página no salte cuando llega el mapa.
const OfficeMapCanvas = lazy(() =>
  import('@/components/sections/office-map-canvas').then((module) => ({
    default: module.OfficeMapCanvas,
  })),
)

export function OfficeMap() {
  const { t } = useTranslation()

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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <SectionHeading title={t('contact.map.title')} />
          <p className="text-[15px] text-muted-foreground">{fullAddress}</p>
        </div>
        <TextLink>
          <a href={site.address.mapsUrl} target="_blank" rel="noreferrer">
            {t('contact.map.directions')}
          </a>
        </TextLink>
      </div>

      {/* `isolate` encierra los z-index del mapa para que no tapen el header ni el menú */}
      <div
        role="region"
        aria-label={t('contact.map.label', { address: fullAddress })}
        className="relative isolate h-96 overflow-hidden rounded-lg border border-border bg-card sm:h-110"
      >
        <Suspense fallback={loading}>
          <OfficeMapCanvas loading={loading} />
        </Suspense>
      </div>
    </Section>
  )
}
