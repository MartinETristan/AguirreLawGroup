import { Link } from '@tanstack/react-router'
import { useLenis } from 'lenis/react'
import { MenuIcon, PhoneIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from './language-switcher'
import { EASE } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { mainNav } from '@/content/navigation'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Se oculta al bajar y reaparece al subir; Lenis nos da la dirección real.
  const lenis = useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 8)
    if (scroll < 160) setHidden(false)
    else if (direction === 1) setHidden(true)
    else if (direction === -1) setHidden(false)
  })

  function handleMenu(open: boolean) {
    setMenuOpen(open)
    if (open) lenis?.stop()
    else lenis?.start()
  }

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur transition-shadow duration-500',
        scrolled && 'shadow-[0_10px_30px_-18px_rgba(15,37,69,0.25)]',
      )}
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="border-b border-ink-200 bg-ink-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-[13px] text-ink-600 sm:px-6">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-gold-500"
            />
            <span>
              {t('common.freeConsultation')} · {t('common.hours', site.hours)}
            </span>
          </div>
          <div className="flex w-full items-center justify-between gap-6 sm:w-auto">
            <a
              href={site.phone.href}
              className="font-semibold text-ink-900 transition-colors hover:text-primary-700"
            >
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden transition-colors hover:text-primary-700 md:inline"
            >
              {site.email}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <nav
        aria-label={t('nav.label')}
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6"
      >
        <Link to="/" className="shrink-0" aria-label={site.name}>
          <img
            src={site.logo}
            alt={site.name}
            width={170}
            height={52}
            className="h-11 w-auto sm:h-13"
          />
        </Link>

        <div className="hidden items-center gap-9 text-[15px] font-medium lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative py-2.5 text-ink-900 transition-colors hover:text-primary-700"
              activeProps={{ className: 'text-primary-700' }}
            >
              {({ isActive }) => (
                <>
                  {t(`nav.${item.key}`)}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-gold-500"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  )}
                </>
              )}
            </Link>
          ))}
          <Button asChild size="lg" className="h-11 px-5 text-[15px]">
            <Link to="/contacto">{t('common.freeConsultation')}</Link>
          </Button>
        </div>

        <Sheet open={menuOpen} onOpenChange={handleMenu}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 lg:hidden"
              aria-label={t('nav.openMenu')}
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            data-lenis-prevent
            className="w-full gap-0 bg-ink-50 sm:max-w-sm"
          >
            <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
            <SheetDescription className="sr-only">{site.name}</SheetDescription>
            <div className="flex h-full flex-col gap-10 overflow-y-auto px-6 pt-16 pb-8">
              <nav aria-label={t('nav.label')} className="flex flex-col">
                {[{ to: '/', key: 'home' } as const, ...mainNav].map(
                  (item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.05 * i,
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => handleMenu(false)}
                        activeOptions={{ exact: item.to === '/' }}
                        className="block border-b border-ink-200 py-4 font-heading text-3xl text-primary-950"
                        activeProps={{ className: 'text-primary-700' }}
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                    </motion.div>
                  ),
                )}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <Button asChild size="lg" className="h-12 text-base">
                  <Link to="/contacto" onClick={() => handleMenu(false)}>
                    {t('common.scheduleConsultation')}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 text-base"
                >
                  <a href={site.phone.href}>
                    <PhoneIcon />
                    {site.phone.display}
                  </a>
                </Button>
                <LanguageSwitcher className="self-start" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
