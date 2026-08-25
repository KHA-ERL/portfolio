import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity.client'
import type { Project, SanityImage } from '@/types'

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

function getPortableTextContent(value: unknown): string {
  if (!value) return ''

  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    return value.map(getPortableTextContent).filter(Boolean).join(' ')
  }

  if (typeof value !== 'object') return ''

  const record = value as Record<string, unknown>
  const chunks: string[] = []

  if (typeof record.text === 'string') chunks.push(record.text)
  if (typeof record.code === 'string') chunks.push(record.code)
  if (record.children) chunks.push(getPortableTextContent(record.children))

  return chunks.join(' ')
}

export function estimateReadingTime(body: unknown[] | string | null | undefined): number {
  const text = getPortableTextContent(body).trim()
  const wordCount = text ? text.split(/\s+/).length : 0

  return Math.max(1, Math.ceil(wordCount / 200))
}

export async function getOgImage(url: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    if (!url) return null

    const res = await fetch(url, {
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeout)
  }
}

export type ProjectPreview =
  | {
      type: 'image'
      src: string
    }
  | {
      type: 'iframe'
      src: string
    }
  | null

function getGithubOpenGraphImage(url: string): string | null {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname !== 'github.com' && parsedUrl.hostname !== 'www.github.com') {
      return null
    }

    const githubPath = parsedUrl.pathname.replace(/^\/+/, '').replace(/\/+$/, '')
    if (!githubPath) return null

    return `https://opengraph.githubassets.com/portfolio-preview/${githubPath}`
  } catch {
    return null
  }
}

async function getUrlPreview(url: string, allowIframe: boolean): Promise<ProjectPreview> {
  const image = await getOgImage(url)

  if (image) {
    return {
      type: 'image',
      src: image,
    }
  }

  const githubImage = getGithubOpenGraphImage(url)

  if (githubImage) {
    return {
      type: 'image',
      src: githubImage,
    }
  }

  if (!allowIframe) return null

  return {
    type: 'iframe',
    src: url,
  }
}

export async function getProjectPreview(project: Project): Promise<ProjectPreview> {
  if (project.coverImage) {
    return {
      type: 'image',
      src: urlFor(project.coverImage).width(600).height(400).url(),
    }
  }

  if (project.liveUrl) {
    return getUrlPreview(project.liveUrl, true)
  }

  if (project.githubUrl) {
    return getUrlPreview(project.githubUrl, true)
  }

  return null
}
