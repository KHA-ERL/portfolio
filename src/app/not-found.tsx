import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'This page does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Big number */}
      <p
        className="text-[8rem] sm:text-[12rem] font-black leading-none select-none"
        style={{
          color: 'var(--accent)',
          opacity: 0.15,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        404
      </p>

      <div className="-mt-8">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: 'var(--text)' }}
        >
          Page not found
        </h1>
        <p
          className="text-base max-w-sm mx-auto mb-8"
          style={{ color: 'var(--muted)' }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/blog" className="btn-ghost">
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  )
}
