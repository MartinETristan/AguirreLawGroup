import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { EASE } from '@/components/motion/reveal'
import { CallButton } from '@/components/shared/call-button'
import { site } from '@/content/site'
import { useCallBarCovered } from '@/lib/call-bar'

/**
 * Llamada siempre a mano en móvil, porque el header se oculta al bajar. Se retira
 * junto a lo que ya ofrece la llamada o necesita el teclado (`useHideCallBar`).
 * El retardo de entrada evita que asome al cargar, antes de saber qué hay en pantalla.
 */
export function MobileCallBar() {
  const { t } = useTranslation()
  const covered = useCallBarCovered()

  return (
    <AnimatePresence>
      {!covered && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background p-2 lg:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0, transition: { duration: 0.25, ease: EASE, delay: 0.2 } }}
          exit={{ y: '100%', transition: { duration: 0.2, ease: EASE } }}
        >
          <CallButton className="h-12 w-full text-[15px]">
            {t('common.call', { phone: site.phone.display })}
          </CallButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
