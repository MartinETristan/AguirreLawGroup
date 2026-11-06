import type { ReactNode } from 'react'

import { GoldRule, MaskLine, Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: ReactNode
  className?: string
}

/** Etiqueta en mayúsculas con filete dorado, usada sobre cada título. */
function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em] text-complementary uppercase',
        className,
      )}
    >
      <GoldRule className="w-8" />
      <span>{children}</span>
    </div>
  )
}

type SectionHeadingProps = {
  /** Sin etiqueta queda solo el filete dorado. */
  eyebrow?: string
  title: string
  as?: 'h1' | 'h2'
  className?: string
}

type CenteredHeadingProps = {
  title: string
  /** Subtítulo bajo el título, como entrada de la sección. */
  lead?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

/**
 * Variante centrada de `SectionHeading` que ocupa todo el ancho, sin etiqueta:
 * filete dorado que se dibuja desde el centro, título más grande y subtítulo opcional.
 */
export function CenteredHeading({
  title,
  lead,
  as: Heading = 'h2',
  className,
}: CenteredHeadingProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-4 text-center',
        className,
      )}
    >
      <Reveal>
        <GoldRule className="w-12 origin-center" />
      </Reveal>
      <Heading className="font-heading text-balance text-[clamp(34px,4.8vw,60px)] leading-[1.06] text-satin">
        <MaskLine delay={0.1}>{title}</MaskLine>
      </Heading>
      {lead && (
        <Reveal delay={0.25} className="max-w-3xl">
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', className)}>
      <Reveal>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : <GoldRule className="w-8" />}
      </Reveal>
      <Heading className="font-heading text-balance text-[clamp(30px,3.6vw,44px)] leading-[1.1] text-satin">
        <MaskLine delay={0.1}>{title}</MaskLine>
      </Heading>
    </div>
  )
}
