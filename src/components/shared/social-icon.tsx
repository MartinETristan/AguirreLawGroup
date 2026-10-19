import type { SocialId } from '@/content/site'

// lucide ya no incluye logotipos de marcas: trazos propios, mismo estilo de línea.
const paths: Record<SocialId, React.ReactNode> = {
  facebook: (
    <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
}

export function SocialIcon({
  id,
  className,
}: {
  id: SocialId
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[id]}
    </svg>
  )
}
