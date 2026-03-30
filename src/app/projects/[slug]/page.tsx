import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { Tag } from '@/components/tag'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExplainButton } from './explain-button'

interface PageProps {
  params: Promise<{ slug: string }>
}

const statusDot = {
  building: 'bg-amber-400',
  live: 'bg-emerald-400',
  archived: 'bg-neutral-300',
}

const statusLabel = {
  building: 'Building',
  live: 'Live',
  archived: 'Archived',
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = project.frontmatter.links
    ?.map((linkSlug) => getAllProjects().find((p) => p.slug === linkSlug))
    .filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Projects
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn('w-1.5 h-1.5 rounded-full', statusDot[project.frontmatter.status])} />
            <span className="text-xs text-muted-foreground">{statusLabel[project.frontmatter.status]}</span>
          </div>

          <h1 className="text-2xl font-semibold mb-3">{project.frontmatter.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{project.frontmatter.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.frontmatter.tags?.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </header>

        <div className="mb-10">
          <ExplainButton project={project} />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: project.content
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/### (.*)/g, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent text-xs font-mono">$1</code>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/\n/g, '<br />'),
            }}
          />
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Related</h2>
            <div className="space-y-1">
              {relatedProjects.map(
                (related) =>
                  related && (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}`}
                      className="flex items-start justify-between py-3 border-b border-border hover:bg-accent/40 px-1 -mx-1 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium">{related.frontmatter.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{related.frontmatter.description}</p>
                      </div>
                      <span className="text-muted-foreground/40 group-hover:text-muted-foreground text-xs mt-0.5">→</span>
                    </Link>
                  )
              )}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
