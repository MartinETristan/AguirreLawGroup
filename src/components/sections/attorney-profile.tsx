import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { GoldTrack } from '@/components/illustrations/gold-track'
import {
  MaskLine,
  Reveal,
  Stagger,
  StaggerItem,
} from '@/components/motion/reveal'
import { Section } from '@/components/shared/section'
import { TextLink } from '@/components/shared/text-link'
import { site, yearsPracticing } from '@/content/site'

/** Perfil del abogado: el completo con foto (`/attorney`, `/about-us`) o el condensado del landing. */
export function AttorneyProfile({
  headingAs: Heading = 'h2',
  condensed = false,
}: {
  headingAs?: 'h1' | 'h2'
  /** Versión del landing: la trayectoria en línea de tiempo, con enlace al perfil completo. */
  condensed?: boolean
}) {
  const { t } = useTranslation()
  const { attorney } = site
  const [firstName, ...lastNames] = attorney.name.split(' ')

  const intro = (
    <div className="flex min-w-0 flex-col gap-4">
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

  if (condensed) {
    const career = [
      {
        year: attorney.jd.year,
        text: `${t('attorney.credentials.jd')}, ${attorney.jd.school}`,
      },
      { year: attorney.practicingSince, text: t('landing.attorney.practicing') },
      {
        year: attorney.scouts.since,
        text: t('landing.attorney.scouts', { troop: attorney.scouts.troop }),
      },
      {
        year: attorney.prosecutorYear,
        text: t('landing.attorney.prosecutor'),
      },
      {
        year: t('landing.attorney.today'),
        text: t('landing.attorney.years', { years: yearsPracticing }),
      },
    ]

    return (
      <Section className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="flex min-w-0 flex-col gap-4">
          {intro}
          <p className="text-[15px] leading-normal text-foreground">
            {t('landing.attorney.personal')}
          </p>
          <TextLink className="w-fit">
            <Link to="/about-us">{t('landing.attorney.more')}</Link>
          </TextLink>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <GoldTrack
            items={career.map((step) => ({
              id: String(step.year),
              title: (
                <p className="font-heading text-[28px] leading-none text-foreground">
                  {step.year}
                </p>
              ),
              detail: (
                <p className="pt-1 text-[15px] leading-normal text-muted-foreground">
                  {step.text}
                </p>
              ),
            }))}
          />
          <p className="border-t border-border pt-4 text-sm leading-normal text-muted-foreground">
            {t('attorney.credentials.aa')}, {t('attorney.credentials.aaValue')}
            {' · '}
            {t('attorney.credentials.ba')}, {attorney.ba.school}
          </p>
        </div>
      </Section>
    )
  }

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

  return (
    <Section
      sectionClassName="overflow-hidden"
      className="grid gap-8 pb-0 sm:pb-0 lg:grid-cols-[5fr_6fr] lg:gap-14"
    >
      <div className="flex min-w-0 flex-col gap-6 lg:pb-16">
        {intro}
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
                <dt className="text-[13px] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-[15px] text-foreground">{item.value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
      {/* El recorte viene cortado abajo: se apoya sobre el borde inferior de la sección */}
      <Reveal
        delay={0.2}
        className="mx-auto w-full max-w-xs self-end bg-[radial-gradient(closest-side,var(--muted),transparent)] lg:order-first lg:mx-0 lg:max-w-md"
      >
        <img
          src={attorney.photo}
          alt={t('attorney.photoAlt', { name: attorney.name })}
          width={553}
          height={809}
          loading="lazy"
          className="h-auto w-full"
        />
      </Reveal>
    </Section>
  )
}
