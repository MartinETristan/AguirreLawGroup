import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { GoldRule, MaskLine, Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

/** Franja de cierre que invita a la consulta; se usa al final de cada página. */
export function ContactCta() {
  const { t } = useTranslation()

  return (
    <section className="border-t border-ink-200 bg-white">
      <Container className="flex flex-wrap items-end justify-between gap-10 py-20">
        <div className="flex max-w-2xl flex-col gap-5">
          <GoldRule className="w-16" />
          <h2 className="font-heading text-[clamp(32px,4vw,48px)] leading-[1.05] text-primary-950">
            <MaskLine>{t('cta.title')}</MaskLine>
          </h2>
          <Reveal delay={0.15}>
            <p className="text-lg text-ink-600">{t('cta.text')}</p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="flex flex-wrap gap-3.5">
          <Button asChild size="lg" className="group h-13 px-7 text-base">
            <Link to="/contacto">
              {t('common.scheduleConsultation')}
              <ArrowRightIcon className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-13 border-ink-300 px-7 text-base text-primary-950"
          >
            <a href={site.phone.href}>{site.phone.display}</a>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
