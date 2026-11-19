import { useTranslation } from 'react-i18next'

import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { legalDisclaimer } from '@/content/legal-disclaimer'
import { privacyPolicy } from '@/content/privacy-policy'
import { fullAddress, site } from '@/content/site'
import { terms } from '@/content/terms'
import { currentLanguage } from '@/i18n'
import type { Language } from '@/i18n'
import type { LegalPageKey } from '@/content/navigation'
import type { LegalDocument, LegalSection } from '@/content/legal-types'

/** Texto de cada página legal, por idioma. */
const documents: Record<LegalPageKey, Record<Language, LegalDocument>> = {
  privacy: privacyPolicy,
  terms,
  disclaimer: legalDisclaimer,
}

const linkClass =
  'text-link underline decoration-primary-300/50 underline-offset-4 transition-colors hover:decoration-primary-300'

function ContactDetails() {
  const { t } = useTranslation()
  const rows = [
    {
      label: t('legalPage.address'),
      value: (
        <>
          {site.name}
          <br />
          {fullAddress}
        </>
      ),
    },
    {
      label: t('legalPage.phone'),
      value: (
        <a href={site.phone.href} className={linkClass}>
          {site.phone.display}
        </a>
      ),
    },
    {
      label: t('legalPage.email'),
      value: (
        <a href={`mailto:${site.email}`} className={linkClass}>
          {site.email}
        </a>
      ),
    },
  ]

  return (
    <dl className="grid gap-x-6 gap-y-2 text-[15px] leading-relaxed sm:grid-cols-[8rem_1fr]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="font-semibold text-foreground">{row.label}</dt>
          <dd className="text-muted-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function LegalBlock({ section }: { section: LegalSection }) {
  const List = section.numbered ? 'ol' : 'ul'

  return (
    <section
      aria-labelledby={`legal-${section.id}`}
      className="flex flex-col gap-3 border-t border-border pt-6"
    >
      <h2
        id={`legal-${section.id}`}
        className="font-heading text-2xl leading-tight text-satin"
      >
        {section.title}
      </h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {section.items && (
        <List
          className={
            section.numbered
              ? 'flex list-decimal flex-col gap-3 pl-6 marker:font-semibold marker:text-complementary'
              : 'flex list-disc flex-col gap-3 pl-6 marker:text-complementary'
          }
        >
          {section.items.map((item) => (
            <li
              key={item.label ?? item.text}
              className="leading-relaxed text-muted-foreground"
            >
              {item.label && (
                <strong className="font-semibold text-foreground">
                  {item.label}
                </strong>
              )}{' '}
              {item.text}
            </li>
          ))}
        </List>
      )}
      {section.contact && <ContactDetails />}
    </section>
  )
}

export function LegalPage({ page }: { page: LegalPageKey }) {
  const { t, i18n } = useTranslation()
  const doc = documents[page][currentLanguage(i18n.resolvedLanguage)]

  return (
    <Section bordered={false}>
      <div className="flex max-w-3xl flex-col gap-6">
        <SectionHeading as="h1" title={t(`footer.legal.${page}`)} />
        <p className="text-[13px] font-semibold tracking-[0.14em] text-complementary uppercase">
          {t('legalPage.updated', { date: doc.updated })}
        </p>
        {doc.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
        {doc.sections.map((section) => (
          <LegalBlock key={section.id} section={section} />
        ))}
      </div>
    </Section>
  )
}
