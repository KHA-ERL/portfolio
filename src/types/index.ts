export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  coverImage?: SanityImage
  tags?: string[]
  body?: PortableTextBlock[]
  estimatedReadingTime?: number
}

export interface Bookmark {
  _id: string
  _type: 'bookmark'
  title: string
  url: string
  description?: string
  topic: string
  tags?: string[]
  isPdf?: boolean
  image?: SanityImage
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  description?: string
  coverImage?: SanityImage
  status?: string
  githubUrl?: string
  liveUrl?: string
  techStack?: string[]
  publishedAt: string
}

export interface AboutPage {
  _id: string
  name: string
  role: string
  avatar?: SanityImage
  bio?: PortableTextBlock[]
  skills?: string[]
  socialLinks?: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any
