/**
 * Sanity Studio embedded at /studio
 * This is the content management interface for the portfolio.
 *
 * Access it at: http://localhost:3000/studio (dev)
 * or: https://yourdomain.com/studio (production)
 */

// src/app/studio/[[...tool]]/page.tsx

import { NextStudio } from 'next-sanity/studio'
import config from '@root/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}