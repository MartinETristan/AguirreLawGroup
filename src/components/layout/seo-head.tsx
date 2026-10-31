import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { currentLanguage } from '@/i18n'
import { getPageSeo } from '@/lib/seo'

/** Mantiene el `<head>` al navegar; el HTML inicial de cada ruta ya viene generado en el build. */
export function SeoHead() {
  const { i18n } = useTranslation()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lang = currentLanguage(i18n.resolvedLanguage)

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    const page = getPageSeo(path, lang)

    document.title = page.title
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    for (const { tag, attrs, text } of page.tags) {
      const el = document.createElement(tag)
      el.setAttribute('data-seo', '')
      Object.entries(attrs).forEach(([key, value]) =>
        el.setAttribute(key, value),
      )
      if (text) el.textContent = text
      document.head.appendChild(el)
    }
  }, [pathname, lang])

  return null
}
