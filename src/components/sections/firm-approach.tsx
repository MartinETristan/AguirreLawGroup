import { CheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { yearsPracticing } from '@/content/site'

export function FirmApproach({
  headingAs = 'h2',
}: {
  headingAs?: 'h1' | 'h2'
}) {
  const { t } = useTranslation()
  const reasons = t('firm.reasons', {
    returnObjects: true,
    years: yearsPracticing,
  })

  return (
    <section className="border-t border-border">
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
        <div className="flex min-w-0 flex-col gap-4">
          <SectionHeading
            as={headingAs}
            eyebrow={t('firm.eyebrow')}
            title={t('firm.title')}
          />
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
            <h3 className="text-[17px] leading-snug font-semibold text-foreground">
              {t('firm.reasonsTitle')}
            </h3>
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
      </Container>
    </section>
  )
}
