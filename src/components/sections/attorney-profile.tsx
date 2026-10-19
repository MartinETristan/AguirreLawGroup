import { useTranslation } from 'react-i18next'

import {
  GoldRule,
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
    <section className="bg-ink-50">
      <Container className="flex flex-wrap items-start gap-16 py-24 sm:py-28">
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-6">
          <Reveal>
            <Eyebrow>{t('attorney.eyebrow')}</Eyebrow>
          </Reveal>
          <Heading className="font-heading text-[clamp(44px,6vw,80px)] leading-[0.98] tracking-[-0.02em] text-primary-950">
            <MaskLine delay={0.1}>{firstName}</MaskLine>
            <MaskLine delay={0.2}>{lastNames.join(' ')}</MaskLine>
          </Heading>
          <GoldRule className="w-16" delay={0.4} />
          <Reveal delay={0.4}>
            <p className="max-w-xs leading-normal font-semibold text-primary-700">
              {t('attorney.role')}
            </p>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-8">
          <Reveal delay={0.15}>
            <p className="font-heading text-[clamp(22px,2.4vw,28px)] leading-snug text-ink-900">
              {t('attorney.bio', { year: attorney.practicingSince })}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-[17px] leading-relaxed text-ink-600">
              {t('attorney.bio2')}
            </p>
          </Reveal>
          <Stagger
            as="dl"
            className="grid gap-x-8 border-t border-ink-200 sm:grid-cols-2"
          >
            {credentials.map((item) => (
              <StaggerItem
                key={item.label}
                className="flex flex-col gap-1 border-b border-ink-200 py-4.5"
              >
                <dt className="text-xs font-semibold tracking-[0.14em] text-gold-800 uppercase">
                  {item.label}
                </dt>
                <dd className="text-[15px] text-ink-900">{item.value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
