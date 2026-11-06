import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { HoverArrow } from '@/components/shared/hover-arrow'
import { Section } from '@/components/shared/section'
import {
  CenteredHeading,
  SectionHeading,
} from '@/components/shared/section-heading'
import { TextLink } from '@/components/shared/text-link'
import { practiceAreas } from '@/content/practice-areas'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

type PracticeAreasProps = {
  /** Muestra solo las primeras N áreas y un enlace a la página completa. */
  limit?: number
  headingAs?: 'h1' | 'h2'
  /** Versión del landing: solo las áreas penales, como secundarias y con palabras clave. */
  condensed?: boolean
}

const cellClass =
  'group relative flex w-full flex-col gap-1.5 overflow-hidden p-5 transition-colors duration-300 hover:bg-muted focus-visible:-outline-offset-2'
const cellTitleClass =
  'flex items-start justify-between gap-3 text-[17px] leading-snug font-semibold text-foreground'
const cellArrowClass = 'mt-1 size-4 shrink-0 text-link'

/** Versión del landing: las áreas penales quedan como secundarias, en lista compacta bajo un título centrado. */
function CriminalAreas() {
  const { t } = useTranslation()
  const areas = practiceAreas.filter((slug) => slug !== 'personal-injury')

  return (
    <Section className="flex flex-col gap-10">
      <CenteredHeading
        title={t('landing.areas.title')}
        lead={t('landing.areas.lead')}
      />

      <Stagger as="ul" className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((slug) => (
          <StaggerItem as="li" key={slug} className="border-b border-border">
            <Link
              to="/practice-areas/$area"
              params={{ area: slug }}
              className="group flex flex-col gap-0.5 py-3.5 focus-visible:-outline-offset-2"
            >
              <span className="flex items-center justify-between gap-3 text-[15px] leading-snug font-semibold text-foreground transition-colors group-hover:text-link">
                {t(`areas.items.${slug}.title`)}
                <HoverArrow className="size-4 shrink-0 text-link" />
              </span>
              <span className="text-sm leading-normal text-muted-foreground">
                {t(`landing.areas.items.${slug}`)}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

export function PracticeAreas({
  limit,
  headingAs = 'h2',
  condensed = false,
}: PracticeAreasProps) {
  const { t } = useTranslation()
  const areas = limit ? practiceAreas.slice(0, limit) : practiceAreas

  if (condensed) return <CriminalAreas />

  return (
    <Section bordered={false} className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading as={headingAs} title={t('areas.title')} />
        {limit && (
          <Reveal delay={0.2}>
            <TextLink>
              <Link to="/practice-areas">{t('areas.viewAll')}</Link>
            </TextLink>
          </Reveal>
        )}
      </div>

      <Stagger className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((slug) => (
          <StaggerItem key={slug} className="flex">
            <Link
              to="/practice-areas/$area"
              params={{ area: slug }}
              className={cn(cellClass, 'bg-card')}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <h3 className={cellTitleClass}>
                {t(`areas.items.${slug}.title`)}
                <HoverArrow className={cellArrowClass} />
              </h3>
              <p className="text-sm leading-normal text-muted-foreground">
                {t(`areas.items.${slug}.text`)}
              </p>
            </Link>
          </StaggerItem>
        ))}
        {!limit && (
          <StaggerItem className="flex">
            <a href={site.phone.href} className={cn(cellClass, 'bg-secondary')}>
              <h3 className={cellTitleClass}>
                {t('areas.other.title')}
                <HoverArrow className={cellArrowClass} />
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
    </Section>
  )
}
