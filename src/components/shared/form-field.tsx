import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

import { EASE } from '@/components/motion/reveal'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** Medidas comunes de los controles de formulario. */
export const fieldClass = 'h-11 rounded-sm px-3 text-[15px] md:text-[15px]'

/** Id del mensaje de error de un campo, para enlazarlo con `aria-describedby`. */
export function fieldErrorId(id: string) {
  return `${id}-error`
}

/** Etiqueta, control y mensaje de error de un campo. */
export function FormField({
  id,
  label,
  error,
  className,
  children,
}: {
  /** Id del control que va en `children`. */
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p
          id={fieldErrorId(id)}
          role="alert"
          className="text-[13px] leading-snug text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  )
}

/** Aviso que aparece bajo un formulario tras enviarlo; se anuncia a lectores de pantalla. */
export function FormStatus({
  show,
  className,
  children,
}: {
  show: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div aria-live="polite">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn(
              'mt-3 rounded-sm bg-accent px-4 py-3 text-sm text-accent-foreground',
              className,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
