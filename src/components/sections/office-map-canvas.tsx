import {
  Map as MapLibreMap,
  Marker,
  MercatorCoordinate,
  setWorkerUrl,
} from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { MapPinIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { site } from '@/content/site'
import type { Office } from '@/content/site'
import { OFFICE_MAP_STYLE_URL } from '@/lib/office-map'
import { cn } from '@/lib/utils'

import 'maplibre-gl/dist/maplibre-gl.css'

// MapLibre 6 busca su worker junto a su propio módulo. Vite pre-empaqueta ese módulo en desarrollo y ahí
// no hay worker («Worker failed to load»), y en el build tampoco lo emite: se declara el archivo
// (autocontenido, sin imports) para que Vite lo sirva y lo copie.
setWorkerUrl(workerUrl)

const OFFICE_ZOOM = 16
const MAX_ZOOM = 18
// `MapLibre` mide el mundo en múltiplos de 512 px por cada nivel de zoom.
const WORLD_SIZE = 512
const ZOOM_TOLERANCE = 0.01
// Mitad del lado del cuadrado que se deja ver alrededor de cada oficina.
const MAP_HALF_SIDE_METERS = 8000

type Bounds = [[number, number], [number, number]]

/**
 * Límites del mapa: un cuadrado perfecto (en la proyección del mapa) con la oficina en el centro.
 * Al estar centrados en ella, alejar el zoom nunca desplaza la vista hacia un lado.
 */
function officeBounds({ geo }: Office): Bounds {
  const center = MercatorCoordinate.fromLngLat(geo)
  const half = MAP_HALF_SIDE_METERS * center.meterInMercatorCoordinateUnits()
  // En coordenadas de Mercator la `y` crece hacia el sur
  const southWest = new MercatorCoordinate(
    center.x - half,
    center.y + half,
  ).toLngLat()
  const northEast = new MercatorCoordinate(
    center.x + half,
    center.y - half,
  ).toLngLat()
  return [
    [southWest.lng, southWest.lat],
    [northEast.lng, northEast.lat],
  ]
}

/** Zoom mínimo con el que el visor cabe dentro de los límites, para no ver nada fuera de ellos. */
function minZoomInsideBounds(bounds: Bounds, width: number, height: number) {
  const [[west, south], [east, north]] = bounds
  const southWest = MercatorCoordinate.fromLngLat([west, south])
  const northEast = MercatorCoordinate.fromLngLat([east, north])
  const fit = Math.max(
    width / (northEast.x - southWest.x),
    height / (southWest.y - northEast.y),
  )
  return Math.ceil(Math.log2(fit / WORLD_SIZE) * 100) / 100
}

export function OfficeMapCanvas({
  office,
  loading,
}: {
  office: Office
  loading: ReactNode
}) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap>(null)
  const markerRef = useRef<Marker>(null)
  // El mapa se crea una sola vez; la oficina que se elige después llega por este ref y el efecto de abajo.
  const officeRef = useRef(office)
  officeRef.current = office
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
        center: officeRef.current.geo,
        zoom: OFFICE_ZOOM,
        maxZoom: MAX_ZOOM,
        maxBounds: officeBounds(officeRef.current),
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
            address: officeRef.current.street,
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
        minZoomInsideBounds(
          officeBounds(officeRef.current),
          container!.clientWidth,
          container!.clientHeight,
        ),
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
    // El estilo oscuro de OpenFreeMap pide iconos que su sprite no trae (p. ej. `wood-pattern` en
    // `landcover_wood`); un píxel transparente los cubre y evita el aviso en consola. Desde MapLibre 6
    // el evento `styleimagemissing` llega tarde (no puede resolver la imagen): se usa el resolver.
    map.setMissingStyleImageResolver((id) => {
      if (!map.hasImage(id))
        map.addImage(id, { width: 1, height: 1, data: new Uint8Array(4) })
    })
    map.on('load', () => setStatus('ready'))
    // Un tile suelto puede fallar sin impedir la carga: `load` corrige este estado si llega a ocurrir.
    map.on('error', () => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    })

    markerRef.current = new Marker({ element: markerElement, anchor: 'bottom' })
      .setLngLat(officeRef.current.geo)
      .addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [markerElement, t])

  // Al cambiar de oficina el mapa viaja hasta ella. Mientras vuela los límites de la anterior no
  // aplican (la nueva oficina cae fuera de ellos), así que se retiran y se fijan al aterrizar.
  const appliedOfficeId = useRef(office.id)
  useEffect(() => {
    const map = mapRef.current
    if (!map || appliedOfficeId.current === office.id) return
    appliedOfficeId.current = office.id

    markerRef.current?.setLngLat(office.geo)

    const container = map.getContainer()
    const bounds = officeBounds(office)
    function lockBounds() {
      map!.setMaxBounds(bounds)
      map!.setMinZoom(
        minZoomInsideBounds(
          bounds,
          container.clientWidth,
          container.clientHeight,
        ),
      )
    }

    map.setMaxBounds(null)
    map.setMinZoom(0)
    map.once('moveend', lockBounds)
    const target = { center: office.geo, zoom: OFFICE_ZOOM }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      map.jumpTo(target)
    else map.flyTo({ ...target, essential: false })
  }, [office])

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
