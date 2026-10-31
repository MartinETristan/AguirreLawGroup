import { Link } from '@tanstack/react-router'
import { useLenis } from 'lenis/react'
import { ChevronDownIcon, MenuIcon, PhoneIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { NavigationMenu } from 'radix-ui'
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
import { practiceAreas } from '@/content/practice-areas'
import { site } from '@/content/site'

const navLinkClass =
  'group relative block py-2.5 text-muted-foreground transition-colors hover:text-foreground'

function NavUnderline({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <motion.span
      layoutId="nav-underline"
      className="absolute inset-x-0 bottom-1 h-px bg-gold-500"
      transition={{ duration: 0.5, ease: EASE }}
    />
  ) : (
    <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-primary-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
  )
}

export function SiteHeader() {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openNavItem, setOpenNavItem] = useState('')

  // Se oculta al bajar y reaparece al subir; Lenis nos da la dirección real.
  const lenis = useLenis(({ scroll, direction }) => {
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
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="shrink-0" aria-label={site.name}>
          <img
            src={site.logo}
            alt={site.name}
            width={95}
            height={40}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <NavigationMenu.Root
          aria-label={t('nav.label')}
          delayDuration={80}
          value={openNavItem}
          onValueChange={setOpenNavItem}
          className="hidden lg:block"
        >
          <NavigationMenu.List className="flex items-center gap-6 text-sm font-medium">
            {mainNav.map((item) =>
              item.key === 'areas' ? (
                <NavigationMenu.Item
                  key={item.to}
                  value={item.key}
                  className="relative"
                >
                  <NavigationMenu.Trigger asChild>
                    <Link
                      to={item.to}
                      className={navLinkClass}
                      activeProps={{ className: 'text-foreground' }}
                      // El activador es un enlace: Enter navega y ↓ abre el submenú
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' && !openNavItem) {
                          event.preventDefault()
                          setOpenNavItem(item.key)
                        }
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="inline-flex items-center gap-1">
                            {t(`nav.${item.key}`)}
                            <ChevronDownIcon
                              className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                              aria-hidden="true"
                            />
                          </span>
                          <NavUnderline isActive={isActive} />
                        </>
                      )}
                    </Link>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-full left-0 w-72 pt-3">
                    <ul className="flex flex-col rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                      {practiceAreas.map((slug) => (
                        <li key={slug}>
                          <NavigationMenu.Link asChild>
                            <Link
                              to="/areas/$area"
                              params={{ area: slug }}
                              className="block rounded-sm px-3 py-2 text-popover-foreground transition-colors hover:bg-muted"
                              activeProps={{ className: 'text-link' }}
                            >
                              {t(`areas.items.${slug}.title`)}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={item.to}>
                  <NavigationMenu.Link asChild>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === '/' }}
                      className={navLinkClass}
                      activeProps={{ className: 'text-foreground' }}
                    >
                      {({ isActive }) => (
                        <>
                          {t(`nav.${item.key}`)}
                          <NavUnderline isActive={isActive} />
                        </>
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher className="hidden min-[400px]:inline-flex" />
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden h-10 px-4 text-sm lg:inline-flex"
          >
            <Link to="/acceso">{t('nav.login')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="hidden h-10 px-4 text-sm lg:inline-flex"
          >
            <Link to="/contacto">{t('common.freeConsultation')}</Link>
          </Button>

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
              className="w-full gap-0 sm:max-w-sm"
            >
              <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
              <SheetDescription className="sr-only">
                {site.name}
              </SheetDescription>
              <div className="flex h-full flex-col gap-8 overflow-y-auto px-6 pt-14 pb-6">
                <nav aria-label={t('nav.label')} className="flex flex-col">
                  {mainNav.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.05 * i,
                      }}
                      className="border-b border-border"
                    >
                      <Link
                        to={item.to}
                        onClick={() => handleMenu(false)}
                        activeOptions={{ exact: item.to === '/' }}
                        className="block py-3 font-heading text-[28px] text-foreground"
                        activeProps={{ className: 'text-link' }}
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                      {item.key === 'areas' && (
                        <ul className="flex flex-col pb-3">
                          {practiceAreas.map((slug) => (
                            <li key={slug}>
                              <Link
                                to="/areas/$area"
                                params={{ area: slug }}
                                onClick={() => handleMenu(false)}
                                className="block py-2 text-[15px] text-muted-foreground"
                                activeProps={{ className: 'text-link' }}
                              >
                                {t(`areas.items.${slug}.title`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <Button asChild size="lg" className="h-12 text-[15px]">
                    <Link to="/contacto" onClick={() => handleMenu(false)}>
                      {t('common.scheduleConsultation')}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 text-[15px]"
                  >
                    <a href={site.phone.href}>
                      <PhoneIcon />
                      {site.phone.display}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 text-[15px]"
                  >
                    <Link to="/acceso" onClick={() => handleMenu(false)}>
                      {t('nav.login')}
                    </Link>
                  </Button>
                  <LanguageSwitcher className="self-start" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
