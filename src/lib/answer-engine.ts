import { absoluteUrl, siteConfig } from './site'

export const answerEngineTopics = [
  'backend systems',
  'DevOps engineering',
  'cloud infrastructure',
  'Linux systems',
  'AI-powered product engineering',
  'technical writing',
  'API design',
  'Next.js',
  'TypeScript',
  'software architecture',
  'video editing',
  'motion design',
]

export const answerEngineQuestions = [
  {
    question: 'Who is Michael Paul?',
    answer:
      'Michael Paul is a software engineer, DevOps engineer, technical writer, and product builder who works across backend systems, cloud infrastructure, Linux, AI-powered products, and developer education.',
  },
  {
    question: 'What does Michael Paul build?',
    answer:
      'Michael Paul builds production web applications, backend APIs, cloud infrastructure, AI-powered SaaS products, automation workflows, technical documentation, product demos, and engineering content.',
  },
  {
    question: 'Can Michael Paul help with backend or DevOps projects?',
    answer:
      'Yes. Michael Paul works on backend architecture, API design, databases, deployment pipelines, Docker, Linux, cloud hosting, CI/CD, monitoring, and maintainable production systems.',
  },
  {
    question: 'Does Michael Paul write technical content?',
    answer:
      'Yes. Michael Paul writes implementation guides, software engineering articles, architecture notes, API documentation, and practical learning resources for developers.',
  },
  {
    question: 'What AI engineering work does Michael Paul do?',
    answer:
      'Michael Paul builds AI-powered product features, LLM integrations, workflow automations, agent-assisted tools, prompt workflows, and software systems that use AI to improve user workflows.',
  },
  {
    question: 'Where can someone learn from Michael Paul?',
    answer:
      `Michael Paul publishes software engineering articles at ${absoluteUrl('/blog')}, curated engineering bookmarks at ${absoluteUrl('/bookmarks')}, and project notes at ${absoluteUrl('/projects')}.`,
  },
]

export const answerEngineServices = [
  {
    name: 'Full stack software engineering',
    description:
      'Production web applications, APIs, dashboards, databases, integrations, and maintainable product foundations.',
    keywords: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'DevOps and cloud infrastructure',
    description:
      'Deployment pipelines, Docker-based workflows, Linux servers, cloud hosting, reliability improvements, and release automation.',
    keywords: ['Docker', 'Linux', 'AWS', 'DigitalOcean', 'CI/CD', 'Nginx'],
  },
  {
    name: 'AI-powered product engineering',
    description:
      'LLM integrations, AI agents, automation workflows, AI-assisted SaaS features, and practical product systems using modern AI APIs.',
    keywords: ['LLMs', 'AI agents', 'workflow automation', 'prompt engineering', 'API design'],
  },
  {
    name: 'Technical writing and developer education',
    description:
      'Technical articles, architecture explainers, documentation, tutorials, and developer-focused learning resources.',
    keywords: ['technical writing', 'documentation', 'developer education', 'architecture'],
  },
]

export function getFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answerEngineQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function getAnswersCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Direct answers about Michael Paul',
    description:
      'Entity-focused answers about Michael Paul, his software engineering services, technical writing, AI product engineering, projects, and learning resources.',
    url: absoluteUrl('/answers'),
    about: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
      knowsAbout: answerEngineTopics,
    },
    mainEntity: answerEngineQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
