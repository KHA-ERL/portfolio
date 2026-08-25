import type { ProjectPreview as ProjectPreviewData } from '@/lib/utils'

interface ProjectPreviewProps {
  alt: string
  preview: ProjectPreviewData
  className?: string
}

export default function ProjectPreview({
  alt,
  preview,
  className = 'h-56',
}: ProjectPreviewProps) {
  return (
    <div
      className={`relative w-full border-b bg-[var(--border)] overflow-hidden ${className}`}
      style={{ borderColor: 'var(--border)' }}
    >
      {preview?.type === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview.src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : preview?.type === 'iframe' ? (
        <iframe
          src={preview.src}
          title={`${alt} preview`}
          className="absolute inset-0 h-full w-full border-0 bg-white pointer-events-none transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="opacity-50 text-sm" style={{ color: 'var(--muted)' }}>
            No preview
          </span>
        </div>
      )}
    </div>
  )
}
