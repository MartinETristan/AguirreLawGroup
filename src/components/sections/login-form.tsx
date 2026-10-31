import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { FormEvent } from 'react'

import { EASE, Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const fieldClass = 'h-11 rounded-sm px-3 text-[15px] md:text-[15px]'

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
    <section>
      <Container className="flex max-w-md flex-col gap-6 py-12 sm:py-16">
        <SectionHeading
          as="h1"
          eyebrow={t('login.eyebrow')}
          title={t('login.title')}
        />
        <Reveal className="min-w-0" delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-lg border border-t-2 border-border border-t-gold-500 bg-card p-5 sm:p-6"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-email`}>{t('login.email')}</Label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="username"
                required
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${id}-password`}>{t('login.password')}</Label>
              <Input
                id={`${id}-password`}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={fieldClass}
              />
            </div>
            <Button type="submit" size="lg" className="h-11 px-6 text-[15px]">
              {t('login.submit')}
            </Button>
          </form>
          <div aria-live="polite">
            <AnimatePresence>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-3 rounded-sm bg-accent px-4 py-3 text-sm text-accent-foreground"
                >
                  {t('login.unavailable')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
