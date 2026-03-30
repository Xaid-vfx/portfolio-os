import { getAllProjects } from './content'

export interface GraphNode {
  id: string
  type: 'project' | 'tag'
  label: string
  status?: string
  url?: string
}

export interface GraphLink {
  source: string
  target: string
  type: 'project-tag' | 'project-link'
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export function buildGraphData(): GraphData {
  const projects = getAllProjects()
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []
  const nodeIds = new Set<string>()

  projects.forEach(project => {
    if (!nodeIds.has(project.slug)) {
      nodes.push({
        id: project.slug,
        type: 'project',
        label: project.frontmatter.title,
        status: project.frontmatter.status,
        url: `/projects/${project.slug}`,
      })
      nodeIds.add(project.slug)
    }

    project.frontmatter.tags?.forEach(tag => {
      const tagId = `tag-${tag}`
      
      if (!nodeIds.has(tagId)) {
        nodes.push({
          id: tagId,
          type: 'tag',
          label: tag,
          url: `/projects?tag=${encodeURIComponent(tag)}`,
        })
        nodeIds.add(tagId)
      }

      links.push({
        source: project.slug,
        target: tagId,
        type: 'project-tag',
      })
    })

    project.frontmatter.links?.forEach(linkSlug => {
      if (!nodeIds.has(linkSlug)) {
        const linkedProject = projects.find(p => p.slug === linkSlug)
        if (linkedProject) {
          nodes.push({
            id: linkSlug,
            type: 'project',
            label: linkedProject.frontmatter.title,
            status: linkedProject.frontmatter.status,
            url: `/projects/${linkSlug}`,
          })
          nodeIds.add(linkSlug)
        }
      }

      // Only create the link if the target node exists
      if (nodeIds.has(linkSlug)) {
        links.push({
          source: project.slug,
          target: linkSlug,
          type: 'project-link',
        })
      }
    })
  })

  return { nodes, links }
}
