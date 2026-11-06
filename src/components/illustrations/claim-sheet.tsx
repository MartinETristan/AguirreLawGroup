import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { GoldDiamond } from '@/components/shared/gold'
import { cn } from '@/lib/utils'

const CHAR_SECONDS = 0.032
const LINE_PAUSE = 0.18

type ClaimLine = { label: string; detail: string }

/**
 * Hoja de reclamo que se escribe renglón por renglón al entrar en pantalla, como
 * la de evidencia del landing: el título de cada daño se teclea letra por letra
 * y su detalle aparece al terminar. No muestra montos ni resultados.
 * El texto real va en `sr-only`; la copia animada queda oculta a lectores de pantalla.
 */
export function ClaimSheet({
  title,
  lines,
  className,
}: {
  title: string
  lines: Array<ClaimLine>
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })

  // Cada renglón empieza cuando termina el anterior
  let cursor = 0.2
  const timed = lines.map((line) => {
    const start = cursor
    const duration = Array.from(line.label).length * CHAR_SECONDS
    cursor += duration + LINE_PAUSE
    return { ...line, start, duration }
  })

  return (
    <div
      ref={ref}
      data-active={inView}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-5 py-3 text-[13px] font-semibold tracking-[0.14em] text-complementary uppercase">
        <GoldDiamond />
        {title}
      </div>

      <ul className="sr-only">
        {lines.map((line) => (
          <li key={line.label}>
            {line.label}: {line.detail}
          </li>
        ))}
      </ul>

      <ol aria-hidden="true" className="relative py-2">
        <span className="absolute inset-y-0 left-11 w-[3px] border-x border-border" />
        {timed.map((line, i) => {
          const end = line.start + line.duration
          return (
            <li key={line.label} className="flex min-h-14 items-center py-2">
              <span
                style={{ transitionDelay: `${line.start}s` }}
                className="w-11 shrink-0 pr-3 text-right text-[13px] text-muted-foreground tabular-nums transition-colors duration-300 group-data-[active=true]:text-complementary motion-reduce:transition-none"
              >
                {i + 1}
              </span>
              <div className="ml-4 flex min-w-0 flex-1 flex-col gap-0.5 pr-5">
                <span className="text-[15px] leading-snug font-semibold text-foreground">
                  {Array.from(line.label).map((char, c) => (
                    <span
                      key={c}
                      style={{
                        transitionDelay: `${line.start + c * CHAR_SECONDS}s`,
                      }}
                      className="opacity-0 transition-opacity duration-75 group-data-[active=true]:opacity-100 motion-reduce:transition-none"
                    >
                      {char}
                    </span>
                  ))}
                  <motion.span
                    className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-gold-400 opacity-0 motion-reduce:hidden"
                    animate={
                      inView ? { opacity: [0, 1, 1, 0] } : undefined
                    }
                    transition={{
                      duration: line.duration + LINE_PAUSE,
                      times: [0, 0.01, 0.96, 1],
                      delay: line.start,
                      ease: 'linear',
                    }}
                  />
                </span>
                <span
                  style={{ transitionDelay: `${end}s` }}
                  className="text-sm leading-snug text-muted-foreground opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100 motion-reduce:transition-none"
                >
                  {line.detail}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
