import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content')

export interface ProjectFrontmatter {
  title: string
  description: string
  tags: string[]
  status: 'building' | 'live' | 'archived'
  links?: string[]
  date?: string
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
  rawContent: string
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(CONTENT_DIR, 'projects')
  
  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'))

  return files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(projectsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content: content,
      rawContent: content.replace(/[#*`]/g, '').replace(/\n+/g, ' ').trim(),
    }
  })
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(CONTENT_DIR, 'projects', `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content: content,
    rawContent: content.replace(/[#*`]/g, '').replace(/\n+/g, ' ').trim(),
  }
}

export function getAllTags(): string[] {
  const projects = getAllProjects()
  const tagsSet = new Set<string>()
  
  projects.forEach(project => {
    project.frontmatter.tags?.forEach(tag => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter(project => 
    project.frontmatter.tags?.includes(tag)
  )
}
