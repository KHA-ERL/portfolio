import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  answerEngineQuestions,
  answerEngineServices,
  answerEngineTopics,
  getAnswersCollectionJsonLd,
  getFaqJsonLd,
} from '@/lib/answer-engine'
import { absoluteUrl, getJsonLd, personJsonLd, siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Answers About Michael Paul',
  description:
    'Direct answers about Michael Paul, including software engineering services, DevOps work, AI product engineering, technical writing, projects, and learning resources.',
  alternates: {
    canonical: '/answers',
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/answers'),
    title: 'Answers About Michael Paul',
    description:
      'Entity-focused answers about Michael Paul, his engineering services, projects, writing, and AI product work.',
    images: [
      {
        url: absoluteUrl('/aboutme.jpg'),
        width: 1200,
        height: 1200,
        alt: 'Michael Paul',
      },
    ],
  },
}

export default function AnswersPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(getFaqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(getAnswersCollectionJsonLd()) }}
      />

      <Breadcrumbs items={[{ label: 'Answers', href: '/answers' }]} />

      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
          Direct answers
        </p>
        <h1 className="text-4xl sm:text-5xl font-black mb-5" style={{ color: 'var(--text)' }}>
          Answers About Michael Paul
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
          Michael Paul is a software engineer, DevOps engineer, technical writer, and product
          builder focused on backend systems, cloud infrastructure, Linux, TypeScript, Next.js,
          and AI-powered software.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="quick-answers-heading">
        <h2
          id="quick-answers-heading"
          className="text-2xl font-bold mb-6 display-heading"
          style={{ color: 'var(--text)' }}
        >
          Quick Answers
        </h2>

        <div className="space-y-8">
          {answerEngineQuestions.map((item) => (
            <article key={item.question} className="pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                {item.question}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14" aria-labelledby="services-heading">
        <h2
          id="services-heading"
          className="text-2xl font-bold mb-6 display-heading"
          style={{ color: 'var(--text)' }}
        >
          Services And Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {answerEngineServices.map((service) => (
            <article
              key={service.name}
              className="rounded-lg p-6"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--tag-bg)',
              }}
            >
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>
                {service.name}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs px-2 py-1 rounded"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="text-2xl font-bold mb-6 display-heading"
          style={{ color: 'var(--text)' }}
        >
          Topics Michael Paul Is Associated With
        </h2>

        <div className="flex flex-wrap gap-2">
          {answerEngineTopics.map((topic) => (
            <span
              key={topic}
              className="text-sm px-3 py-1 rounded-full"
              style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="resources-heading">
        <h2
          id="resources-heading"
          className="text-2xl font-bold mb-6 display-heading"
          style={{ color: 'var(--text)' }}
        >
          Canonical Resources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/', label: `${siteConfig.name} home` },
            { href: '/about', label: 'About Michael Paul' },
            { href: '/projects', label: 'Software engineering projects' },
            { href: '/blog', label: 'Software engineering blog' },
            { href: '/bookmarks', label: 'Engineering bookmarks' },
            { href: '/ai-summary.json', label: 'AI-readable site summary' },
          ].map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="rounded-lg p-4 transition-opacity hover:opacity-75"
              style={{ border: '1px solid var(--border)' }}
            >
              {resource.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
