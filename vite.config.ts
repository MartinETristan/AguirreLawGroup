import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { seo } from './scripts/vite-seo'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Se importa de forma diferida: sin esto Vite lo descubre tarde y recarga la página en desarrollo.
  optimizeDeps: { include: ['maplibre-gl'] },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    seo(),
  ],
})

export default config
