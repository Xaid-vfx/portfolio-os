import { NextResponse } from 'next/server'
import { getLocalProjects, getMemory } from '@/lib/unified-data'

export async function GET() {
  try {
    const localProjects = getLocalProjects()
    const memory = getMemory()

    const response = {
      projects: localProjects,
      stats: {
        total: localProjects.length,
        building: localProjects.filter(p => p.status === 'building').length,
        live: localProjects.filter(p => p.status === 'live').length,
        archived: localProjects.filter(p => p.status === 'archived').length,
      },
      memory: {
        insightsCount: memory.insights.length,
        patternsCount: memory.patterns.length,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
