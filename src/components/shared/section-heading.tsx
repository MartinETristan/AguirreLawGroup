import type { ReactNode } from 'react'

import { GoldRule, MaskLine, Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: ReactNode
  className?: string
  centered?: boolean
}

/** Etiqueta en mayúsculas con filete dorado, usada sobre cada título. */
export function Eyebrow({ children, className, centered }: EyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3.5 text-[13px] font-semibold tracking-[0.18em] text-gold-800 uppercase',
        centered && 'justify-center',
        className,
      )}
    >
      <GoldRule />
      <span>{children}</span>
      {centered && <GoldRule className="origin-right" />}
    </div>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  as?: 'h1' | 'h2'
  centered?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  as: Heading = 'h2',
  centered,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-5',
        centered && 'mx-auto items-center text-center',
        className,
      )}
    >
      <Reveal>
        <Eyebrow centered={centered}>{eyebrow}</Eyebrow>
      </Reveal>
      <Heading className="font-heading text-4xl leading-[1.05] tracking-tight text-primary-950 sm:text-5xl lg:text-[56px]">
        <MaskLine delay={0.1}>{title}</MaskLine>
      </Heading>
    </div>
  )
}
