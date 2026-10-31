import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { seo } from './scripts/vite-seo.ts'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // MapLibre no se puede dividir (~1 MB) y solo se carga en /contact-us. El límite es global: vigila el resto a mano.
  build: { chunkSizeWarningLimit: 1100 },
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
