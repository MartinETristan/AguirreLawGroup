import { PhoneIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

type CallButtonProps = Pick<
  ComponentProps<typeof Button>,
  'variant' | 'className'
> & {
  /** Por defecto muestra el número de teléfono. */
  children?: ReactNode
}

/** Botón que llama a la oficina; el teléfono sale siempre de `site`. */
export function CallButton({ children, variant, className }: CallButtonProps) {
  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <a href={site.phone.href}>
        <PhoneIcon />
        {children ?? site.phone.display}
      </a>
    </Button>
  )
}
