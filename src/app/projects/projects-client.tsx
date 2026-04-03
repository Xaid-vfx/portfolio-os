'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface Project {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
    status: 'building' | 'live' | 'archived'
    links?: string[]
  }
}

interface ProjectsClientProps {
  projects: Project[]
  allTags: string[]
}

export function ProjectsClient({ projects, allTags }: ProjectsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesTag = !selectedTag || project.frontmatter.tags?.includes(selectedTag)
    const matchesSearch =
      !searchQuery ||
      project.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1">Projects</h1>
        <p className="text-sm text-muted-foreground">
          {projects.length} projects - systems thinking, AI integration, and full-stack development.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-border text-sm placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={cn(
            'px-2.5 py-1 rounded text-xs transition-colors',
            !selectedTag
              ? 'bg-foreground text-background'
              : 'bg-accent text-muted-foreground hover:text-foreground'
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={cn(
              'px-2.5 py-1 rounded text-xs transition-colors',
              selectedTag === tag
                ? 'bg-foreground text-background'
                : 'bg-accent text-muted-foreground hover:text-foreground'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-sm text-muted-foreground py-8">No projects match your filter.</p>
      )}
    </div>
  )
}
