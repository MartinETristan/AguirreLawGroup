import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Aguirre Law Group</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Button className="mt-6">shadcn/ui</Button>
      <div className="mt-[9000px] mb-5">Este es el final de la pagina</div>
    </div>
  )
}
