'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { Tag } from '@/components/tag'
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
    const matchesSearch = !searchQuery || 
      project.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const tagCounts = allTags.map(tag => ({
    tag,
    count: projects.filter(p => p.frontmatter.tags?.includes(tag)).length,
  }))

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Projects</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          A collection of projects showcasing systems thinking, AI integration, and full-stack development.
        </p>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
            !selectedTag 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-accent hover:bg-accent/80'
          }`}
        >
          All
        </button>
        {tagCounts.map(({ tag, count }) => (
          <Tag
            key={tag}
            tag={tag}
            count={count}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  )
}
