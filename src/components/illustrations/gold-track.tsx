import { useInView } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const SEGMENT_SECONDS = 0.45

type GoldTrackItem = {
  id: string
  title: ReactNode
  detail?: ReactNode
}

type GoldTrackProps = {
  items: Array<GoldTrackItem>
  /** Pasa a horizontal desde `lg`; en móvil siempre es vertical. */
  horizontal?: boolean
  /** El último tramo queda punteado y su punto hueco: una etapa que puede no llegar. */
  open?: boolean
  className?: string
}

/**
 * Línea dorada que recorre una secuencia al entrar en pantalla. Los textos se
 * ven desde el principio: lo único que se anima es el trazo y sus puntos.
 */
export function GoldTrack({
  items,
  horizontal = false,
  open = false,
  className,
}: GoldTrackProps) {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })

  return (
    <ol
      ref={ref}
      data-active={inView}
      className={cn(
        'group',
        horizontal && 'lg:grid lg:grid-flow-col lg:auto-cols-fr',
        className,
      )}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1
        const delay = { transitionDelay: `${i * SEGMENT_SECONDS}s` }
        return (
          <li
            key={item.id}
            className={cn(
              'relative pl-8',
              !last && 'pb-6',
              horizontal && 'lg:pt-8 lg:pr-6 lg:pb-0 lg:pl-0',
            )}
          >
            {!last && (
              <span
                aria-hidden="true"
                style={delay}
                className={cn(
                  'absolute top-[11px] -bottom-[11px] left-[7px] border-l border-gold-500 [clip-path:inset(0_-2px_100%_-2px)] transition-[clip-path] duration-[450ms] ease-linear group-data-[active=true]:[clip-path:inset(0_-2px_0_-2px)] motion-reduce:transition-none',
                  open && i === items.length - 2 && 'border-dashed',
                  horizontal &&
                    'lg:top-[7px] lg:-right-[7px] lg:bottom-auto lg:border-t lg:border-l-0 lg:[clip-path:inset(-2px_100%_-2px_0)] lg:group-data-[active=true]:[clip-path:inset(-2px_0_-2px_0)]',
                )}
              />
            )}
            <span
              aria-hidden="true"
              style={delay}
              className={cn(
                'absolute top-1 left-0 size-[15px] rounded-full border border-border bg-background transition-colors duration-300 group-data-[active=true]:border-gold-500 motion-reduce:transition-none',
                !(open && last) && 'group-data-[active=true]:bg-gold-500',
                horizontal && 'lg:top-0',
              )}
            />
            {item.title}
            {item.detail}
          </li>
        )
      })}
    </ol>
  )
}
