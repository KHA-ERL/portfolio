import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto py-12 px-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
          >
            MP
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          {[
            { href: 'https://github.com/kha-erl', label: 'Github' },
            { href: 'https://x.com/kha_erl', label: 'Twitter' },
            { href: 'https://linkedin.com/in/khaerl', label: 'Linkedin' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--muted)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          © {year} Michael Paul
        </p>
      </div>
    </footer>
  )
}
