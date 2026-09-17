import { NextResponse } from 'next/server'

export function GET() {
  const key = process.env.INDEXNOW_KEY

  if (!key) {
    return new NextResponse('IndexNow key is not configured.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  return new NextResponse(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
