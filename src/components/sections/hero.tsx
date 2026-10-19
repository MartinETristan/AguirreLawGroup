import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ScaleIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  EASE,
  MaskLine,
  Reveal,
  Stagger,
  StaggerItem,
} from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Eyebrow } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { fullAddress, site } from '@/content/site'

export function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 30])

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

  const details = [
    {
      label: t('hero.card.phone'),
      content: (
        <a
          href={site.phone.href}
          className="font-heading text-[28px] text-primary-950 transition-colors hover:text-primary-700"
        >
          {site.phone.display}
        </a>
      ),
    },
    { label: t('hero.card.hours'), content: t('common.hoursLong', site.hours) },
    { label: t('hero.card.office'), content: fullAddress },
  ]

  return (
    <section
      ref={ref}
      className="overflow-hidden border-b border-ink-200 bg-white"
    >
      <Container className="flex flex-wrap items-center gap-14 py-20 sm:py-24">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-7">
          <Reveal>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </Reveal>
          <h1 className="font-heading text-[clamp(44px,6.6vw,88px)] leading-none tracking-[-0.02em] text-primary-950">
            <MaskLine delay={0.1}>{t('hero.title1')}</MaskLine>
            <MaskLine delay={0.22} className="text-primary-600">
              {t('hero.title2')}
            </MaskLine>
          </h1>
          <Reveal delay={0.35}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-600">
              {t('hero.lead')}
            </p>
          </Reveal>
          <Reveal delay={0.45} className="flex flex-wrap gap-3.5 pt-1">
            <Button asChild size="lg" className="group h-13 px-7 text-base">
              <Link to="/contacto">
                {t('common.scheduleConsultation')}
                <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 border-ink-300 px-7 text-base text-primary-950"
            >
              <a href={site.phone.href}>
                {t('common.call', { phone: site.phone.display })}
              </a>
            </Button>
          </Reveal>
          <Stagger className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 border-t border-ink-200 pt-7">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col gap-1">
                <span className="font-heading text-[34px] text-primary-950">
                  {stat.value}
                </span>
                <span className="text-[13px] leading-normal text-ink-600">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <motion.aside
          aria-label={t('common.freeConsultation')}
          className="relative max-w-md min-w-0 flex-[1_1_360px] pr-5 pb-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        >
          <motion.div
            aria-hidden="true"
            style={{ y: frameY }}
            className="absolute inset-0 top-5 left-5 border border-gold-500"
          />
          <motion.div
            style={{ y: cardY }}
            className="relative flex flex-col gap-6 border border-ink-200 bg-ink-50 px-6 py-10 sm:px-9"
          >
            <div className="flex items-center gap-3.5">
              <ScaleIcon
                className="size-8 text-gold-600"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-[26px] text-primary-950">
                  {t('common.freeConsultation')}
                </span>
                <span className="text-sm text-ink-600">
                  {t('hero.card.subtitle')}
                </span>
              </div>
            </div>
            <dl className="flex flex-col border-t border-ink-200">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-b border-ink-200 py-4"
                >
                  <dt className="text-xs font-semibold tracking-[0.14em] text-gold-800 uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-[15px] text-ink-900">{item.content}</dd>
                </div>
              ))}
            </dl>
            <Button
              asChild
              size="lg"
              className="h-13 bg-primary-950 text-[15px] hover:bg-primary-900"
            >
              <Link to="/contacto">{t('common.requestConsultation')}</Link>
            </Button>
          </motion.div>
        </motion.aside>
      </Container>
    </section>
  )
}
