import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { currentLanguage, languages } from '@/i18n'
import { localizePath } from '@/i18n/paths'
import { cn } from '@/lib/utils'

const itemClass =
  'inline-flex h-11 min-w-11 items-center lg:h-8 justify-center px-2.5 text-xs font-bold tracking-[0.08em] uppercase'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const active = currentLanguage(i18n.resolvedLanguage)
  const location = useRouterState({ select: (s) => s.location })

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn(
        'inline-flex overflow-hidden rounded-sm border border-input',
        className,
      )}
    >
      {languages.map((lng) =>
        lng === active ? (
          // Sin enlace: el idioma actual no debe recargar la página
          <span
            key={lng}
            lang={lng}
            aria-current="true"
            className={cn(itemClass, 'bg-primary text-primary-foreground')}
          >
            {lng}
          </span>
        ) : (
          // Enlace real con recarga: cada idioma es su propia URL indexable
          <a
            key={lng}
            href={`${localizePath(location.pathname, lng)}${location.searchStr}`}
            hrefLang={lng}
            lang={lng}
            className={cn(
              itemClass,
              'text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
            )}
          >
            {lng}
          </a>
        ),
      )}
    </div>
  )
}
