import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { PortableTextBlock, SanityImage } from '@/types'
import CodeBlock from '@/components/CodeBlock'
import { urlFor } from '@/lib/utils'

const components = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      const src = urlFor(value)
        .width(900)
        .auto('format')
        .url()

      return (
        <figure className="my-8 relative w-full h-80">
          <Image
            src={src}
            alt={value.alt ?? 'Article supporting image'}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="rounded-xl object-cover"
          />
        </figure>
      )
    },

    code: ({
      value,
    }: {
      value: {
        code?: string
        language?: string
        filename?: string
      }
    }) => <CodeBlock value={value} />,
  },

  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2>{children}</h2>
    ),

    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),

    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),

    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
  },

  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href: string }
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    strong: ({
      children,
    }: {
      children?: React.ReactNode
    }) => (
      <strong>{children}</strong>
    ),

    em: ({
      children,
    }: {
      children?: React.ReactNode
    }) => (
      <em>{children}</em>
    ),

    code: ({
      children,
    }: {
      children?: React.ReactNode
    }) => (
      <code>{children}</code>
    ),
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

export function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText
        value={value}
        components={components}
      />
    </div>
  )
}
