import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'

import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import {
  FormField,
  FormStatus,
  fieldClass,
  fieldErrorId,
} from '@/components/shared/form-field'
import { GoldCard } from '@/components/shared/gold'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateEmail } from '@/lib/contact-validation'

const loginFields = ['email', 'password'] as const
type LoginField = (typeof loginFields)[number]

function validateLoginField(field: LoginField, value: string) {
  if (field === 'email') return validateEmail(value)
  return value ? undefined : 'passwordRequired'
}

type LoginError = NonNullable<ReturnType<typeof validateLoginField>>

export function LoginForm() {
  const { t } = useTranslation()
  const id = useId()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<LoginField, LoginError>>>(
    {},
  )

  const fieldId = (field: LoginField) => `${id}-${field}`

  function setFieldError(field: LoginField, value: string) {
    setErrors((current) => ({
      ...current,
      [field]: validateLoginField(field, value),
    }))
  }

  // Igual que en contacto: un campo vacío solo se marca al enviar; uno ya marcado se corrige al escribir.
  const inputProps = (field: LoginField) => ({
    id: fieldId(field),
    name: field,
    required: true,
    'aria-invalid': Boolean(errors[field]) || undefined,
    'aria-describedby': errors[field] ? fieldErrorId(fieldId(field)) : undefined,
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value.trim()) setFieldError(field, event.target.value)
    },
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (errors[field]) setFieldError(field, event.target.value)
    },
    className: fieldClass,
  })

  const fieldProps = (field: LoginField) => {
    const error = errors[field]
    return {
      id: fieldId(field),
      label: t(`login.${field}`),
      error: error && t(`login.errors.${error}`),
    }
  }

  // Sin backend todavía: no se autentica ni se guardan las credenciales.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const nextErrors: typeof errors = {}
    for (const field of loginFields) {
      nextErrors[field] = validateLoginField(
        field,
        String(data.get(field) ?? ''),
      )
    }
    const firstInvalid = loginFields.find((field) => nextErrors[field])
    setErrors(nextErrors)
    setSubmitted(!firstInvalid)
    if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus()
  }

  return (
    <section className="relative flex min-h-svh items-center">
      <Button
        asChild
        variant="outline"
        size="icon-lg"
        className="absolute top-4 left-4 size-11 sm:top-6 sm:left-6"
      >
        {/* El rewrite del router añade el prefijo del idioma actual */}
        <Link to="/" aria-label={t('login.back')} title={t('login.back')}>
          <ArrowLeftIcon className="size-5" />
        </Link>
      </Button>

      <Container className="flex max-w-md flex-col gap-6 pt-20 pb-12">
        <SectionHeading as="h1" title={t('login.title')} />
        <Reveal className="min-w-0" delay={0.15}>
          <GoldCard asChild className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} noValidate>
              <Stagger className="flex flex-col gap-4">
                <StaggerItem>
                  <FormField {...fieldProps('email')}>
                    <Input
                      type="email"
                      autoComplete="username"
                      {...inputProps('email')}
                    />
                  </FormField>
                </StaggerItem>
                <StaggerItem>
                  <FormField {...fieldProps('password')}>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...inputProps('password')}
                    />
                  </FormField>
                </StaggerItem>
                <StaggerItem className="flex flex-col">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 px-6 text-[15px]"
                  >
                    {t('login.submit')}
                  </Button>
                </StaggerItem>
              </Stagger>
            </form>
          </GoldCard>
          <FormStatus show={submitted}>{t('login.unavailable')}</FormStatus>
        </Reveal>
      </Container>
    </section>
  )
}
