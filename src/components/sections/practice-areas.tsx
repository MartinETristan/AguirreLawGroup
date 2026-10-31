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
  'group relative flex w-full flex-col gap-1.5 overflow-hidden p-5 transition-colors duration-300 hover:bg-muted focus-visible:-outline-offset-2'
const cellTitleClass =
  'flex items-start justify-between gap-3 text-[17px] leading-snug font-semibold text-foreground'
const cellArrowClass =
  'mt-1 size-4 shrink-0 text-link transition-transform duration-500 group-hover:translate-x-1'

export function PracticeAreas({ limit, headingAs = 'h2' }: PracticeAreasProps) {
  const { t } = useTranslation()
  const areas = limit ? practiceAreas.slice(0, limit) : practiceAreas

  return (
    <section>
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            as={headingAs}
            eyebrow={t('areas.eyebrow')}
            title={t('areas.title')}
          />
          {limit && (
            <Reveal delay={0.2}>
              <Link
                to="/areas"
                className="border-b border-primary-300/50 pt-2.5 pb-1 text-[15px] font-semibold text-link transition-colors hover:border-primary-300"
              >
                {t('areas.viewAll')}
              </Link>
            </Reveal>
          )}
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((slug) => (
            <StaggerItem key={slug} className="flex">
              <Link
                to="/areas/$area"
                params={{ area: slug }}
                className={cn(cellClass, 'bg-card')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <h3 className={cellTitleClass}>
                  {t(`areas.items.${slug}.title`)}
                  <ArrowRightIcon
                    className={cellArrowClass}
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-sm leading-normal text-muted-foreground">
                  {t(`areas.items.${slug}.text`)}
                </p>
              </Link>
            </StaggerItem>
          ))}
          {!limit && (
            <StaggerItem className="flex">
              <a
                href={site.phone.href}
                className={cn(cellClass, 'bg-secondary')}
              >
                <h3 className={cellTitleClass}>
                  {t('areas.other.title')}
                  <ArrowRightIcon
                    className={cellArrowClass}
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-sm leading-normal text-muted-foreground">
                  {t('areas.other.text')}
                </p>
                <span className="mt-auto pt-1 text-sm font-semibold text-link">
                  {site.phone.display}
                </span>
              </a>
            </StaggerItem>
          )}
        </Stagger>
      </Container>
    </section>
  )
}
