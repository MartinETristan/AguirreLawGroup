import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Tarjeta destacada con filete dorado superior. `asChild` la aplica a otro elemento, como un `<form>`. */
export function GoldCard({
  asChild = false,
  className,
  ...props
}: ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'div'

  return (
    <Comp
      className={cn(
        'rounded-lg border border-t-2 border-border border-t-gold-500 bg-card',
        className,
      )}
      {...props}
    />
  )
}

/** Rombo dorado decorativo: viñetas y separadores. */
export function GoldDiamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('size-1.5 rotate-45 bg-gold-500', className)}
    />
  )
}
