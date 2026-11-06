import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { ClaimSheet } from '@/components/illustrations/claim-sheet'
import { GoldTrack } from '@/components/illustrations/gold-track'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { GoldDiamond } from '@/components/shared/gold'
import { Section } from '@/components/shared/section'
import { CenteredHeading } from '@/components/shared/section-heading'
import { TextLink } from '@/components/shared/text-link'
import { Button } from '@/components/ui/button'

const captionClass = 'text-[17px] leading-snug font-semibold text-foreground'

/** Bloque principal del landing: lesiones personales es el área prioritaria de la firma. */
export function PersonalInjuryFocus() {
  const { t } = useTranslation()
  const cases = t('landing.injury.cases', { returnObjects: true })
  const steps = t('landing.injury.steps', { returnObjects: true })
  const claim = t('landing.injury.claim', { returnObjects: true })
  const facts = t('landing.injury.facts', { returnObjects: true })

  return (
    <Section bordered={false} className="flex flex-col gap-10">
      <CenteredHeading
        title={t('landing.injury.title')}
        lead={t('landing.injury.lead')}
      />

      <Stagger
        as="ul"
        className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border min-[420px]:grid-cols-2 lg:grid-cols-4"
      >
        {cases.map((item) => (
          <StaggerItem
            as="li"
            key={item}
            className="flex items-center gap-3 bg-card px-5 py-4 text-[15px] leading-snug font-semibold text-foreground"
          >
            <GoldDiamond className="shrink-0" />
            {item}
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid items-start gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-5">
          <h3 className={captionClass}>{t('landing.injury.stepsTitle')}</h3>
          <GoldTrack
            items={steps.map((step) => ({
              id: step.title,
              title: <p className={captionClass}>{step.title}</p>,
              detail: (
                <p className="pt-1 text-sm leading-normal text-muted-foreground">
                  {step.text}
                </p>
              ),
            }))}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h3 className={captionClass}>{t('landing.injury.claimTitle')}</h3>
          <ClaimSheet title={t('landing.injury.claimSheet')} lines={claim} />
        </div>
      </div>

      <Stagger className="grid gap-4 border-t border-border pt-8 sm:grid-cols-3 sm:gap-8">
        {facts.map((fact) => (
          <StaggerItem
            key={fact.value}
            className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-1"
          >
            <span className="w-28 shrink-0 font-heading text-[32px] leading-tight text-satin sm:w-auto">
              {fact.value}
            </span>
            <span className="text-sm leading-snug text-muted-foreground">
              {fact.label}
            </span>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button asChild size="lg" className="h-12 text-[15px]">
          <Link to="/contact-us" search={{ area: 'personal-injury' }}>
            {t('areaPage.cta')}
          </Link>
        </Button>
        <TextLink>
          <Link to="/practice-areas/$area" params={{ area: 'personal-injury' }}>
            {t('landing.injury.more')}
          </Link>
        </TextLink>
      </Reveal>
    </Section>
  )
}
