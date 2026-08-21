import { metadata as studioMetadata } from 'next-sanity/studio'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Studio | Michael Paul',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}