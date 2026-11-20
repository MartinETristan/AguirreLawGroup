import * as React from 'react'
import { cn } from 'cn'
import { ToggleGroup } from 'radix-ui'

type SegmentedControlProps = {
  value: string
  onValueChange: (value: string) => void
  'aria-label': string
  className?: string
  children: React.ReactNode
}

/** Selector de una sola opción en segmentos. Radix permite deseleccionar; aquí siempre hay una activa. */
function SegmentedControl({
  value,
  onValueChange,
  className,
  children,
  ...props
}: SegmentedControlProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(next) => next && onValueChange(next)}
      data-slot="segmented-control"
      className={cn(
        'inline-flex w-full gap-1 rounded-lg border border-border bg-card p-1 sm:w-fit',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroup.Root>
  )
}

function SegmentedControlItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroup.Item>) {
  return (
    <ToggleGroup.Item
      data-slot="segmented-control-item"
      className={cn(
        'inline-flex min-h-11 flex-1 items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=on]:bg-secondary data-[state=on]:text-foreground sm:flex-none sm:px-5',
        className,
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
