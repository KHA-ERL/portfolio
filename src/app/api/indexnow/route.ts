import { NextRequest, NextResponse } from 'next/server'

import { absoluteUrl, siteConfig } from '@/lib/site'

type IndexNowRequest = {
  urls?: string[]
}

function isSiteUrl(url: string) {
  try {
    return new URL(url).host === new URL(siteConfig.url).host
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const key = process.env.INDEXNOW_KEY
  const submitSecret = process.env.INDEXNOW_SUBMIT_SECRET

  if (!key || !submitSecret) {
    return NextResponse.json(
      { error: 'IndexNow is not configured.' },
      { status: 501 }
    )
  }

  const authorization = request.headers.get('authorization')

  if (authorization !== `Bearer ${submitSecret}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const body = (await request.json()) as IndexNowRequest
  const urls = Array.from(new Set(body.urls ?? [])).filter(isSiteUrl).slice(0, 10000)

  if (urls.length === 0) {
    return NextResponse.json(
      { error: 'Send at least one URL from this site.' },
      { status: 400 }
    )
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: new URL(siteConfig.url).host,
      key,
      keyLocation: absoluteUrl('/indexnow-key.txt'),
      urlList: urls,
    }),
  })

  return NextResponse.json(
    {
      submitted: urls,
      status: response.status,
      ok: response.ok,
    },
    { status: response.ok || response.status === 202 ? 202 : 502 }
  )
}
