import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'
import { getAbout } from '@/lib/sanity.queries'
import { sampleAbout } from '@/lib/sample-data'
import { getJsonLd, personJsonLd } from '@/lib/site'
import type { AboutPage } from '@/types'
import Image from "next/image";
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiDocker,
  SiLinux,
  SiKubernetes,
} from 'react-icons/si'

import { FaAws, } from 'react-icons/fa6'
import { SiJavascript } from 'react-icons/si'
import { SiAlpinedotjs } from 'react-icons/si'
import { MdArchitecture } from 'react-icons/md'

const skillIcons = {
  TypeScript: SiTypescript,
  'Next.js': SiNextdotjs,
  React: SiReact,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  'Alpine.js': SiAlpinedotjs,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Redis: SiRedis,
  Docker: SiDocker,
  Linux: SiLinux,
  AWS: FaAws,
  Kubernetes: SiKubernetes,
  'System Design': MdArchitecture,
  JavaScript: SiJavascript,
}

export const metadata: Metadata = {
  title: 'About Michael Paul',
  description:
    'Learn about Michael Paul, a software engineer and technical writer working across backend systems, DevOps, cloud infrastructure, AI products, and media.',
  alternates: {
    canonical: '/about',
  },
}

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

const whatIDo = [
  {
    title: 'Full Stack Software Engineering',
    bullets: [
      'Build scalable web applications from concept to production.',
      'Develop performant frontend and backend systems.',
      'Design APIs, databases, and application architecture.',
      'Deliver software that solves real business problems.',
    ],
    footer:
      'React, Next.js, TypeScript, Angular Node.js, Express, PHP, Laravel, PostgreSQL, MongoDB, MySQL, Docker.',
  },
  {
    title: 'AI Powered Product Engineering',
    bullets: [
      'Build AI-powered products, SaaS platforms, MVPs, and intelligent business solutions from concept to production.',
      'Design scalable software architectures, APIs, and automation workflows that are secure, maintainable, and built for growth.',
      'Integrate LLMs, AI agents, and modern development tools to streamline workflows and deliver smarter user experiences.',
      'Lead the entire product lifecycle from strategy and system design to development, deployment, and continuous iteration.',
    ],
    footer:
      'AI Agents, LLM Integration & Workflow Automation, Prompt Engineering, System Design, API Design, Authentication, Responsive UI/UX.',
  },
  {
    title: 'Technical Writing & DevOps Engineering',
    bullets: [
      'Write technical documentation, implementation guides, and developer-focused articles.',
      'Document APIs, architectures, workflows, and engineering best practices.',
      'Build and maintain deployment pipelines and cloud infrastructure.',
      'Improve reliability through automation, containerization, and monitoring.',
    ],
    footer:
      'Docker, Linux, GitHub Actions, Nginx, AWS, DigitalOcean, CI/CD, System Design, API Documentation.',
  },
  {
    title: 'Motion Design & Video Editing',
    bullets: [
      'Create motion graphics and short-form videos that simplify technical concepts.',
      'Produce product demos, launch videos, tutorials, and social-first content.',
      'Design visual assets that strengthen product branding and user engagement.',
      'Turn complex ideas into compelling stories through video and motion design.',
    ],
    footer:
      'Premiere Pro, DaVinci Resolve, Photoshop, Illustrator, Figma, CapCut, Content Strategy.',
  },
]
function SocialLink({ platform, url }: { platform: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn text-sm font-medium"
      style={{
        color: 'var(--text)',
      }}
      aria-label={`${platform} profile`}
    >
      <span style={{ color: 'var(--accent)' }}>
        {platformIcons[platform] ?? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
      </span>
      {platform}
    </a>
  )
}

export default async function AboutPage() {
  let about: AboutPage = sampleAbout

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityAbout = await getAbout()
      if (sanityAbout) about = sanityAbout
    }
  } catch {
    // fallback
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getJsonLd(personJsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

      {/* Mobile Image */}
      <div className="flex md:hidden justify-center mb-10">
        <div className="profile-photo">
          <Image
            src="/aboutme.jpg"
            alt="Michael Paul"
            width={320}
            height={320}
            priority
            className="profile-photo-image"
          />
        </div>
      </div>

      {/* Top section: Avatar + intro */}
      <div className="mb-10">

        {/* Text side */}
        <div className="">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold"
              style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              MP
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                Software Engineer
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Text */}
            <div className="flex-1 min-w-0 max-w-xl">
              <h1
                className="text-4xl sm:text-5xl font-black mb-4 leading-tight"
                style={{ color: 'var(--text)' }}
              >
                {about.name}
              </h1>

              {about.bio ? (
                <PortableTextRenderer value={about.bio} />
              ) : (
                <div className="prose">
                  <p className="">
                    Hey, I&apos;m Michael. I build backend systems, dig into Linux - Cloud internals, and care
                    deeply about writing reliable and maintainable software.
                  </p>

                  <p className="">
                    This site is where I publish what I learn from API design patterns to deep dives
                    on how the kernel handles networking. If it&apos;s interesting to me, it ends up here.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Image */}
            <div className="hidden md:flex flex-shrink-0 justify-center items-start">
              <div className="profile-photo">
                <Image
                  src="/aboutme.jpg"
                  alt="Michael Paul"
                  width={320}
                  height={320}
                  priority
                  className="profile-photo-image"
                />
              </div>
            </div>
          </div>

          <section className="mt-5 sm:mt-0 max-w-xl">
            <h2
              className="text-xl sm:text-2xl font-black mb-4 leading-tight display-heading"
              style={{ color: 'var(--text)' }}
            >
              What I Do
            </h2>

            <div className="space-y-8">
              {whatIDo.map((item) => (
                <article
                  key={item.title}
                  className="p-2 flex flex-col h-full"
                >
                  <h2
                    className="text-lg font-bold mb-5 display-heading"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.title}
                  </h2>

                  <ul
                    className="space-y-3 flex-1"
                    style={{ color: 'var(--muted)' }}
                  >
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm">
                        <span style={{ color: 'var(--accent)' }}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 pt-4 text-sm "
                    style={{
                      borderTop: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    {item.footer}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Skills */}
      {about.skills && about.skills.length > 0 && (
        <section aria-labelledby="skills-heading" className="mb-16">
          <h2
            id="skills-heading"
            className="text-xl sm:text-2xl font-black mb-4 leading-tight display-heading"
            style={{ color: 'var(--text)' }}
          >
            Tech Stack & Skills
          </h2>

          <div
            className="max-w-xl rounded-2xl py-6 sm:py-8 px-4 sm:px-6 shadow-sm border"
            style={{
              background: 'var(--skills-bg)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
              {about.skills.map((skill) => {
                const Icon = skillIcons[skill as keyof typeof skillIcons]

                return (
                  <div
                    key={skill}
                    className="flex flex-row gap-2 p-2 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        style={{ color: 'var(--text)' }}
                      />
                    )}

                    <span
                      className="text-sm font-medium text-center"
                      style={{ color: 'var(--text)' }}
                    >
                      {skill}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className='max-w-xl'>
        <h2
          className="text-xl sm:text-2xl font-black mb-4 leading-tight display-heading"
          style={{ color: 'var(--text)' }}
        >
          Beyond the Screen
        </h2>

        {about.bio ? (
          <PortableTextRenderer value={about.bio} />
        ) : (
          <div className="prose">
            <p className="">
              When I&apos;m not writing code, I train strength, reflexes, and endurance through boxing, video gaming, and running. I approach sports with the same discipline I bring to engineering.
            </p>
          </div>
        )}

        {/* Social links */}
        {about.socialLinks && about.socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 my-8">
            {about.socialLinks.map((link) => (
              <SocialLink key={link.platform} platform={link.platform} url={link.url} />
            ))}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section
        className="rounded-2xl p-8 text-center max-w-xl"
        style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)' }}
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="text-2xl font-bold mb-3 display-heading"
          style={{ color: 'var(--text)' }}
        >
          Let&apos;s Connect
        </h2>
        <p className="mb-6 text-sm max-w-sm mx-auto peditorial" style={{ color: 'var(--muted)' }}>
          Whether it&apos;s an engineering conversation, a collaboration, or just a hello,
          feel free to reach out via{' '}
          <span className="underline">
            <a href="https://linkedin.com/in/khaerl" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </span>{' '}
          or check out my{' '}
          <span className="underline">
            <a href="/projects">projects</a>
          </span>.
        </p>
      </section>

    </div>
  )
}
