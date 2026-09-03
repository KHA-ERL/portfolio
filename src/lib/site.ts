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
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl('/aboutme.jpg'),
  jobTitle: 'Software Engineer',
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
  ],
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
}
