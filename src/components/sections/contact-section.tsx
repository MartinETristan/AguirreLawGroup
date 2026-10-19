import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FormEvent, ReactNode } from 'react'

import { EASE, Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { practiceAreas } from '@/content/practice-areas'
import { fullAddress, site } from '@/content/site'
import type { PracticeArea } from '@/content/practice-areas'

const fieldClass =
  'h-12 rounded-sm border-ink-300 bg-white px-3.5 text-[15px] md:text-[15px]'

type ContactSectionProps = {
  defaultArea?: PracticeArea
  headingAs?: 'h1' | 'h2'
}

export function ContactSection({
  defaultArea,
  headingAs = 'h2',
}: ContactSectionProps) {
  const { t } = useTranslation()
  const id = useId()
  const [area, setArea] = useState<string>(defaultArea ?? '')
  const [sent, setSent] = useState(false)

  const details: Array<{ icon: ReactNode; content: ReactNode }> = [
    {
      icon: <PhoneIcon />,
      content: <a href={site.phone.href}>{site.phone.display}</a>,
    },
    {
      icon: <MailIcon />,
      content: (
        <a href={`mailto:${site.email}`} className="break-all">
          {site.email}
        </a>
      ),
    },
    {
      icon: <MapPinIcon />,
      content: (
        <a href={site.address.mapsUrl} target="_blank" rel="noreferrer">
          {fullAddress}
        </a>
      ),
    },
    { icon: <ClockIcon />, content: t('common.hours', site.hours) },
  ]

  // Sin backend todavía: arma el correo para appointment@ con los datos del formulario.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const areaLabel = practiceAreas.includes(area as PracticeArea)
      ? t(`areas.items.${area as PracticeArea}.title`)
      : t('contact.form.other')
    const body = [
      `${t('contact.form.name')}: ${name}`,
      `${t('contact.form.phone')}: ${data.get('phone') ?? ''}`,
      `${t('contact.form.email')}: ${data.get('email') ?? ''}`,
      `${t('contact.form.caseType')}: ${areaLabel}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')
    const subject = t('contact.form.mailSubject', { name })
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="bg-white">
      <Container className="flex flex-wrap items-start gap-16 py-24 sm:py-28">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <SectionHeading
            as={headingAs}
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
          />
          <Reveal delay={0.2}>
            <p className="text-[17px] leading-relaxed text-ink-600">
              {t('contact.lead')}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="flex flex-col gap-3.5 pt-3 text-[15px] font-semibold text-ink-900">
              {details.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 [&_a]:transition-colors [&_a:hover]:text-primary-700 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-[1.6] [&_svg]:text-primary-600"
                >
                  {item.icon}
                  {item.content}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="min-w-0 flex-[1_1_480px]" delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 border border-t-2 border-ink-200 border-t-gold-500 bg-ink-50 px-5 py-10 sm:px-10"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-name`}>{t('contact.form.name')}</Label>
              <Input
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                required
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-phone`}>{t('contact.form.phone')}</Label>
              <Input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={fieldClass}
              />
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <Label htmlFor={`${id}-email`}>{t('contact.form.email')}</Label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
              />
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <Label htmlFor={`${id}-area`}>{t('contact.form.caseType')}</Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger
                  id={`${id}-area`}
                  className={`${fieldClass} w-full`}
                >
                  <SelectValue
                    placeholder={t('contact.form.caseTypePlaceholder')}
                  />
                </SelectTrigger>
                <SelectContent position="popper" data-lenis-prevent>
                  {practiceAreas.map((slug) => (
                    <SelectItem key={slug} value={slug}>
                      {t(`areas.items.${slug}.title`)}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">
                    {t('contact.form.other')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <Label htmlFor={`${id}-message`}>
                {t('contact.form.message')}
              </Label>
              <Textarea
                id={`${id}-message`}
                name="message"
                rows={4}
                required
                className="min-h-32 rounded-sm border-ink-300 bg-white px-3.5 py-3 text-[15px] md:text-[15px]"
              />
            </div>
            <div className="col-span-full flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs text-xs leading-normal text-ink-600">
                {t('contact.form.disclaimer')}
              </p>
              <Button type="submit" size="lg" className="h-12 px-8 text-base">
                {t('contact.form.submit')}
              </Button>
            </div>
            <div aria-live="polite" className="col-span-full">
              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="bg-primary-50 px-4 py-3 text-sm text-primary-900"
                  >
                    {t('contact.form.success', { email: site.email })}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
