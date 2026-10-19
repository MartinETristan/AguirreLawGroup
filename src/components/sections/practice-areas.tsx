import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { practiceAreas } from '@/content/practice-areas'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

type PracticeAreasProps = {
  /** Muestra solo las primeras N áreas y un enlace a la página completa. */
  limit?: number
  headingAs?: 'h1' | 'h2'
}

const cellClass =
  'group relative flex min-h-60 flex-col gap-3.5 overflow-hidden px-8 py-9 transition-colors duration-500'

export function PracticeAreas({ limit, headingAs = 'h2' }: PracticeAreasProps) {
  const { t } = useTranslation()
  const areas = limit ? practiceAreas.slice(0, limit) : practiceAreas

  return (
    <section className="bg-ink-50">
      <Container className="flex flex-col gap-14 py-24 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            as={headingAs}
            eyebrow={t('areas.eyebrow')}
            title={t('areas.title')}
          />
          {limit && (
            <Reveal delay={0.2}>
              <Link
                to="/areas"
                className="border-b border-primary-300 pt-2.5 pb-1 text-[15px] font-semibold text-primary-700 transition-colors hover:border-primary-700"
              >
                {t('areas.viewAll')}
              </Link>
            </Reveal>
          )}
        </div>

        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-ink-200 bg-ink-200">
          {areas.map((slug, i) => (
            <StaggerItem key={slug} className="flex">
              <Link
                to="/contacto"
                search={{ area: slug }}
                className={cn(cellClass, 'w-full bg-white hover:bg-primary-50')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <span className="font-heading text-xl text-gold-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-[26px] leading-tight text-primary-950">
                  {t(`areas.items.${slug}.title`)}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-600">
                  {t(`areas.items.${slug}.text`)}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                  {t('common.learnMore')}
                  <ArrowRightIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
          {!limit && (
            <StaggerItem className="flex">
              <a
                href={site.phone.href}
                className={cn(
                  cellClass,
                  'w-full bg-primary-50 hover:bg-primary-100',
                )}
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-xl text-gold-600"
                >
                  —
                </span>
                <h3 className="font-heading text-[26px] leading-tight text-primary-950">
                  {t('areas.other.title')}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-600">
                  {t('areas.other.text')}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                  {site.phone.display}
                  <ArrowRightIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </a>
            </StaggerItem>
          )}
        </Stagger>
      </Container>
    </section>
  )
}
