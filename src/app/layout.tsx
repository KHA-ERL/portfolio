import type { Metadata } from 'next'
import { Inter, Amiri, Playfair_Display } from 'next/font/google'

import './globals.css'
import { absoluteUrl, siteConfig, siteKeywords } from '@/lib/site'

const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amiri',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Michael Paul',
  },
  description: siteConfig.description,
  keywords: siteKeywords,
  authors: [{ name: 'Michael Paul' }],
  creator: 'Michael Paul',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.image),
        width: 1200,
        height: 630,
        alt: 'Michael Paul - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.image)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    bingbot: 'index, follow, max-snippet:-1, max-image-preview:large',
    ...(bingVerification ? { 'msvalidate.01': bingVerification } : {}),
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en" data-scroll-behavior="smooth"
      className={`${inter.variable} ${amiri.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
