import { NextResponse } from 'next/server'

import {
  answerEngineQuestions,
  answerEngineServices,
  answerEngineTopics,
} from '@/lib/answer-engine'
import { absoluteUrl, siteConfig } from '@/lib/site'

export function GET() {
  return NextResponse.json(
    {
      name: siteConfig.name,
      canonicalUrl: siteConfig.url,
      description: siteConfig.description,
      entityType: 'Person',
      primaryTopics: answerEngineTopics,
      services: answerEngineServices,
      directAnswers: answerEngineQuestions,
      importantUrls: {
        home: absoluteUrl('/'),
        about: absoluteUrl('/about'),
        answers: absoluteUrl('/answers'),
        projects: absoluteUrl('/projects'),
        blog: absoluteUrl('/blog'),
        bookmarks: absoluteUrl('/bookmarks'),
        llms: absoluteUrl('/llms.txt'),
        sitemap: absoluteUrl('/sitemap.xml'),
      },
      sameAs: siteConfig.social,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    }
  )
}
