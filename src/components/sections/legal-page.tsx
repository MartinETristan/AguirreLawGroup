import { useTranslation } from 'react-i18next'

import { Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import type { LegalPageKey } from '@/content/navigation'

/** Páginas legales: de momento solo el título, a la espera del texto definitivo. */
export function LegalPage({ page }: { page: LegalPageKey }) {
  const { t } = useTranslation()

  return (
    <Section bordered={false}>
      <SectionHeading as="h1" title={t(`footer.legal.${page}`)} />
    </Section>
  )
}
