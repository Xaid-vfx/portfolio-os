import { getAllProjects } from './content'
import fs from 'fs'
import path from 'path'

export interface UnifiedProject {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'building' | 'live' | 'archived'
  source: 'local' | 'github'
  url?: string
  stars?: number
  language?: string
  date?: string
  links?: string[]
}

export interface Activity {
  id: string
  type: 'build' | 'ship' | 'learn' | 'update'
  title: string
  description: string
  timestamp: string
  projectSlug?: string
}

export interface Memory {
  insights: string[]
  patterns: string[]
  lastUpdated: string
}

const LOGS_PATH = path.join(process.cwd(), 'src/content/logs.json')
const MEMORY_PATH = path.join(process.cwd(), 'src/content/memory.json')

export function getLocalProjects(): UnifiedProject[] {
  const projects = getAllProjects()
  return projects.map(p => ({
    id: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    tags: p.frontmatter.tags || [],
    status: p.frontmatter.status,
    source: 'local' as const,
    links: p.frontmatter.links,
    date: p.frontmatter.date,
  }))
}

export function getActivities(): Activity[] {
  if (!fs.existsSync(LOGS_PATH)) {
    return []
  }
  
  try {
    const logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'))
    return logs.activities || []
  } catch {
    return []
  }
}

export function getMemory(): Memory {
  if (!fs.existsSync(MEMORY_PATH)) {
    return {
      insights: [],
      patterns: [],
      lastUpdated: new Date().toISOString(),
    }
  }
  
  try {
    return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'))
  } catch {
    return {
      insights: [],
      patterns: [],
      lastUpdated: new Date().toISOString(),
    }
  }
}

export function updateMemory(memory: Memory): void {
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2))
}
