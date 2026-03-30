import { getAllProjects, getAllTags } from '@/lib/content'
import { ProjectsClient } from './projects-client'

export const metadata = {
  title: 'Projects | Portfolio OS',
}

const projectOrder = ['synapse', 'wispr-flow', 'orqys', 'bloom', 'neploy']

export default function ProjectsPage() {
  const projects = getAllProjects()
  const orderedProjects = projectOrder
    .map(slug => projects.find(p => p.slug === slug))
    .filter(Boolean) as typeof projects
  const allTags = getAllTags()

  return <ProjectsClient projects={orderedProjects} allTags={allTags} />
}
