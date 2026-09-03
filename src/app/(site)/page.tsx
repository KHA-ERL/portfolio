import type { Metadata } from 'next'
import Link from 'next/link'
import ProjectPreview from '@/components/ProjectPreview'
import { getJsonLd, localBusinessJsonLd, personJsonLd, siteConfig } from '@/lib/site'
import { formatDate, getProjectPreview } from '@/lib/utils'
import { getLatestPosts, getFeaturedBookmarks, getFeaturedProjects } from '@/lib/sanity.queries'
import { samplePosts, sampleBookmarks, sampleProjects } from '@/lib/sample-data'
import { Project } from '@/types'

export const metadata: Metadata = {
  title: 'Michael Paul - Software Engineer',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  // Try to load from Sanity; fall back to sample data if not configured
  let posts = samplePosts
  let bookmarks = sampleBookmarks
  let projects: Project[] = sampleProjects

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const [sanityPosts, sanityBookmarks, sanityProjects] = await Promise.all([
        getLatestPosts(),
        getFeaturedBookmarks(),
        getFeaturedProjects()
      ])
      if (sanityPosts?.length) posts = sanityPosts
      if (sanityBookmarks?.length) bookmarks = sanityBookmarks
      if (sanityProjects?.length) projects = sanityProjects
    }
  } catch {
    // Sanity not configured yet — use sample data
  }

  // Get unique topics for bookmark preview
  const topics = [...new Set(bookmarks.map((b) => b.topic))]

  const projectsWithPreviews = await Promise.all(
    projects.map(async (project) => {
      return {
        ...project,
        preview: await getProjectPreview(project),
      }
    })
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(localBusinessJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[60vh] flex flex-col justify-center py-8" aria-labelledby="hero-heading">
        <div className="animate-fade-up max-w-xl">
          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6"
            style={{ color: 'var(--text)' }}
          >
            Michael{' '}
            <span className="gradient-text">Paul</span>
          </h1>

          <h2
            className="text-xl sm:text-2xl leading-relaxed mb-10 display-heading"
            style={{ color: 'var(--muted)' }}
          >
            Software & Devops Engineer &#x2022; Technical Writer &#x2022; Content Creator &#x2022; Video Editor
          </h2>

          <p
            className="leading-relaxed mb-5 prose"
            style={{ color: 'var(--muted)' }}
          >
            Software engineer focused on backend systems, Linux internals, cloud architecture, video editing, technical writing, documenting what I learn, and building
            things that last.
          </p>

          <p
            className="prose leading-relaxed mb-5"
            style={{ color: 'var(--muted)' }}
          >
            When I&apos;m not writing code, I dedicate myself to strength, reflex and endurance training through boxing, video gaming and running. I approach sports with the same discipline I bring to engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/blog" className="btn-primary" style={{ color: 'var(--accent-foreground)' }}>
              Read the Blog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/about" className="btn-ghost social-btn">
              About me
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { value: `${posts.length}+`, label: 'Articles' },
            { value: `${bookmarks.length}+`, label: 'Bookmarks' },
            { value: `${topics.length}`, label: 'Topics' },
          ].map(({ value, label }) => (
            <div key={label} className="animate-fade-up-delay-2">
              <p className="text-3xl font-black" style={{ color: 'var(--text)' }}>{value}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Posts ─────────────────────────────────────────── */}
      <section className="py-8" aria-labelledby="posts-heading">
        <div className="flex items-center justify-between mb-8">
          <h2
            id="posts-heading"
            className="text-2xl font-bold display-heading"
            style={{ color: "var(--text)" }}
          >
            Latest Posts
          </h2>

          <Link
            href="/blog"
            className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            All posts

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              border: "1px dashed var(--border)",
              color: "var(--muted)",
            }}
          >
            No posts yet.
          </div>
        ) : (
          <>
            {/* Desktop headings */}
            <div
              className="hidden md:grid grid-cols-[120px_1fr_80px] pb-3 text-xs uppercase tracking-widest"
              style={{
                color: "var(--muted)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span>Date</span>
              <span>Article</span>
              <span className="text-right">Read</span>
            </div>

            <div>
              {posts.slice(0, 6).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-[120px_1fr_80px] gap-2 md:gap-6 py-5 rounded-xl px-2 transition-all duration-300 group-hover:bg-[var(--tag-bg)] group-hover:translate-x-1"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {/* Date */}
                    <time
                      className="text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {formatDate(post.publishedAt)}
                    </time>

                    {/* Title */}
                    <h3
                      className="font-semibold transition-opacity group-hover:opacity-70"
                      style={{ color: "var(--text)" }}
                    >
                      {post.title}
                    </h3>

                    {/* Reading Time */}
                    <span
                      className="text-sm md:text-right"
                      style={{ color: "var(--muted)" }}
                    >
                      {post.estimatedReadingTime ?? 3} min
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── My Projects ───────────────────────────────────────────── */}
      <section className="py-8" aria-labelledby="projects-heading">
        <div className="flex items-center justify-between mb-8">
          <h2
            id="projects-heading"
            className="text-2xl font-bold display-heading"
            style={{ color: 'var(--text)' }}
          >
            My Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            Browse all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithPreviews.length > 0 ? projectsWithPreviews.map((project) => (
            <div
              key={project._id}
              className="flex flex-col rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden bg-[var(--tag-bg)]"
              style={{ borderColor: 'var(--border)' }}
            >
              <a href={project.liveUrl || project.githubUrl || '#'} target="_blank" rel="noopener noreferrer" className="block group">
                <ProjectPreview alt={project.title} preview={project.preview} className="h-48" />
              </a>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                  {project.status && (
                    <span className="text-xs px-2 py-1 rounded-full border bg-opacity-50 capitalize" style={{ borderColor: 'var(--border)' }}>
                      {project.status.replace('-', ' ')}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-sm opacity-70 line-clamp-2 mb-4">{project.description}</p>
                )}

                <div className="mt-auto flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                      Live
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--text)' }}>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12 border border-dashed rounded-xl" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              Selected projects will appear here soon.
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
