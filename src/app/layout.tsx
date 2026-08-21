import type { Metadata } from 'next'
import { Inter, Amiri, Playfair_Display } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

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
  title: {
    default: 'Michael Paul — Software Engineer',
    template: '%s | Michael Paul',
  },
  description:
    'Software engineer writing about backend systems, Linux, and the craft of building great software.',
  keywords: ['software engineer', 'backend', 'Linux', 'TypeScript', 'Next.js', 'blog'],
  authors: [{ name: 'Michael Paul' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://khaerl.dev',
    siteName: 'Michael Paul',
    title: 'Michael Paul — Software Engineer',
    description:
      'Software engineer writing about backend systems, Linux, and the craft of building great software.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Paul — Software Engineer',
    description:
      'Software engineer writing about backend systems, Linux, and the craft of building great software.',
  },
  robots: { index: true, follow: true },
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
