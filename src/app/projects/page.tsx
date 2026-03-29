import { getAllProjects, getAllTags } from '@/lib/content'
import { ProjectsClient } from './projects-client'

export const metadata = {
  title: 'Projects | Portfolio OS',
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const allTags = getAllTags()

  return <ProjectsClient projects={projects} allTags={allTags} />
}
