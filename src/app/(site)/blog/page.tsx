import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPosts } from "@/lib/sanity.queries";
import { samplePosts } from "@/lib/sample-data";
import { absoluteUrl, getJsonLd } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Software Engineering Blog",
  description:
    "Writing on backend systems, Linux internals, TypeScript patterns, and software engineering craft.",
  alternates: {
    canonical: "/blog",
  },
};

const POSTS_PER_PAGE = 30;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  let posts = samplePosts;

  try {
    const sanityPosts = await getPosts();

    if (sanityPosts?.length) {
      posts = sanityPosts;
    }
  } catch {
    posts = samplePosts;
  }

  const params = await searchParams;

  const currentPage = Math.max(
    Number(params.page ?? 1),
    1
  );

  const totalPages = Math.ceil(
    posts.length / POSTS_PER_PAGE
  );

  const start = (currentPage - 1) * POSTS_PER_PAGE;

  const paginatedPosts = posts.slice(
    start,
    start + POSTS_PER_PAGE
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getJsonLd({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Software Engineering Blog",
            url: absoluteUrl("/blog"),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              url: absoluteUrl(`/blog/${post.slug.current}`),
            })),
          }),
        }}
      />

      <header className="mb-10">
        <h1
          className="text-4xl sm:text-5xl font-black mb-4"
          style={{ color: "var(--text)" }}
        >
          Software Engineering Blog
        </h1>

        <p
          className="max-w-2xl text-lg"
          style={{ color: "var(--muted)" }}
        >
          Thoughts on software engineering, DevOps,
          Linux, AI, architecture and building products.
        </p>
      </header>

      {paginatedPosts.length === 0 ? (
        <div
          className="py-20 text-center rounded-xl"
          style={{
            border: "1px dashed var(--border)",
            color: "var(--muted)",
          }}
        >
          No posts yet.
        </div>
      ) : (
        <>
          <div
            className="hidden md:grid grid-cols-[130px_1fr_90px] pb-3 text-xs uppercase tracking-widest"
            style={{
              color: "var(--muted)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span>Date</span>
            <span>Article</span>
            <span className="text-right">Reading</span>
          </div>

          <div>
            {paginatedPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block transition-all duration-300 hover:translate-x-1"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[130px_1fr_90px] gap-2 md:gap-6 py-6"
                  style={{
                    borderBottom:
                      "1px solid var(--border)",
                  }}
                >
                  <time
                    className="text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.publishedAt)}
                  </time>

                  <h2
                    className="font-semibold text-lg transition-opacity group-hover:opacity-70"
                    style={{ color: "var(--text)" }}
                  >
                    {post.title}
                  </h2>

                  <div
                    className="text-sm text-left md:text-right"
                    style={{ color: "var(--muted)" }}
                  >
                    {post.estimatedReadingTime ?? 3} min
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">

              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    border:
                      "1px solid var(--border)",
                  }}
                >
                  ← Previous
                </Link>
              )}

              {Array.from({
                length: totalPages,
              }).map((_, i) => {
                const page = i + 1;

                return (
                  <Link
                    key={page}
                    href={`/blog?page=${page}`}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background:
                        currentPage === page
                          ? "var(--accent)"
                          : "transparent",
                      color:
                        currentPage === page
                          ? "var(--bg)"
                          : "var(--text)",
                      border:
                        "1px solid var(--border)",
                    }}
                  >
                    {page}
                  </Link>
                );
              })}

              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    border:
                      "1px solid var(--border)",
                  }}
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}
