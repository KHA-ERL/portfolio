import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity.client'
import type { SanityImage } from '@/types'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function estimateReadingTime(body: unknown[]): number {
  const text = JSON.stringify(body)
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export async function getOgImage(url: string) {
  try {
    if (!url) return null

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: {
        revalidate: 86400,
      },
    })

    if (!res.ok) return null

    const html = await res.text()

    // og:image
    let match = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    )

    // Some websites put content before property
    if (!match) {
      match = html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      )
    }

    // Twitter image fallback
    if (!match) {
      match = html.match(
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
      )
    }

    if (!match) {
      match = html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
      )
    }

    if (!match?.[1]) return null

    // Convert relative image URLs into absolute URLs
    return new URL(match[1], url).toString()
  } catch {
    return null
  }
}
