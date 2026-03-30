import Link from 'next/link'
import { Tag } from './tag'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

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

export function ProjectCard({ project, showFull = false }: ProjectCardProps) {
  const { slug, frontmatter } = project

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'group block py-4 border-b border-border hover:bg-accent/40 transition-colors px-1 -mx-1',
        showFull && 'col-span-full'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', statusDot[frontmatter.status])} />
            <h3 className="text-sm font-medium text-foreground group-hover:text-foreground truncate">
              {frontmatter.title}
            </h3>
            <span className="text-xs text-muted-foreground hidden sm:inline">{statusLabel[frontmatter.status]}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 pl-3.5">
            {frontmatter.description}
          </p>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 pl-3.5">
              {frontmatter.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
              {frontmatter.tags.length > 4 && (
                <span className="text-xs text-muted-foreground">+{frontmatter.tags.length - 4}</span>
              )}
            </div>
          )}
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
      </div>
    </Link>
  )
}
