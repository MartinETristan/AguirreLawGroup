import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContactCta } from '@/components/sections/contact-cta'
import { Testimonials } from '@/components/sections/testimonials'
import { testimonials } from '@/content/testimonials'

export const Route = createFileRoute('/testimonios')({
  beforeLoad: () => {
    if (testimonials.length === 0) throw notFound()
  },
  component: TestimonialsPage,
})

function TestimonialsPage() {
  return (
    <>
      <Testimonials headingAs="h1" />
      <ContactCta />
    </>
  )
}
