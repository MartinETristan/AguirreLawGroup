import { CheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { EvidenceSheet } from '@/components/illustrations/evidence-sheet'
import { GoldTrack } from '@/components/illustrations/gold-track'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { yearsPracticing } from '@/content/site'

const captionClass = 'text-[17px] leading-snug font-semibold text-foreground'

export function FirmApproach({
  headingAs = 'h2',
  condensed = false,
}: {
  headingAs?: 'h1' | 'h2'
  /** Versión del landing: las etapas y el estudio de la evidencia se muestran en vez de contarse. */
  condensed?: boolean
}) {
  const { t } = useTranslation()
  const reasons = t('firm.reasons', {
    returnObjects: true,
    years: yearsPracticing,
  })

  if (condensed) {
    const stages = t('landing.firm.stages', { returnObjects: true })
    return (
      <Section className="flex flex-col gap-10">
        <SectionHeading as={headingAs} title={t('firm.title')} />

        <div className="flex flex-col gap-5">
          <h3 className={captionClass}>{t('landing.firm.stagesCaption')}</h3>
          <GoldTrack
            horizontal
            open
            items={stages.map((stage, i) => ({
              id: stage,
              title: <p className={captionClass}>{stage}</p>,
              detail: i === stages.length - 1 && (
                <p className="text-sm text-muted-foreground">
                  {t('landing.firm.stageCondition')}
                </p>
              ),
            }))}
          />
        </div>

        <div className="grid items-center gap-5 border-t border-border pt-10 lg:grid-cols-2 lg:gap-14">
          <h3 className={captionClass}>{t('landing.firm.evidence')}</h3>
          <EvidenceSheet />
        </div>
      </Section>
    )
  }

  return (
    <Section className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div className="flex min-w-0 flex-col gap-4">
        <SectionHeading as={headingAs} title={t('firm.title')} />
        <Reveal delay={0.2}>
          <p className="leading-relaxed text-muted-foreground">
            {t('firm.lead')}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {t('firm.evidence')}
          </p>
        </Reveal>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <Reveal>
          <h3 className={captionClass}>{t('firm.reasonsTitle')}</h3>
        </Reveal>
        <Stagger as="ul" className="flex flex-col">
          {reasons.map((reason) => (
            <StaggerItem
              as="li"
              key={reason}
              className="flex gap-3 border-b border-border py-3 text-[15px] leading-normal text-foreground last:border-b-0"
            >
              <CheckIcon
                className="mt-0.5 size-4.5 shrink-0 text-complementary"
                aria-hidden="true"
              />
              {reason}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
