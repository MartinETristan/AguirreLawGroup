import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Enlace de texto subrayado. Envuelve el `<a>` o el `Link` que corresponda. */
export function TextLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <Slot.Root
      className={cn(
        'border-b border-primary-300/50 pt-2.5 pb-1 text-[15px] font-semibold text-link transition-colors hover:border-primary-300',
        className,
      )}
      {...props}
    />
  )
}
