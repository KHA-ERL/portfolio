import type { Post, Bookmark, AboutPage, Project } from '@/types'

export const samplePosts: Post[] = [
  {
    _id: '1',
    _type: 'post',
    title: 'Building Scalable APIs: Lessons from Production',
    slug: { current: 'building-scalable-apis' },
    publishedAt: '2026-07-20T00:00:00Z',
    excerpt:
      'After running distributed systems at scale, I\'ve distilled the most important principles that separate brittle APIs from resilient ones.',
    tags: ['backend', 'api', 'architecture'],
  },
  {
    _id: '2',
    _type: 'post',
    title: 'The Linux Kernel Scheduler: A Deep Dive',
    slug: { current: 'linux-kernel-scheduler' },
    publishedAt: '2026-07-10T00:00:00Z',
    excerpt:
      'Understanding how the Linux CFS scheduler works under the hood — and why it matters for application performance.',
    tags: ['linux', 'systems', 'performance'],
  },
  {
    _id: '3',
    _type: 'post',
    title: 'TypeScript Patterns I Wish I Knew Earlier',
    slug: { current: 'typescript-patterns' },
    publishedAt: '2026-06-28T00:00:00Z',
    excerpt:
      'From discriminated unions to template literal types — the TypeScript features that changed how I write code.',
    tags: ['typescript', 'javascript', 'patterns'],
  },
]

export const sampleBookmarks: Bookmark[] = [
  {
    _id: 'b1',
    _type: 'bookmark',
    title: 'Good API Design — Sean Goedecke',
    url: 'https://www.seangoedecke.com/good-api-design/',
    description:
      'Practical principles for designing APIs that are a joy to use and maintain.',
    topic: 'Backend',
    tags: ['api', 'design'],
    isPdf: false,
  },
  {
    _id: 'b2',
    _type: 'bookmark',
    title: 'Linux Networking Deep Dive — TUM NET 2024',
    url: 'https://www.net.in.tum.de/fileadmin/TUM/NET/NET-2024-04-1/NET-2024-04-1_16.pdf',
    description:
      'Academic paper on advanced Linux networking internals from TU Munich.',
    topic: 'Linux',
    tags: ['linux', 'networking', 'kernel'],
    isPdf: true,
  },
]

export const sampleAbout: AboutPage = {
  _id: 'about',
  name: 'Michael Paul',
  role: 'Software Engineer',
  skills: [
    'JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js', 'Express',
    'Python', 'Alpine.js', 'PHP', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
    'Docker', 'Linux', 'AWS', 'Kubernetes', 'System Design',
  ],
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/kha-erl' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/khaerl' },
    { platform: 'Twitter', url: 'https://x.com/kha_erl' },
  ],
}

export const sampleProjects: Project[] = [
  {
    _id: 'p1',
    _type: 'project',
    title: 'Web Portfolio',
    slug: { current: 'web-portfolio' },
    description: 'Personal portfolio and blog built with Next.js and Sanity CMS.',
    status: 'in-progress',
    liveUrl: 'https://michaelpaul.dev',
    githubUrl: 'https://github.com/kha-erl',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity'],
    publishedAt: '2026-08-01T00:00:00Z',
  },
  {
    _id: 'p2',
    _type: 'project',
    title: 'Linux Monitoring Dashboard',
    slug: { current: 'linux-monitoring-dashboard' },
    description: 'A real-time system monitoring dashboard for Linux servers with metrics on CPU, memory, disk, and network.',
    status: 'previous',
    githubUrl: 'https://github.com/kha-erl',
    techStack: ['Python', 'FastAPI', 'React', 'Docker'],
    publishedAt: '2026-06-01T00:00:00Z',
  },
  {
    _id: 'p3',
    _type: 'project',
    title: 'API Gateway Service',
    slug: { current: 'api-gateway-service' },
    description: 'A lightweight API gateway with rate limiting, auth middleware, and request routing built on Node.js.',
    status: 'future',
    techStack: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL'],
    publishedAt: '2026-05-01T00:00:00Z',
  },
]
