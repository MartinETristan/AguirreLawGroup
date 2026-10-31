import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'

export function ValuesStrip() {
  const { t } = useTranslation()
  const words = t('values.words', { returnObjects: true })

  return (
    <section aria-label={t('values.label')} className="border-b border-border">
      <Container className="py-5">
        <Stagger className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {words.map((word, i) => (
            <Fragment key={word}>
              <StaggerItem className="font-heading text-2xl text-foreground">
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
      </Container>
    </section>
  )
}
