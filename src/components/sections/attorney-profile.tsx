import { useTranslation } from 'react-i18next'

import {
  MaskLine,
  Reveal,
  Stagger,
  StaggerItem,
} from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Eyebrow } from '@/components/shared/section-heading'
import { site } from '@/content/site'

export function AttorneyProfile({
  headingAs: Heading = 'h2',
}: {
  headingAs?: 'h1' | 'h2'
}) {
  const { t } = useTranslation()
  const { attorney } = site
  const [firstName, ...lastNames] = attorney.name.split(' ')

  const credentials = [
    {
      label: t('attorney.credentials.jd'),
      value: `${attorney.jd.school}, ${attorney.jd.year}`,
    },
    { label: t('attorney.credentials.ba'), value: attorney.ba.school },
    {
      label: t('attorney.credentials.prosecutor'),
      value: t('attorney.credentials.prosecutorValue', {
        year: attorney.prosecutorYear,
      }),
    },
    {
      label: t('attorney.credentials.community'),
      value: t('attorney.credentials.communityValue', {
        troop: attorney.scouts.troop,
        year: attorney.scouts.since,
      }),
    },
  ]

  return (
    <section className="border-t border-border">
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
        <div className="flex min-w-0 flex-col gap-4">
          <Reveal>
            <Eyebrow>{t('attorney.eyebrow')}</Eyebrow>
          </Reveal>
          <Heading className="font-heading text-[clamp(36px,4.4vw,56px)] leading-[1.04] text-foreground">
            <MaskLine delay={0.1}>{firstName}</MaskLine>
            <MaskLine delay={0.2}>{lastNames.join(' ')}</MaskLine>
          </Heading>
          <Reveal delay={0.3}>
            <p className="max-w-xs text-[15px] leading-normal text-muted-foreground">
              {t('attorney.role')}
            </p>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal delay={0.15}>
            <p className="text-[17px] leading-relaxed text-foreground">
              {t('attorney.bio', { year: attorney.practicingSince })}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {t('attorney.bio2')}
            </p>
          </Reveal>
          <Stagger
            as="dl"
            className="grid gap-x-6 border-t border-border sm:grid-cols-2"
          >
            {credentials.map((item) => (
              <StaggerItem
                key={item.label}
                className="flex flex-col gap-0.5 border-b border-border py-3"
              >
                <dt className="text-[13px] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-[15px] text-foreground">{item.value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
