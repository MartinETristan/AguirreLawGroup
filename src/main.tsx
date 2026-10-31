import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import i18n, { currentLanguage } from './i18n'
import { localizePath, stripLanguagePrefix } from './i18n/paths'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // El scroll lo controla Lenis en __root (vuelve arriba en cada navegación)
  scrollRestoration: false,
  // Las rutas internas no llevan idioma; la URL pública sí (`/es/contact-us`)
  rewrite: {
    input: ({ url }) => {
      url.pathname = stripLanguagePrefix(url.pathname)
      return url
    },
    output: ({ url }) => {
      url.pathname = localizePath(
        url.pathname,
        currentLanguage(i18n.resolvedLanguage),
      )
      return url
    },
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
