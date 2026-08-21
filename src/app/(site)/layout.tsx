import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Navbar />

      <main className="min-h-screen pt-16">
        {children}
      </main>

      <Footer />
    </ThemeProvider>
  )
}