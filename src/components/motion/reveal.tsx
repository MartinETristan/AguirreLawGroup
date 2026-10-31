import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Variants } from 'motion/react'

import { cn } from '@/lib/utils'

/** Curva "out-expo" suave usada en todas las transiciones del sitio. */
export const EASE = [0.22, 1, 0.36, 1] as const

const viewport = { once: true, margin: '0px 0px -12% 0px' } as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Aparece con un desvanecido y un leve desplazamiento al entrar en pantalla. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

type StaggerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'dl'
  /** Se reproduce al montar, sin esperar a que entre en pantalla. */
  immediate?: boolean
}

/** Contenedor que escalona la entrada de sus `StaggerItem`. */
export function Stagger({
  children,
  className,
  as = 'div',
  immediate = false,
}: StaggerProps) {
  const Component = motion[as]
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport }
  return (
    <Component
      className={className}
      variants={staggerParent}
      initial="hidden"
      {...trigger}
    >
      {children}
    </Component>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'figure'
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: StaggerItemProps) {
  const Component = motion[as]
  return (
    <Component className={className} variants={staggerItem}>
      {children}
    </Component>
  )
}

type MaskLineProps = {
  children: ReactNode
  className?: string
  delay?: number
}

const maskText: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%' },
}

/**
 * Línea de texto que sube desde una máscara, para titulares.
 * El `whileInView` va en la máscara y no en el texto: el texto empieza
 * recortado por `overflow-hidden`, así que el IntersectionObserver nunca lo
 * vería "en pantalla" y el titular se quedaría oculto.
 */
export function MaskLine({ children, className, delay = 0 }: MaskLineProps) {
  return (
    <motion.span
      className="mb-[-0.18em] block overflow-hidden pb-[0.18em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.span
        className={cn('block', className)}
        variants={maskText}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

type GoldRuleProps = {
  className?: string
  delay?: number
}

/** Filete dorado que se dibuja de izquierda a derecha. */
export function GoldRule({ className, delay = 0 }: GoldRuleProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn('block h-px w-10 origin-left bg-gold-500', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE, delay }}
    />
  )
}
