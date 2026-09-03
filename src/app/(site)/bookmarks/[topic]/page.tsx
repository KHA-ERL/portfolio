import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getBookmarks } from '@/lib/sanity.queries'
import { sampleBookmarks } from '@/lib/sample-data'
import Link from 'next/link'
import { absoluteUrl, getJsonLd } from '@/lib/site'
import { urlFor, getOgImage } from '@/lib/utils'

interface TopicPageProps {
  params: Promise<{
    topic: string
  }>
}

function getSourceName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'Source'
  }
}

function getSourceOrigin(url: string) {
  try {
    return new URL(url).origin
  } catch {
    return url
  }
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic } = await params
  const decodedTopic = decodeURIComponent(topic)

  return {
    title: `${decodedTopic} Bookmarks`,
    description: `Curated ${decodedTopic.toLowerCase()} engineering bookmarks and technical sources collected by Michael Paul.`,
    alternates: {
      canonical: `/bookmarks/${encodeURIComponent(decodedTopic)}`,
    },
  }
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { topic } = await params

  let bookmarks = sampleBookmarks

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityBookmarks = await getBookmarks()
      if (sanityBookmarks.length > 0) bookmarks = sanityBookmarks
    }
  } catch {
    bookmarks = sampleBookmarks
  }

  const data = bookmarks

  const decodedTopic = decodeURIComponent(topic)

  const topicBookmarks = data.filter(
    (bookmark) =>
      bookmark.topic.toLowerCase() ===
      decodedTopic.toLowerCase()
  )

  if (topicBookmarks.length === 0) {
    return (
      <main className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Bookmarks', href: '/bookmarks' },
              { label: 'Topic not found', href: `/bookmarks/${topic}` },
            ]}
          />

          <Link
            href="/bookmarks"
            className="mb-8 inline-block underline"
          >
            ← Back to bookmarks
          </Link>

          <h1 className="text-3xl font-bold">
            Topic not found
          </h1>
        </div>
      </main>
    )
  }

  /*
   * Get preview images BEFORE rendering the cards.
   *
   * If a bookmark has a manually uploaded Sanity image,
   * we don't fetch anything.
   *
   * Otherwise, try to get the OG image from the bookmark URL.
   */
  const ogImages = await Promise.all(
    topicBookmarks.map(async (bookmark) => {
      if (bookmark.image) {
        return null
      }

      return getOgImage(bookmark.url)
    })
  )

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Bookmarks', href: '/bookmarks' },
            {
              label: topicBookmarks[0].topic,
              href: `/bookmarks/${encodeURIComponent(topicBookmarks[0].topic)}`,
            },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getJsonLd({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${topicBookmarks[0].topic} Bookmarks`,
              url: absoluteUrl(`/bookmarks/${encodeURIComponent(topicBookmarks[0].topic)}`),
              hasPart: topicBookmarks.map((bookmark) => ({
                '@type': bookmark.isPdf ? 'DigitalDocument' : 'WebPage',
                name: bookmark.title,
                description: bookmark.description,
                url: bookmark.url,
                isPartOf: {
                  '@type': 'WebSite',
                  name: getSourceName(bookmark.url),
                  url: getSourceOrigin(bookmark.url),
                },
              })),
            }),
          }}
        />

        <Link
          href="/bookmarks"
          className="mb-8 inline-block underline"
        >
          ← Back to bookmarks
        </Link>

        <h1 className="mb-8 text-4xl font-bold">
          {topicBookmarks[0].topic}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {topicBookmarks.map((bookmark, index) => {

            /*
             * Priority:
             *
             * 1. Manually uploaded Sanity image
             * 2. Automatically detected OG image
             * 3. No preview
             */
            const previewImage = bookmark.image
              ? urlFor(bookmark.image)
                  .width(600)
                  .height(400)
                  .url()
              : ogImages[index]

            return (
              <a
                key={bookmark._id}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden bg-[var(--tag-bg)]"
                style={{
                  borderColor: 'var(--border)',
                }}
              >

                {/* Preview image */}
                <div
                  className="relative h-48 w-full border-b bg-[var(--border)]"
                  style={{
                    borderColor: 'var(--border)',
                  }}
                >

                  {previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt={bookmark.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm opacity-50">
                        No preview
                      </span>
                    </div>
                  )}

                </div>

                {/* Bookmark information */}
                <div className="p-5 flex-1 flex flex-col">

                  <h2 className="text-lg font-semibold line-clamp-2">
                    {bookmark.title}
                  </h2>

                  {bookmark.description && (
                    <p className="mt-2 text-sm opacity-70 line-clamp-3">
                      {bookmark.description}
                    </p>
                  )}

                  <p className="mt-4 text-xs uppercase tracking-widest opacity-60">
                    Source: {getSourceName(bookmark.url)}
                  </p>

                </div>

              </a>
            )
          })}

        </div>
      </div>
    </main>
  )
}
