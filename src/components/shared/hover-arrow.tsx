import { ArrowRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/** Flecha que avanza al pasar sobre el elemento `group` que la contiene. */
export function HoverArrow({ className }: { className?: string }) {
  return (
    <ArrowRightIcon
      aria-hidden="true"
      className={cn(
        'transition-transform duration-500 group-hover:translate-x-1',
        className,
      )}
    />
  )
}
