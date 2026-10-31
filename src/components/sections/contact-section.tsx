import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from 'react'

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
import { useHideCallBar } from '@/lib/call-bar'
import { contactFields, validateContactField } from '@/lib/contact-validation'
import type { PracticeArea } from '@/content/practice-areas'
import type { ContactError, ContactField } from '@/lib/contact-validation'

const fieldClass = 'h-11 rounded-sm px-3 text-[15px] md:text-[15px]'

type ContactSectionProps = {
  defaultArea?: PracticeArea
  headingAs?: 'h1' | 'h2'
  /** Versión del landing: el teléfono pasa a botón y se quita el texto de introducción. */
  condensed?: boolean
}

export function ContactSection({
  defaultArea,
  headingAs = 'h2',
  condensed = false,
}: ContactSectionProps) {
  const { t } = useTranslation()
  const id = useId()
  const [area, setArea] = useState<string>(defaultArea ?? '')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<
    Partial<Record<ContactField, ContactError>>
  >({})
  const sectionRef = useRef<HTMLElement>(null)
  useHideCallBar(sectionRef)

  const details: Array<{ icon: ReactNode; content: ReactNode }> = [
    ...(condensed
      ? []
      : [
          {
            icon: <PhoneIcon />,
            content: <a href={site.phone.href}>{site.phone.display}</a>,
          },
        ]),
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

  const fieldId = (field: ContactField) => `${id}-${field}`
  const errorId = (field: ContactField) => `${id}-${field}-error`

  function setFieldError(field: ContactField, value: string) {
    setErrors((current) => ({
      ...current,
      [field]: validateContactField(field, value),
    }))
  }

  // Un campo vacío no se marca al salir de él, solo al enviar; uno ya marcado se corrige al escribir.
  const textFieldProps = (field: ContactField) => ({
    id: fieldId(field),
    name: field,
    required: true,
    'aria-invalid': Boolean(errors[field]) || undefined,
    'aria-describedby': errors[field] ? errorId(field) : undefined,
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value.trim()) setFieldError(field, event.target.value)
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (errors[field]) setFieldError(field, event.target.value)
    },
    className: fieldClass,
  })

  function fieldError(field: ContactField) {
    const error = errors[field]
    return error ? (
      <p
        id={errorId(field)}
        role="alert"
        className="text-[13px] leading-snug text-destructive"
      >
        {t(`contact.form.errors.${error}`)}
      </p>
    ) : null
  }

  // Sin backend todavía: arma el correo para appointment@ con los datos del formulario.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (field: 'name' | 'phone' | 'email') =>
      String(data.get(field) ?? '').trim()

    const nextErrors: typeof errors = {}
    for (const field of contactFields) {
      nextErrors[field] = validateContactField(
        field,
        field === 'area' ? area : value(field),
      )
    }
    const firstInvalid = contactFields.find((field) => nextErrors[field])
    setErrors(nextErrors)
    if (firstInvalid) {
      setSent(false)
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    const name = value('name')
    const areaLabel = practiceAreas.includes(area as PracticeArea)
      ? t(`areas.items.${area as PracticeArea}.title`)
      : t('contact.form.other')
    const body = [
      `${t('contact.form.name')}: ${name}`,
      `${t('contact.form.phone')}: ${value('phone')}`,
      `${t('contact.form.email')}: ${value('email')}`,
      `${t('contact.form.caseType')}: ${areaLabel}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')
    const subject = t('contact.form.mailSubject', { name })
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section ref={sectionRef} className="border-t border-border">
      <Container className="grid items-start gap-8 py-12 sm:py-16 lg:grid-cols-[2fr_3fr] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-4">
          <SectionHeading
            as={headingAs}
            title={t('contact.title')}
          />
          {condensed ? (
            <>
              <p className="leading-relaxed text-muted-foreground">
                {t('landing.contact.lead')}
              </p>
              <Button asChild size="lg" className="h-12 w-fit px-6 text-[15px]">
                <a href={site.phone.href}>
                  <PhoneIcon />
                  {t('common.call', { phone: site.phone.display })}
                </a>
              </Button>
            </>
          ) : (
            <Reveal delay={0.2}>
              <p className="leading-relaxed text-muted-foreground">
                {t('contact.lead')}
              </p>
            </Reveal>
          )}
          <Reveal delay={condensed ? 0 : 0.3}>
            <ul className="flex flex-col gap-3 pt-1 text-[15px] font-medium text-foreground">
              {details.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 [&_a]:transition-colors [&_a:hover]:text-link [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:stroke-[1.6] [&_svg]:text-muted-foreground"
                >
                  {item.icon}
                  {item.content}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="min-w-0" delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid items-start gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2 sm:p-6"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={fieldId('name')}>{t('contact.form.name')}</Label>
              <Input autoComplete="name" {...textFieldProps('name')} />
              {fieldError('name')}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={fieldId('phone')}>
                {t('contact.form.phone')}
              </Label>
              <Input
                type="tel"
                autoComplete="tel"
                {...textFieldProps('phone')}
              />
              {fieldError('phone')}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={fieldId('email')}>
                {t('contact.form.email')}
              </Label>
              <Input
                type="email"
                autoComplete="email"
                {...textFieldProps('email')}
              />
              {fieldError('email')}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={fieldId('area')}>
                {t('contact.form.caseType')}
              </Label>
              <Select
                value={area}
                onValueChange={(value) => {
                  setArea(value)
                  setFieldError('area', value)
                }}
              >
                <SelectTrigger
                  id={fieldId('area')}
                  aria-required
                  aria-invalid={Boolean(errors.area) || undefined}
                  aria-describedby={errors.area ? errorId('area') : undefined}
                  className={`${fieldClass} w-full data-[size=default]:h-11`}
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
              {fieldError('area')}
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <Label htmlFor={`${id}-message`}>
                {t('contact.form.message')}
              </Label>
              <Textarea
                id={`${id}-message`}
                name="message"
                rows={3}
                className="min-h-24 rounded-sm px-3 py-2.5 text-[15px] md:text-[15px]"
              />
            </div>
            <div className="col-span-full flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs text-[13px] leading-snug text-muted-foreground">
                {t('contact.form.disclaimer')}
              </p>
              <Button type="submit" size="lg" className="h-11 px-6 text-[15px]">
                {t('contact.form.submit')}
              </Button>
            </div>
          </form>
          <div aria-live="polite">
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-3 flex flex-col items-start gap-3 rounded-sm bg-accent px-4 py-3 text-sm text-accent-foreground"
                >
                  <p>{t('contact.form.draftOpened', { email: site.email })}</p>
                  <Button asChild className="h-11 px-5 text-[15px]">
                    <a href={site.phone.href}>
                      <PhoneIcon />
                      {t('common.call', { phone: site.phone.display })}
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
