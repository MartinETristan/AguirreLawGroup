import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FormEvent } from 'react'

import { Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import {
  FormField,
  FormStatus,
  fieldClass,
} from '@/components/shared/form-field'
import { GoldCard } from '@/components/shared/gold'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const { t } = useTranslation()
  const id = useId()
  const [submitted, setSubmitted] = useState(false)

  // Sin backend todavía: no se autentica ni se guardan las credenciales.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
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
          <GoldCard asChild className="flex flex-col gap-4 p-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <FormField id={`${id}-email`} label={t('login.email')}>
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  className={fieldClass}
                />
              </FormField>
              <FormField id={`${id}-password`} label={t('login.password')}>
                <Input
                  id={`${id}-password`}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={fieldClass}
                />
              </FormField>
              <Button type="submit" size="lg" className="h-11 px-6 text-[15px]">
                {t('login.submit')}
              </Button>
            </form>
          </GoldCard>
          <FormStatus show={submitted}>{t('login.unavailable')}</FormStatus>
        </Reveal>
      </Container>
    </section>
  )
}
