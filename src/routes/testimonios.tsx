import { createFileRoute } from '@tanstack/react-router'

import { ContactCta } from '@/components/sections/contact-cta'
import { Testimonials } from '@/components/sections/testimonials'

export const Route = createFileRoute('/testimonios')({
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
