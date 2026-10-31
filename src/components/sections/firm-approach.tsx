import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'

const numerals = ['I', 'II', 'III']

export function FirmApproach({
  headingAs = 'h2',
}: {
  headingAs?: 'h1' | 'h2'
}) {
  const { t } = useTranslation()
  const steps = t('firm.steps', { returnObjects: true })

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
        </div>

        <Stagger as="ol" className="flex min-w-0 flex-col">
          {steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold-500 font-heading text-[15px] text-complementary"
              >
                {numerals[i]}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[17px] leading-snug font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-normal text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
