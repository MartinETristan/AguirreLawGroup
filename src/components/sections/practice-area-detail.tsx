import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { MaskLine, Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { FaqList } from '@/components/shared/faq-list'
import { Eyebrow } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { areaPages } from '@/content/practice-area-pages'
import { practiceAreas } from '@/content/practice-areas'
import { site } from '@/content/site'
import { currentLanguage } from '@/i18n'
import type { AreaSection } from '@/content/practice-area-pages'
import type { PracticeArea } from '@/content/practice-areas'

function Section({ section }: { section: AreaSection }) {
  return (
    <Reveal className="flex flex-col gap-3 border-t border-border pt-6">
      <h2 className="font-heading text-[28px] leading-tight text-foreground">
        {section.title}
      </h2>
      {section.text?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {section.list && (
        <ul className="grid gap-x-6 gap-y-2 text-[15px] text-foreground sm:grid-cols-2">
          {section.list.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold-500"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.rows && (
        <dl className="flex flex-col">
          {section.rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-x-6 gap-y-0.5 border-b border-border py-3 last:border-b-0 sm:grid-cols-[220px_minmax(0,1fr)]"
            >
              <dt className="text-[15px] font-semibold text-foreground">
                {row.label}
              </dt>
              <dd className="text-[15px] leading-normal text-muted-foreground">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {section.note && (
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {section.note}
        </p>
      )}
    </Reveal>
  )
}

export function PracticeAreaDetail({ area }: { area: PracticeArea }) {
  const { t, i18n } = useTranslation()
  const page = areaPages[area][currentLanguage(i18n.resolvedLanguage)]

  return (
    <section>
      <Container className="grid items-start gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Link
              to="/practice-areas"
              className="inline-flex w-fit items-center gap-2 py-1 text-sm font-medium text-link transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="size-4" aria-hidden="true" />
              {t('areaPage.back')}
            </Link>
            <Reveal>
              <Eyebrow>{t('areas.eyebrow')}</Eyebrow>
            </Reveal>
            <h1 className="font-heading text-[clamp(36px,4.6vw,56px)] leading-[1.06] text-foreground">
              <MaskLine delay={0.1}>{t(`areas.items.${area}.title`)}</MaskLine>
            </h1>
            <Reveal delay={0.2}>
              <p className="text-lg leading-snug font-medium text-foreground">
                {page.tagline}
              </p>
            </Reveal>
            {page.intro.map((paragraph) => (
              <Reveal key={paragraph} delay={0.25}>
                <p className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {page.sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}

          {area === 'criminal-law' && (
            <Reveal className="flex flex-col gap-1 border-t border-border pt-6">
              <h2 className="pb-2 font-heading text-[28px] leading-tight text-foreground">
                {t('faq.title')}
              </h2>
              <FaqList />
            </Reveal>
          )}

          <p className="border-t border-border pt-5 text-[13px] leading-snug text-muted-foreground">
            {t('areaPage.disclaimer')}
          </p>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
          <div className="flex flex-col gap-3 rounded-lg border border-t-2 border-border border-t-gold-500 bg-card p-5">
            <span className="text-[17px] font-semibold text-foreground">
              {t('common.freeConsultation')}
            </span>
            <p className="text-sm leading-normal text-muted-foreground">
              {t('areaPage.ctaText')}
            </p>
            <Button asChild size="lg" className="h-11 text-[15px]">
              <Link to="/contact-us" search={{ area }}>
                {t('areaPage.cta')}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 text-[15px]"
            >
              <a href={site.phone.href}>
                <PhoneIcon />
                {site.phone.display}
              </a>
            </Button>
          </div>

          <nav
            aria-label={t('areaPage.otherAreas')}
            className="flex flex-col gap-1"
          >
            <h2 className="pb-1 text-[13px] text-muted-foreground">
              {t('areaPage.otherAreas')}
            </h2>
            {practiceAreas
              .filter((slug) => slug !== area)
              .map((slug) => (
                <Link
                  key={slug}
                  to="/practice-areas/$area"
                  params={{ area: slug }}
                  className="group flex items-center justify-between gap-3 py-1.5 text-sm text-foreground transition-colors hover:text-link"
                >
                  {t(`areas.items.${slug}.title`)}
                  <ArrowRightIcon
                    className="size-4 shrink-0 text-link transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
          </nav>
        </aside>
      </Container>
    </section>
  )
}
