import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { MaskLine, Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

/** Franja de cierre que invita a la consulta; se usa al final de cada página. */
export function ContactCta() {
  const { t } = useTranslation()

  return (
    <section className="border-t border-border bg-card">
      <Container className="flex flex-wrap items-center justify-between gap-6 py-10">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2 className="font-heading text-[clamp(28px,3vw,36px)] leading-[1.1] text-foreground">
            <MaskLine>{t('cta.title')}</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground">{t('cta.text')}</p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="group h-12 px-6 text-[15px]">
            <Link to="/contact-us">
              {t('common.scheduleConsultation')}
              <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-6 text-[15px]"
          >
            <a href={site.phone.href}>{site.phone.display}</a>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
