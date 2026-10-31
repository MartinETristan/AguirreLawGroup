import { createFileRoute } from '@tanstack/react-router'

import { LegalPage } from '@/components/sections/legal-page'

export const Route = createFileRoute('/privacy-policy')({
  component: () => <LegalPage page="privacy" />,
})
