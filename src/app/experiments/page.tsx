import { getAllProjects } from '@/lib/content'
import { ProjectCard } from '@/components/project-card'
import { FlaskConical } from 'lucide-react'

export default function ExperimentsPage() {
  const allProjects = getAllProjects()
  const experiments = allProjects.filter(p => 
    p.frontmatter.tags?.some(tag => 
      ['ai', 'ml', 'experimental', 'prototype'].includes(tag.toLowerCase())
    ) || p.frontmatter.status === 'building'
  )

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FlaskConical className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Experiments</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A playground for trying new ideas, AI experiments, and technical prototypes.
          Not everything here is production-ready—some things are just for learning.
        </p>
      </div>

      {experiments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No experiments yet. Check back soon.</p>
        </div>
      )}
    </div>
  )
}
