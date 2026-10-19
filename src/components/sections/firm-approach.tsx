import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { site } from '@/content/site'

const numerals = ['I', 'II', 'III']

export function FirmApproach({
  headingAs = 'h2',
}: {
  headingAs?: 'h1' | 'h2'
}) {
  const { t } = useTranslation()
  const steps = t('firm.steps', { returnObjects: true })

  return (
    <section className="border-y border-ink-200 bg-white">
      <Container className="flex flex-wrap gap-16 py-24 sm:py-28">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <SectionHeading
            as={headingAs}
            eyebrow={t('firm.eyebrow')}
            title={t('firm.title')}
          />
          <Reveal delay={0.2}>
            <p className="text-[17px] leading-relaxed text-ink-600">
              {t('firm.lead')}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <figure className="mt-4 flex flex-col gap-4 bg-primary-50 px-8 py-9">
              <span
                aria-hidden="true"
                className="h-7 font-heading text-6xl leading-[0.5] text-gold-500"
              >
                “
              </span>
              <blockquote className="font-heading text-2xl leading-snug text-primary-950">
                {t('firm.quote')}
              </blockquote>
              <figcaption className="text-[13px] font-semibold tracking-[0.14em] text-gold-800 uppercase">
                {site.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Stagger as="ol" className="flex min-w-0 flex-[1_1_480px] flex-col">
          {steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="flex gap-7 border-b border-ink-200 py-9 last:border-b-0"
            >
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold-500 font-heading text-[22px] text-primary-950"
              >
                {numerals[i]}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-heading text-[28px] text-primary-950">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
