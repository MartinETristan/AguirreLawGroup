# AguirreLawGroup

SPA con React 19, Vite 8 y TanStack Router (rutas por archivos en `src/routes`).

## Stack

- **Routing:** TanStack Router + Devtools (se eliminan en el build de producción)
- **Estilos:** Tailwind CSS v4 + shadcn/ui (preset Nova, base Radix, iconos Lucide)
- **Scroll:** Lenis (`ReactLenis` en `src/routes/__root.tsx`)

## Scripts

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build
pnpm preview
pnpm lint
pnpm format
```

## shadcn/ui y React Bits

Los componentes se copian al proyecto con el CLI (no es dependencia del proyecto):

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add @react-bits/<Componente>-TS-TW
```

El CSS base de shadcn está inlined en `src/styles.css` (`shadcn eject`).
Revisa las dependencias que añade cada componente de React Bits antes de aceptar.
