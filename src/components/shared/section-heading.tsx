import type { ReactNode } from 'react'

import { GoldRule, MaskLine, Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: ReactNode
  className?: string
}

/** Etiqueta en mayúsculas con filete dorado, usada sobre cada título. */
export function Eyebrow({ children, className }: EyebrowProps) {
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
  eyebrow: string
  title: string
  as?: 'h1' | 'h2'
  className?: string
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
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Heading className="font-heading text-[clamp(30px,3.6vw,44px)] leading-[1.1] text-foreground">
        <MaskLine delay={0.1}>{title}</MaskLine>
      </Heading>
    </div>
  )
}
