import { Map as MapLibreMap, Marker, MercatorCoordinate } from 'maplibre-gl'
import { MapPinIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import cityLimits from '@/content/brownsville-limits.json'
import { site } from '@/content/site'
import { OFFICE_MAP_STYLE_URL } from '@/lib/office-map'
import { cn } from '@/lib/utils'

import 'maplibre-gl/dist/maplibre-gl.css'

const { geo, mapBounds } = site.address
const OFFICE_ZOOM = 16
const MAX_ZOOM = 18
// `MapLibre` mide el mundo en múltiplos de 512 px por cada nivel de zoom.
const WORLD_SIZE = 512
const ZOOM_TOLERANCE = 0.01
// Los límites son un rectángulo y dejan ver Matamoros: lo que queda fuera de la ciudad se atenúa.
const OUTSIDE_RING = [
  [-98.5, 25],
  [-96.5, 25],
  [-96.5, 27],
  [-98.5, 27],
  [-98.5, 25],
]

/** Zoom mínimo con el que el visor cabe dentro de los límites, para no ver nada fuera de ellos. */
function minZoomInsideBounds(width: number, height: number) {
  const [[west, south], [east, north]] = mapBounds
  const southWest = MercatorCoordinate.fromLngLat([west, south])
  const northEast = MercatorCoordinate.fromLngLat([east, north])
  const fit = Math.max(
    width / (northEast.x - southWest.x),
    height / (southWest.y - northEast.y),
  )
  return Math.ceil(Math.log2(fit / WORLD_SIZE) * 100) / 100
}

export function OfficeMapCanvas({ loading }: { loading: ReactNode }) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap>(null)
  const [markerElement] = useState(() => document.createElement('div'))
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>(
    'loading',
  )
  const [zoomLimit, setZoomLimit] = useState<'min' | 'max' | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // En táctil un dedo debe mover la página, no el mapa; el mapa se mueve con dos dedos.
    const touch = window.matchMedia('(pointer: coarse)').matches

    let map: MapLibreMap
    try {
      map = new MapLibreMap({
        container,
        style: OFFICE_MAP_STYLE_URL,
        center: geo,
        zoom: OFFICE_ZOOM,
        maxZoom: MAX_ZOOM,
        maxBounds: mapBounds,
        renderWorldCopies: false,
        // Las etiquetas aparecen de inmediato en vez de desvanecerse
        fadeDuration: 0,
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        cooperativeGestures: touch,
        // El crédito se ve al cargar y se colapsa en un icono al primer arrastre (licencia de OSM)
        attributionControl: { compact: true },
        locale: {
          'AttributionControl.ToggleAttribution': t('contact.map.attribution'),
          'Map.Title': t('contact.map.label', {
            address: site.address.street,
          }),
          'Marker.Title': site.name,
          'CooperativeGesturesHandler.MobileHelpText': t(
            'contact.map.touchHint',
          ),
        },
      })
    } catch {
      // Sin WebGL no hay mapa; queda el aviso y el enlace "Cómo llegar".
      setStatus('failed')
      return
    }
    mapRef.current = map
    map.touchZoomRotate.disableRotation()

    function syncMinZoom() {
      map.setMinZoom(
        minZoomInsideBounds(container!.clientWidth, container!.clientHeight),
      )
    }
    function syncZoomLimit() {
      const zoom = map.getZoom()
      if (zoom >= MAX_ZOOM - ZOOM_TOLERANCE) setZoomLimit('max')
      else if (zoom <= map.getMinZoom() + ZOOM_TOLERANCE) setZoomLimit('min')
      else setZoomLimit(null)
    }

    syncMinZoom()
    map.on('resize', () => {
      syncMinZoom()
      syncZoomLimit()
    })
    map.on('zoomend', syncZoomLimit)
    map.on('load', () => {
      map.addSource('outside-city', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          // Un rectángulo mayor que los límites con la ciudad como hueco
          geometry: {
            type: 'Polygon',
            coordinates: [OUTSIDE_RING, cityLimits],
          },
        },
      })
      map.addLayer({
        id: 'outside-city',
        type: 'fill',
        source: 'outside-city',
        paint: { 'fill-color': '#000', 'fill-opacity': 0.72 },
      })
      setStatus('ready')
    })
    // Un tile suelto puede fallar sin impedir la carga: `load` corrige este estado si llega a ocurrir.
    map.on('error', () => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    })

    new Marker({ element: markerElement, anchor: 'bottom' })
      .setLngLat(geo)
      .addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [markerElement, t])

  return (
    <>
      {/* Sin clases de posición: `.maplibregl-map` ya fija la suya. El filtro lleva el gris del estilo al azul marino */}
      <div
        ref={containerRef}
        className={cn(
          'size-full transition-opacity duration-300 [&_.maplibregl-canvas]:[filter:sepia(1)_hue-rotate(180deg)_saturate(2.4)_brightness(1.7)] [&_.maplibregl-ctrl-attrib]:bg-background/85! [&_.maplibregl-ctrl-attrib]:text-[11px]/4! [&_.maplibregl-ctrl-attrib]:text-muted-foreground! [&_.maplibregl-ctrl-attrib_a]:text-muted-foreground! [&_.maplibregl-ctrl-attrib-button]:invert',
          status !== 'ready' && 'opacity-0',
        )}
      />

      {status === 'loading' && loading}
      {status === 'failed' && (
        <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-[15px] text-muted-foreground">
          {t('contact.map.unavailable')}
        </p>
      )}

      {status === 'ready' && (
        <ButtonGroup
          orientation="vertical"
          aria-label={t('contact.map.zoom')}
          className="absolute top-2 left-2"
        >
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label={t('contact.map.zoomIn')}
            title={t('contact.map.zoomIn')}
            className="size-11 border"
            disabled={zoomLimit === 'max'}
            onClick={() => mapRef.current?.zoomIn()}
          >
            <PlusIcon />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label={t('contact.map.zoomOut')}
            title={t('contact.map.zoomOut')}
            className="size-11 border"
            disabled={zoomLimit === 'min'}
            onClick={() => mapRef.current?.zoomOut()}
          >
            <MinusIcon />
          </Button>
        </ButtonGroup>
      )}

      {createPortal(
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-sm border border-border bg-popover px-2 py-1 text-[13px] font-semibold whitespace-nowrap text-popover-foreground shadow-sm">
            {site.name}
          </span>
          <MapPinIcon
            aria-hidden="true"
            className="size-9 fill-gold-500 stroke-background"
          />
        </div>,
        markerElement,
      )}
    </>
  )
}
