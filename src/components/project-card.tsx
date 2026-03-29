import Link from 'next/link'
import { Tag } from './tag'
import { cn } from '@/lib/utils'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  project: {
    slug: string
    frontmatter: {
      title: string
      description: string
      tags: string[]
      status: 'building' | 'live' | 'archived'
      links?: string[]
    }
  }
  showFull?: boolean
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

export function ProjectCard({ project, showFull = false }: ProjectCardProps) {
  const { slug, frontmatter } = project

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'group block p-6 rounded-xl border border-border bg-background transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5',
        showFull && 'col-span-full'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-[10px] font-medium border',
              statusColors[frontmatter.status]
            )}
          >
            {statusLabels[frontmatter.status]}
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {frontmatter.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {frontmatter.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {frontmatter.tags?.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>

      {frontmatter.links && frontmatter.links.length > 0 && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {frontmatter.links.length} linked project{frontmatter.links.length > 1 ? 's' : ''}
          </span>
        </div>
      )}
    </Link>
  )
}
