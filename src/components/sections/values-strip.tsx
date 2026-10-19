import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'

export function ValuesStrip() {
  const { t } = useTranslation()
  const words = t('values.words', { returnObjects: true })

  return (
    <section
      aria-label={t('values.label')}
      className="border-b border-ink-200 bg-ink-50"
    >
      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-8">
        <Stagger className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {words.map((word, i) => (
            <Fragment key={word}>
              <StaggerItem className="font-heading text-[26px] text-primary-950">
                {word}
              </StaggerItem>
              {i < words.length - 1 && (
                <StaggerItem>
                  <span
                    aria-hidden="true"
                    className="block size-1.5 rotate-45 bg-gold-500"
                  />
                </StaggerItem>
              )}
            </Fragment>
          ))}
        </Stagger>
        <Reveal delay={0.3}>
          <p className="max-w-sm text-sm leading-relaxed text-ink-600">
            {t('values.note')}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
