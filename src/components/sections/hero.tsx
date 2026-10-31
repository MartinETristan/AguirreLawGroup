import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ScaleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
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
    { label: t('hero.card.hours'), content: t('common.hoursLong', site.hours) },
    { label: t('hero.card.office'), content: fullAddress },
  ]

  return (
    <section className="border-b border-border">
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-5">
            <Reveal>
              <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            </Reveal>
            <h1 className="font-heading text-[clamp(38px,5.4vw,68px)] leading-[1.04] text-foreground">
              <MaskLine delay={0.1}>{t('hero.title1')}</MaskLine>
              <MaskLine delay={0.22} className="text-primary-400">
                {t('hero.title2')}
              </MaskLine>
            </h1>
            <Reveal delay={0.35}>
              <p className="max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                {t('hero.lead')}
              </p>
            </Reveal>
            <Reveal delay={0.45} className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 w-full px-6 text-[15px] sm:w-auto"
              >
                <Link to="/contact-us">
                  {t('common.scheduleConsultation')}
                  <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full px-6 text-[15px] sm:w-auto"
              >
                <a href={site.phone.href}>
                  {t('common.call', { phone: site.phone.display })}
                </a>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <aside
              aria-label={t('common.freeConsultation')}
              className="flex flex-col gap-4 rounded-lg border border-t-2 border-border border-t-gold-500 bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <ScaleIcon
                  className="size-7 shrink-0 text-complementary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-[17px] font-semibold text-foreground">
                    {t('common.freeConsultation')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t('hero.card.subtitle')}
                  </span>
                </div>
              </div>
              <dl className="flex flex-col gap-3 border-t border-border pt-4">
                {details.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <dt className="text-[13px] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] text-foreground">
                      {item.content}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="flex items-baseline gap-4 sm:flex-col sm:gap-0.5"
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
