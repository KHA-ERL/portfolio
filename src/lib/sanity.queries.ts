import { groq } from 'next-sanity'
import { client } from './sanity.client'
import type { Post, Bookmark, AboutPage, Project } from '@/types'

// ── Blog Posts ──────────────────────────────────────────────────────────────

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, coverImage, tags
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, coverImage, tags, body
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id, title, slug, publishedAt, excerpt, coverImage, tags
  }
`

export const allSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
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
  return client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(postBySlugQuery, { slug })
}

export async function getLatestPosts(): Promise<Post[]> {
  return client.fetch(latestPostsQuery)
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
  return client.fetch(projectsQuery)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(featuredProjectsQuery)
}
