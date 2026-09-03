import Link from 'next/link'
import { getBreadcrumbJsonLd, getJsonLd } from '@/lib/site'

interface BreadcrumbsProps {
  items: Array<{
    label: string
    href: string
  }>
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav className="mb-8 text-sm" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getJsonLd(
            getBreadcrumbJsonLd(
              allItems.map((item) => ({
                name: item.label,
                path: item.href,
              }))
            )
          ),
        }}
      />

      <ol className="flex flex-wrap items-center gap-2" style={{ color: 'var(--muted)' }}>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" style={{ color: 'var(--text)' }}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-opacity hover:opacity-70">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
