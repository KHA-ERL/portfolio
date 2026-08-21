'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/bookmarks', label: 'Bookmarks' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl"
      style={{
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,.06)',
      }}
    >
      <nav
        className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          aria-label="Michael Paul — Home"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 group-hover:scale-105"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }}
          >
            MP
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {navLinks.map(({ href, label }) => {
            const active =
              pathname === href || pathname.startsWith(href + '/')

            return (
              <Link
                key={href}
                href={href}
                className="text-xs sm:text-sm font-medium transition-all duration-200 relative group whitespace-nowrap"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text)',
                }}
              >
                {label}

                <span
                  className="absolute -bottom-1 left-0 w-full h-px transition-all duration-300 origin-left"
                  style={{
                    background: 'var(--accent)',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </Link>
            )
          })}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}