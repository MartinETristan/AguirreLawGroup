import { preconnect, preload } from 'react-dom'

const TILES_ORIGIN = 'https://tiles.openfreemap.org'

export const OFFICE_MAP_STYLE_URL = `${TILES_ORIGIN}/styles/dark`
// Índice de tiles que declara el estilo; su URL lleva la fecha de publicación y por eso no se fija.
const TILE_INDEX_URL = `${TILES_ORIGIN}/planet`

/**
 * Adelanta en paralelo lo que el mapa pediría en cadena: su código, el estilo y el índice de tiles.
 * Se llama desde el `loader` de la ruta, así también arranca al apuntar a un enlace (`preload: intent`).
 */
export function preloadOfficeMap() {
  const crossOrigin = 'anonymous'
  preconnect(TILES_ORIGIN, { crossOrigin })
  preload(OFFICE_MAP_STYLE_URL, { as: 'fetch', crossOrigin })
  preload(TILE_INDEX_URL, { as: 'fetch', crossOrigin })
  void import('@/components/sections/office-map-canvas')
}
