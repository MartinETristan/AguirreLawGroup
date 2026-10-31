import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

// Ancho de cada renglón (%); los marcados son los que el repaso se detiene a subrayar.
const LINES = [94, 82, 88, 67, 91, 76, 85, 58]
const FLAGGED = [2, 5]
const SCAN_SECONDS = 2

/**
 * Hoja numerada como un escrito judicial, sin texto legible: una banda de luz la
 * recorre y deja dos renglones subrayados. No muestra ningún resultado.
 */
export function EvidenceSheet({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active={inView}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card py-4',
        className,
      )}
    >
      <div className="absolute inset-y-0 left-11 w-[3px] border-x border-border" />

      {LINES.map((width, i) => {
        const flagged = FLAGGED.includes(i)
        const reached = ((i + 0.5) / LINES.length) * SCAN_SECONDS
        return (
          <div key={i} className="flex h-7 items-center">
            <span
              style={{ transitionDelay: `${reached}s` }}
              className={cn(
                'w-11 shrink-0 pr-3 text-right text-[13px] text-muted-foreground tabular-nums transition-colors duration-300 motion-reduce:transition-none',
                flagged && 'group-data-[active=true]:text-complementary',
              )}
            >
              {i + 1}
            </span>
            <div className="relative ml-4 flex-1 pr-5">
              <div
                style={{ width: `${width}%` }}
                className="relative h-1.5 rounded-[1px] bg-muted-foreground/25"
              >
                {flagged && (
                  <motion.span
                    className="absolute inset-x-0 -bottom-1.5 h-px origin-left bg-gold-500"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : undefined}
                    transition={{
                      duration: 0.5,
                      ease: 'easeOut',
                      delay: reached,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* La banda ocupa toda la hoja y solo su borde inferior es visible al bajar */}
      <motion.div
        className="pointer-events-none absolute inset-0 border-b border-primary-300/60 bg-linear-to-b from-transparent from-70% to-primary-300/15 motion-reduce:hidden"
        initial={{ y: '-100%', opacity: 0 }}
        animate={
          inView ? { y: ['-100%', '0%'], opacity: [1, 1, 1, 0] } : undefined
        }
        transition={{ duration: SCAN_SECONDS, ease: 'linear' }}
      />
    </div>
  )
}
