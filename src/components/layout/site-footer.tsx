import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/shared/container'
import { SocialIcon } from '@/components/shared/social-icon'
import { footerNav } from '@/content/navigation'
import { site } from '@/content/site'

const headingClass =
  'text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase'
const linkClass = 'text-ink-50 transition-colors hover:text-gold-300'

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-navy-950 text-ink-200">
      <Container className="flex flex-col gap-10 pt-12 pb-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="font-heading text-[28px] leading-tight text-ink-50">
              {site.name}
            </span>
            <p className="text-sm leading-relaxed text-ink-300">
              {t('footer.motto')}
            </p>
            <ul aria-label={t('footer.social')} className="flex gap-2">
              {site.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center border border-ink-50/20 text-ink-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
                  >
                    <SocialIcon id={social.id} className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <h2 className={headingClass}>{t('footer.office')}</h2>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="leading-relaxed text-ink-300 transition-colors hover:text-gold-300"
            >
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </a>
            <span className="text-ink-300">
              {t('common.hours', site.hours)}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <h2 className={headingClass}>{t('footer.contact')}</h2>
            <a href={site.phone.href} className={linkClass}>
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className={`${linkClass} break-all`}
            >
              {site.email}
            </a>
          </div>

          <nav
            aria-label={t('footer.navigation')}
            className="flex flex-col gap-2 text-sm"
          >
            <h2 className={headingClass}>{t('footer.navigation')}</h2>
            {footerNav.map((item) => (
              <Link key={item.to} to={item.to} className={linkClass}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Link to="/contacto" className={linkClass}>
              {t('nav.contact')}
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-ink-50/10 pt-5 text-[13px] text-ink-400">
          <span>
            {t('footer.rights', {
              year: new Date().getFullYear(),
              name: site.name,
            })}
          </span>
          {/* TODO: enlazar a las páginas legales cuando existan */}
          <div className="flex flex-wrap gap-6 text-ink-300">
            <span>{t('footer.legal.privacy')}</span>
            <span>{t('footer.legal.terms')}</span>
            <span>{t('footer.legal.disclaimer')}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
