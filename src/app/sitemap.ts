import type { MetadataRoute } from 'next'
import { getBookmarks, getPosts } from '@/lib/sanity.queries'
import { sampleBookmarks, samplePosts } from '@/lib/sample-data'
import { absoluteUrl } from '@/lib/site'

async function getPublishedPosts() {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const posts = await getPosts()
      if (posts.length > 0) return posts
    }
  } catch {
    return samplePosts
  }

  return samplePosts
}

async function getBookmarkTopics() {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const bookmarks = await getBookmarks()
      if (bookmarks.length > 0) {
        return Array.from(new Set(bookmarks.map((bookmark) => bookmark.topic)))
      }
    }
  } catch {
    return Array.from(new Set(sampleBookmarks.map((bookmark) => bookmark.topic)))
  }

  return Array.from(new Set(sampleBookmarks.map((bookmark) => bookmark.topic)))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, bookmarkTopics] = await Promise.all([
    getPublishedPosts(),
    getBookmarkTopics(),
  ])

  const now = new Date()

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [absoluteUrl('/aboutme.jpg')],
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [absoluteUrl('/aboutme.jpg')],
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/answers'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [absoluteUrl('/aboutme.jpg')],
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/bookmarks'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/ai-summary.json'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug.current}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...bookmarkTopics.map((topic) => ({
      url: absoluteUrl(`/bookmarks/${encodeURIComponent(topic)}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
