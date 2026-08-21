import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate, urlFor } from '@/lib/utils'

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const readTime = post.estimatedReadingTime ?? 3

  // Build Sanity image URL if available, otherwise null (no image shown)
  const coverSrc = post.coverImage
    ? urlFor(post.coverImage).width(800).height(352).auto('format').url()
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="glass-card block p-7 group h-full"
      aria-label={`Read: ${post.title}`}
    >
      {/* Cover image — only shown when a real URL exists */}
      {coverSrc && (
        <div className="relative w-full h-44 mb-5 rounded-2xl overflow-hidden">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2
        className="font-bold text-lg leading-snug mb-2 transition-colors duration-200 group-hover:opacity-80"
        style={{ color: 'var(--text)' }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-2"
        style={{ color: 'var(--muted)' }}
      >
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {readTime} min read
        </span>
      </div>
    </Link>
  )
}
