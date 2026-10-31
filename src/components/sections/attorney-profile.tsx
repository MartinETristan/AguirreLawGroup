import { useTranslation } from 'react-i18next'

import {
  MaskLine,
  Reveal,
  Stagger,
  StaggerItem,
} from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Eyebrow } from '@/components/shared/section-heading'
import { site, yearsPracticing } from '@/content/site'

export function AttorneyProfile({
  headingAs: Heading = 'h2',
  showPhoto = false,
}: {
  headingAs?: 'h1' | 'h2'
  showPhoto?: boolean
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
      label: t('attorney.credentials.aa'),
      value: t('attorney.credentials.aaValue'),
    },
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

  const intro = (
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
  )

  const details = (
    <div className="flex min-w-0 flex-col gap-4">
      <Reveal delay={0.15}>
        <p className="text-[17px] leading-relaxed text-foreground">
          {t('attorney.bio', {
            year: attorney.practicingSince,
            years: yearsPracticing,
          })}
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {t('attorney.bio2')}
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {t('attorney.personal')}
        </p>
      </Reveal>
      <Stagger
        as="dl"
        className="grid gap-x-6 border-t border-border sm:grid-cols-2"
      >
        {credentials.map((item) => (
          <StaggerItem
            key={item.label}
            className="flex flex-col gap-0.5 border-b border-border py-3 sm:last:col-span-2"
          >
            <dt className="text-[13px] text-muted-foreground">{item.label}</dt>
            <dd className="text-[15px] text-foreground">{item.value}</dd>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )

  if (showPhoto) {
    return (
      <section className="overflow-hidden border-t border-border">
        <Container className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[5fr_6fr] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-6 lg:pb-16">
            {intro}
            {details}
          </div>
          {/* El recorte viene cortado abajo: se apoya sobre el borde inferior de la sección */}
          <Reveal
            delay={0.2}
            className="mx-auto w-full max-w-xs self-end bg-[radial-gradient(closest-side,var(--muted),transparent)] lg:order-first lg:mx-0 lg:max-w-md"
          >
            <img
              src={attorney.photo}
              alt={attorney.name}
              width={553}
              height={809}
              loading="lazy"
              className="h-auto w-full"
            />
          </Reveal>
        </Container>
      </section>
    )
  }

  return (
    <section className="border-t border-border">
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14">
        {intro}
        {details}
      </Container>
    </section>
  )
}
