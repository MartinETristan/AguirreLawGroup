import { ChevronDownIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { faq } from '@/content/faq'
import { currentLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left text-[15px] leading-snug font-semibold text-foreground transition-colors hover:text-link"
      >
        {question}
        <ChevronDownIcon
          className={cn(
            'size-4.5 shrink-0 text-muted-foreground transition-transform duration-300',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {/* La respuesta sigue en el DOM aunque esté cerrada, para que Google la lea: solo se oculta con CSS */}
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-4 text-[15px] leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqList() {
  const { i18n } = useTranslation()
  const lang = currentLanguage(i18n.resolvedLanguage)

  return (
    <div className="flex flex-col">
      {faq.map((item) => (
        <FaqItem
          key={item.id}
          question={item.question[lang]}
          answer={item.answer[lang]}
        />
      ))}
    </div>
  )
}
