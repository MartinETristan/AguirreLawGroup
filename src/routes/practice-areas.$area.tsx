import { createFileRoute, notFound } from '@tanstack/react-router'

import { PracticeAreaDetail } from '@/components/sections/practice-area-detail'
import { isPracticeArea } from '@/content/practice-areas'
import type { PracticeArea } from '@/content/practice-areas'

export const Route = createFileRoute('/practice-areas/$area')({
  beforeLoad: ({ params }) => {
    if (!isPracticeArea(params.area)) throw notFound()
  },
  component: AreaPage,
})

function AreaPage() {
  const { area } = Route.useParams()
  return <PracticeAreaDetail area={area as PracticeArea} />
}
