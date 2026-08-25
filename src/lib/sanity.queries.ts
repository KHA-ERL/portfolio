import { groq } from 'next-sanity'
import { client } from './sanity.client'
import { estimateReadingTime } from './utils'
import type { Post, Bookmark, AboutPage, Project } from '@/types'

// ── Blog Posts ──────────────────────────────────────────────────────────────

const publishedPostFilter = groq`
  _type == "post" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  defined(publishedAt) &&
  dateTime(publishedAt) <= dateTime(now())
`

type PostWithReadingText = Post & {
  readingText?: string
}

function withEstimatedReadingTime<T extends PostWithReadingText>(post: T): Post {
  const { readingText, ...publishedPost } = post

  return {
    ...publishedPost,
    estimatedReadingTime: estimateReadingTime(readingText ?? publishedPost.body),
  }
}

export const postsQuery = groq`
  *[${publishedPostFilter}] | order(publishedAt desc) {
    _id, _type, title, slug, publishedAt, excerpt, coverImage, tags,
    "readingText": pt::text(body)
  }
`

export const postBySlugQuery = groq`
  *[${publishedPostFilter} && slug.current == $slug][0] {
    _id, _type, title, slug, publishedAt, excerpt, coverImage, tags, body,
    "readingText": pt::text(body)
  }
`

export const latestPostsQuery = groq`
  *[${publishedPostFilter}] | order(publishedAt desc)[0...3] {
    _id, _type, title, slug, publishedAt, excerpt, coverImage, tags,
    "readingText": pt::text(body)
  }
`

export const allSlugsQuery = groq`
  *[${publishedPostFilter}] { "slug": slug.current }
`

// ── Projects ────────────────────────────────────────────────────────────────

export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id, title, slug, description, coverImage, status, githubUrl, liveUrl, techStack, publishedAt
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc)[0...3] {
    _id, title, slug, description, coverImage, status, githubUrl, liveUrl, techStack, publishedAt
  }
`

// ── Bookmarks ───────────────────────────────────────────────────────────────

export const bookmarksQuery = groq`
  *[_type == "bookmark"] | order(topic asc, title asc) {
    _id, title, url, description, topic, tags, isPdf, image
  }
`

export const featuredBookmarksQuery = groq`
  *[_type == "bookmark"] | order(_createdAt desc)[0...6] {
    _id, title, url, description, topic, tags, isPdf, image
  }
`

// ── About ───────────────────────────────────────────────────────────────────

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id, name, role, avatar, bio, skills, socialLinks
  }
`

// ── Fetchers ─────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch<PostWithReadingText[]>(postsQuery)

  return posts.map(withEstimatedReadingTime)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch<PostWithReadingText | null>(postBySlugQuery, { slug })

  return post ? withEstimatedReadingTime(post) : null
}

export async function getLatestPosts(): Promise<Post[]> {
  const posts = await client.fetch<PostWithReadingText[]>(latestPostsQuery)

  return posts.map(withEstimatedReadingTime)
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allSlugsQuery)
}

export async function getBookmarks(): Promise<Bookmark[]> {
  return client.fetch(bookmarksQuery)
}

export async function getFeaturedBookmarks(): Promise<Bookmark[]> {
  return client.fetch(featuredBookmarksQuery)
}

export async function getAbout(): Promise<AboutPage | null> {
  return client.fetch(aboutQuery)
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    projectsQuery,
    {},
    {
      next: {
        revalidate: 300,
      },
    }
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    featuredProjectsQuery,
    {},
    {
      next: {
        revalidate: 300,
      },
    }
  )
}
