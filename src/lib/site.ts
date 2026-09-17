export const siteConfig = {
  name: 'Michael Paul',
  title: 'Michael Paul - Software Engineer',
  description:
    'Michael Paul is a software engineer, DevOps engineer, technical writer, and product builder focused on backend systems, cloud infrastructure, Linux, and AI-powered software.',
  url: 'https://khaerl.dev',
  locale: 'en_GB',
  image: '/opengraph-image',
  social: {
    github: 'https://github.com/kha-erl',
    linkedin: 'https://linkedin.com/in/khaerl',
    twitter: 'https://x.com/kha_erl',
  },
}

export const siteKeywords = [
  'Michael Paul',
  'software engineer',
  'backend engineer',
  'DevOps engineer',
  'technical writer',
  'AI product engineer',
  'cloud infrastructure',
  'Linux',
  'TypeScript',
  'Next.js',
  'API design',
  'software architecture',
]

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function getPageTitle(title: string) {
  return title === siteConfig.name ? siteConfig.title : `${title} | ${siteConfig.name}`
}

export function getJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': absoluteUrl('/about#person'),
  name: siteConfig.name,
  alternateName: 'kha-erl',
  url: siteConfig.url,
  image: absoluteUrl('/aboutme.jpg'),
  jobTitle: 'Software Engineer',
  description: siteConfig.description,
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
  ],
  knowsAbout: [
    'Backend engineering',
    'DevOps',
    'Linux',
    'Cloud architecture',
    'Technical writing',
    'AI-powered product engineering',
    'API design',
    'TypeScript',
    'Next.js',
    'Video editing',
  ],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@id': absoluteUrl('/about#person'),
  },
  inLanguage: 'en',
  about: {
    '@id': absoluteUrl('/about#person'),
  },
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Michael Paul Software Engineering',
  url: siteConfig.url,
  image: absoluteUrl('/aboutme.jpg'),
  description: siteConfig.description,
  founder: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Nigeria',
    },
    {
      '@type': 'Place',
      name: 'Remote',
    },
  ],
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Backend and full stack software engineering',
        description:
          'Production web applications, APIs, databases, dashboards, and maintainable product systems.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'DevOps and cloud infrastructure engineering',
        description:
          'Deployment pipelines, Linux servers, Docker workflows, CI/CD, monitoring, and cloud infrastructure.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'AI-powered product engineering',
        description:
          'LLM integrations, AI agents, workflow automation, and AI-assisted product features.',
      },
    },
  ],
}
