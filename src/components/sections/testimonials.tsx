import { useTranslation } from 'react-i18next'

import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { testimonials } from '@/content/testimonials'
import { currentLanguage } from '@/i18n'

export function Testimonials({
  headingAs = 'h2',
}: {
  headingAs?: 'h1' | 'h2'
}) {
  const { t, i18n } = useTranslation()
  const lang = currentLanguage(i18n.resolvedLanguage)

  return (
    <section className="border-y border-primary-100 bg-primary-50">
      <Container className="flex flex-col gap-14 py-24 sm:py-28">
        <SectionHeading
          as={headingAs}
          centered
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
        />
        <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {testimonials.map((item) => (
            <StaggerItem as="figure" key={item.id} className="flex">
              <Card className="w-full gap-6 rounded-none py-10 ring-primary-100 transition-shadow duration-500 hover:shadow-[0_24px_48px_-28px_rgba(15,37,69,0.35)]">
                <CardContent className="flex flex-col gap-6 px-9">
                  <span
                    aria-hidden="true"
                    className="h-7 font-heading text-6xl leading-[0.5] text-gold-500"
                  >
                    “
                  </span>
                  <blockquote className="font-heading text-[22px] leading-snug text-ink-900">
                    {item.quote[lang]}
                  </blockquote>
                </CardContent>
                <CardFooter className="mt-auto flex-col items-start gap-0.5 border-0 bg-transparent px-9 py-0 text-sm">
                  <figcaption className="contents">
                    <strong className="text-primary-950">{item.name}</strong>
                    <span className="text-ink-600">
                      {t(`areas.items.${item.area}.title`)}
                    </span>
                  </figcaption>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
