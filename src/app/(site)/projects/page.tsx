import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity.queries'
import { urlFor, getOgImage } from '@/lib/utils'
import { sampleProjects } from '@/lib/sample-data'
import type { Project } from '@/types'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my previous, current, and future projects.',
}

export default async function ProjectsPage() {
  let projects: Project[] = sampleProjects

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityProjects = await getProjects()
      if (sanityProjects?.length) projects = sanityProjects
    }
  } catch {
    // fall back to sample data
  }

  // Pre-fetch OG images server-side for projects without a cover image
  const ogImages = await Promise.all(
  projects.map(async (project) => {
    // 1. Sanity cover image takes priority
    if (project.coverImage) {
      return null
    }

    // 2. Try live website
    if (project.liveUrl) {
      const liveImage = await getOgImage(project.liveUrl)

      if (liveImage) {
        return liveImage
      }
    }

    // 3. Try GitHub if live website has no preview
    if (project.githubUrl) {
      const githubImage = await getOgImage(project.githubUrl)

      if (githubImage) {
        return githubImage
      }
    }

    // 4. Nothing available
    return null
  })
)

  return (
    <main className="max-w-7xl mx-auto px-8 py-20">
      <h1 className="text-5xl font-black mb-5">Projects</h1>
      <p className="mb-20 opacity-70">
        A showcase of my previous, current, and future projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project, i) => {
            const previewImg = project.coverImage
              ? urlFor(project.coverImage).width(600).height(400).url()
              : ogImages[i]

            return (
              <div
                key={project._id}
                className="flex flex-col rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden bg-[var(--tag-bg)]"
                style={{ borderColor: 'var(--border)' }}
              >
                <a href={project.liveUrl || project.githubUrl || '#'} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative h-56 w-full border-b bg-[var(--border)]" style={{ borderColor: 'var(--border)' }}>
                    {previewImg ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewImg}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="opacity-50 text-sm">No cover</span>
                      </div>
                    )}
                  </div>
                </a>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold line-clamp-1">{project.title}</h3>
                    {project.status && (
                      <span className="text-xs px-2 py-1 rounded-full border capitalize" style={{ borderColor: 'var(--border)' }}>
                        {project.status.replace('-', ' ')}
                      </span>
                    )}
                  </div>

                  {project.description && (
                    <p className="text-sm opacity-70 mb-4">{project.description}</p>
                  )}

                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-[var(--border)] opacity-80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                        Live
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: 'var(--text)' }}>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed rounded-xl" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            No projects found. Add some in Sanity!
          </div>
        )}
      </div>
    </main>
  )
}
