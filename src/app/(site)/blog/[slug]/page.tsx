import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

import {
  getPostBySlug,
  getAllSlugs,
} from "@/lib/sanity.queries";

import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();

  return slugs
    .filter((item) => item.slug)
    .map((item) => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: PostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <Link
        href="/blog"
        className="inline-block mb-10 underline"
        style={{ color: "var(--muted)" }}
      >
        ← Back to blog
      </Link>

      <article>

        <header className="mb-10">

          <time
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            {formatDate(post.publishedAt)}
          </time>

          <h1
            className="text-4xl sm:text-5xl font-black mt-3 mb-6"
            style={{ color: "var(--text)" }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="text-xl leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    border:
                      "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </header>

        {post.body && post.body.length > 0 && (
          <PortableTextRenderer value={post.body} />
        )}

      </article>

    </main>
  );
}