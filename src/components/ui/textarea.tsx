import * as React from 'react'
import { cn } from 'cn'

function Textarea({
  className,
  onFocus,
  onBlur,
  ...props
}: React.ComponentProps<'textarea'>) {
  const [focused, setFocused] = React.useState(false)

  return (
    // Solo se desplaza por dentro con el foco: antes, la rueda o el dedo siguen moviendo la página
    <textarea
      data-slot="textarea"
      data-lenis-prevent={focused || undefined}
      onFocus={(event) => {
        setFocused(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocused(false)
        onBlur?.(event)
      }}
      className={cn(
        'flex field-sizing-content max-h-60 min-h-16 w-full resize-none overflow-hidden rounded-lg focus:overflow-y-auto border border-input bg-transparent px-2.5 py-2 text-base transition-[color,background-color,border-color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
