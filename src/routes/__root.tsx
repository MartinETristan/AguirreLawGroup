import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ReactLenis } from 'lenis/react'
import { cancelFrame, frame } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { LenisRef } from 'lenis/react'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import 'lenis/dist/lenis.css'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const lenisRef = useRef<LenisRef>(null)

  // Drive Lenis from Motion's frame loop so both share one requestAnimationFrame
  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          lerp: 0.35,
          wheelMultiplier: 0.9,
        }}
      />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
