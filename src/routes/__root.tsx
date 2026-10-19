import {
  Link,
  Outlet,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { MotionConfig, cancelFrame, frame, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { LenisRef } from 'lenis/react'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { EASE } from '@/components/motion/reveal'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

import 'lenis/dist/lenis.css'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const { t } = useTranslation()
  const lenisRef = useRef<LenisRef>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Drive Lenis from Motion's frame loop so both share one requestAnimationFrame
  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  // Cada sección es una página: al navegar volvemos arriba sin animación
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          lerp: 0.35,
          wheelMultiplier: 0.9,
        }}
      />
      <a
        href="#contenido"
        className="sr-only z-50 bg-primary-950 px-4 py-3 text-ink-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('common.skipToContent')}
      </a>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <motion.main
          id="contenido"
          key={pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Outlet />
        </motion.main>
        <SiteFooter />
      </div>
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </MotionConfig>
  )
}

function NotFound() {
  const { t } = useTranslation()

  return (
    <Container className="flex flex-col items-start gap-6 py-32">
      <h1 className="font-heading text-5xl text-primary-950">
        {t('notFound.title')}
      </h1>
      <p className="text-lg text-ink-600">{t('notFound.text')}</p>
      <Button asChild size="lg" className="h-12 px-6 text-base">
        <Link to="/">{t('notFound.back')}</Link>
      </Button>
    </Container>
  )
}
