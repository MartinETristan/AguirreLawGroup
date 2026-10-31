import { MapPinIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import {
  Map,
  MapMarker,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from '@/components/ui/map'
import { fullAddress, site } from '@/content/site'

// Sin `ThemeProvider`, `MapTileLayer` no sabe que el sitio es oscuro: se le indica el estilo.
// El estilo es gris casi negro; el filtro del lienzo lo lleva al azul marino del sitio.
const DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark'

export function OfficeMap() {
  const { t } = useTranslation()
  // En táctil un dedo debe mover la página, no el mapa; el mapa se mueve con dos dedos.
  const touch = window.matchMedia('(pointer: coarse)').matches

  return (
    <section className="border-t border-border">
      <Container className="flex flex-col gap-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <SectionHeading title={t('contact.map.title')} />
            <p className="text-[15px] text-muted-foreground">{fullAddress}</p>
          </div>
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="border-b border-primary-300/50 pt-2.5 pb-1 text-[15px] font-semibold text-link transition-colors hover:border-primary-300"
          >
            {t('contact.map.directions')}
          </a>
        </div>

        {/* `isolate` encierra los z-index de Leaflet para que no tapen el header ni el menú */}
        <div
          role="region"
          aria-label={t('contact.map.label', { address: fullAddress })}
          className="relative isolate h-96 overflow-hidden rounded-lg border border-border sm:h-110"
        >
          <Map
            center={site.address.geo}
            zoom={16}
            scrollWheelZoom={false}
            dragging={!touch}
            attributionControl
            className="rounded-none [&_.maplibregl-canvas]:[filter:sepia(1)_hue-rotate(180deg)_saturate(2.4)_brightness(1.7)]"
          >
            <MapTileLayer vectorStyleUrl={DARK_STYLE} />
            <MapMarker
              position={site.address.geo}
              title={site.name}
              alt={site.name}
              icon={
                <MapPinIcon className="size-9 fill-gold-500 stroke-background" />
              }
              iconAnchor={[18, 36]}
            >
              <MapTooltip permanent side="top" sideOffset={40}>
                {site.name}
              </MapTooltip>
            </MapMarker>
            <MapZoomControl position="top-2 left-2" />
          </Map>
        </div>
      </Container>
    </section>
  )
}
