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
    <section className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <SectionHeading
          as={headingAs}
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
        />
        <Stagger className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem as="figure" key={item.id} className="flex">
              <Card className="w-full gap-4 rounded-lg py-5">
                <CardContent className="px-5">
                  <blockquote className="text-[15px] leading-relaxed text-foreground">
                    {item.quote[lang]}
                  </blockquote>
                </CardContent>
                <CardFooter className="mt-auto flex-col items-start gap-0.5 border-0 bg-transparent px-5 pt-0 pb-5 text-sm">
                  <figcaption className="contents">
                    <strong className="font-semibold text-foreground">
                      {item.name}
                    </strong>
                    <span className="text-muted-foreground">
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
