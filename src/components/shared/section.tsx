import type { ComponentProps } from 'react'

import { Container } from '@/components/shared/container'
import { cn } from '@/lib/utils'

type SectionProps = Omit<ComponentProps<'section'>, 'className'> & {
  /** Clases del `Container`, que es donde cada sección define su rejilla. */
  className?: string
  /** Clases de la propia `<section>`. */
  sectionClassName?: string
  /** Filete superior que separa la sección de la anterior. */
  bordered?: boolean
}

/** Bloque de página: filete superior, ancho máximo y la densidad vertical del sitio. */
export function Section({
  className,
  sectionClassName,
  bordered = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(bordered && 'border-t border-border', sectionClassName)}
      {...props}
    >
      <Container className={cn('py-12 sm:py-16', className)}>
        {children}
      </Container>
    </section>
  )
}
