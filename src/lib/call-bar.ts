import { useInView } from 'motion/react'
import { useEffect, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'

let covers = 0
const listeners = new Set<() => void>()

function changeCovers(delta: number) {
  covers += delta
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Indica si en pantalla hay algo que retira la barra de llamada móvil. */
export function useCallBarCovered() {
  return useSyncExternalStore(subscribe, () => covers > 0)
}

/** Retira la barra mientras este elemento esté en pantalla y montado. */
export function useHideCallBar(ref: RefObject<Element | null>) {
  const inView = useInView(ref)

  useEffect(() => {
    if (!inView) return
    changeCovers(1)
    return () => changeCovers(-1)
  }, [inView])
}
