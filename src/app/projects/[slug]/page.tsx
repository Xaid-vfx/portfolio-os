import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { Tag } from '@/components/tag'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExplainButton } from './explain-button'

interface PageProps {
  params: Promise<{ slug: string }>
}

const statusColors = {
  building: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  live: 'bg-green-500/10 text-green-600 border-green-500/20',
  archived: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
}

const statusLabels = {
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
    ?.map(linkSlug => getAllProjects().find(p => p.slug === linkSlug))
    .filter(Boolean)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 md:mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <article>
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span
              className={cn(
                'px-2.5 md:px-3 py-1 rounded-full text-xs font-medium border',
                statusColors[project.frontmatter.status]
              )}
            >
              {statusLabels[project.frontmatter.status]}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{project.frontmatter.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground">{project.frontmatter.description}</p>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
            {project.frontmatter.tags?.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </header>

        <div className="mb-8 md:mb-12">
          <ExplainButton project={project} />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm md:text-base">
          <div dangerouslySetInnerHTML={{
            __html: project.content
              .replace(/## (.*)/g, '<h2>$1</h2>')
              .replace(/### (.*)/g, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent text-sm font-mono">$1</code>')
              .replace(/\n\n/g, '</p><p class="mb-4">')
              .replace(/\n/g, '<br />')
          }} />
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <section className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Related Projects</h2>
            <div className="grid gap-3 md:gap-4">
              {relatedProjects.map((related) => (
                related && (
                  <Link
                    key={related.slug}
                    href={`/projects/${related.slug}`}
                    className="p-3 md:p-4 rounded-lg border border-border hover:border-primary/20 transition-colors"
                  >
                    <h3 className="font-medium mb-1 text-sm md:text-base">{related.frontmatter.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{related.frontmatter.description}</p>
                  </Link>
                )
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
