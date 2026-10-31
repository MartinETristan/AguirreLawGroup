import { useTranslation } from 'react-i18next'

import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import type { LegalPageKey } from '@/content/navigation'

/** Páginas legales: de momento solo el título, a la espera del texto definitivo. */
export function LegalPage({ page }: { page: LegalPageKey }) {
  const { t } = useTranslation()

  return (
    <section>
      <Container className="py-12 sm:py-16">
        <SectionHeading as="h1" title={t(`footer.legal.${page}`)} />
      </Container>
    </section>
  )
}
