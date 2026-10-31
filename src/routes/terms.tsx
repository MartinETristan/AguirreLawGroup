import { createFileRoute } from '@tanstack/react-router'

import { LegalPage } from '@/components/sections/legal-page'

export const Route = createFileRoute('/terms')({
  component: () => <LegalPage page="terms" />,
})
