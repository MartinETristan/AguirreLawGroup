import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { EASE, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { site } from '@/content/site'

// Desplazamiento de cada capa al recorrer el escenario: cuanto más atrás, más
// baja respecto al scroll y más lenta se percibe. Javier y el fondo solo bajan,
// así el corte de la foto nunca sale del degradado inferior.
// El logo va fijo a la página, sin parallax.
const PARALLAX = { attorney: 56, backdrop: 160 }

export function HeroParallax() {
  const { t } = useTranslation()
  const stageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  })
  const depth = reduceMotion ? 0 : 1
  const attorneyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, PARALLAX.attorney * depth],
  )
  const backdropY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, PARALLAX.backdrop * depth],
  )

  const stats = [
    {
      value: String(site.attorney.practicingSince),
      label: t('hero.stats.sinceLabel'),
    },
    { value: t('hero.stats.cases'), label: t('hero.stats.casesLabel') },
    {
      value: t('hero.stats.prosecutor'),
      label: t('hero.stats.prosecutorLabel', {
        year: site.attorney.prosecutorYear,
      }),
    },
  ]

  return (
    <section className="border-b border-border">
      <h1 className="sr-only">
        {t('hero.title1')} {t('hero.title2')}
      </h1>

      <div
        ref={stageRef}
        className="relative h-[clamp(480px,calc(100svh-11rem),860px)] overflow-hidden"
      >
        {/* El fondo sobra por arriba para no dejar hueco cuando baja */}
        <motion.div
          className="absolute inset-x-0 -top-40 bottom-0"
          style={{ y: backdropY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <img
            src={site.hero.backdrop}
            loading="lazy"
            alt="TheGunLawLogo"
            className="size-full object-cover blur-[3px]"
          />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[6%] bottom-0"
          style={{ y: attorneyY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        >
          <img
            src={site.attorney.photoFront}
            loading="lazy"
            alt={site.attorney.name}
            width={603}
            height={799}
            className="size-full object-contain object-bottom"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_12%,transparent_55%)]" />

        <motion.div
          className="absolute inset-x-0 bottom-[4%] flex justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        >
          <img
            src={site.hero.logo}
            alt={site.hero.logoAlt}
            width={3240}
            height={1080}
            className="h-auto w-full max-w-[min(56rem,64svh)]"
          />
        </motion.div>
      </div>

      <Container className="pb-12 sm:pb-16">
        <Stagger
          immediate
          className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-8"
        >
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="flex items-center gap-4 sm:flex-col sm:gap-0.5"
            >
              <span className="w-32 shrink-0 font-heading text-[28px] leading-tight text-foreground sm:w-auto">
                {stat.value}
              </span>
              <span className="text-sm leading-snug text-muted-foreground">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
