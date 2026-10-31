import { ChevronDownIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { faq } from '@/content/faq'
import { currentLanguage } from '@/i18n'

export function FaqList() {
  const { i18n } = useTranslation()
  const lang = currentLanguage(i18n.resolvedLanguage)

  return (
    <div className="flex flex-col">
      {faq.map((item) => (
        <details
          key={item.id}
          className="group border-b border-border last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] leading-snug font-semibold text-foreground transition-colors hover:text-link [&::-webkit-details-marker]:hidden">
            {item.question[lang]}
            <ChevronDownIcon
              className="size-4.5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-4 text-[15px] leading-relaxed text-muted-foreground">
            {item.answer[lang]}
          </p>
        </details>
      ))}
    </div>
  )
}
