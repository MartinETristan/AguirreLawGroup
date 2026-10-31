import { createFileRoute } from '@tanstack/react-router'

import { LegalPage } from '@/components/sections/legal-page'

export const Route = createFileRoute('/legal-disclaimer')({
  component: () => <LegalPage page="disclaimer" />,
})
