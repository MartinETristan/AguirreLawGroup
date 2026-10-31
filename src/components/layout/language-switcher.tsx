import { useTranslation } from 'react-i18next'

import { currentLanguage, languages } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const active = currentLanguage(i18n.resolvedLanguage)

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn(
        'inline-flex overflow-hidden rounded-sm border border-input',
        className,
      )}
    >
      {languages.map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          aria-pressed={lng === active}
          onClick={() => void i18n.changeLanguage(lng)}
          className={cn(
            'h-8 min-w-11 px-2.5 text-xs font-bold tracking-[0.08em] uppercase transition-colors duration-300 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
            lng === active
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
