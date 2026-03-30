import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/content'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const projects = getAllProjects()

    const projectSummaries = projects.map((p, i) => 
      `[${i}] ${p.frontmatter.title} (${p.frontmatter.status}) — ${p.frontmatter.description} | Tags: ${p.frontmatter.tags?.join(', ')}`
    ).join('\n')

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      // Fallback: basic keyword matching when no API key
      const results = keywordSearch(query, projects)
      return NextResponse.json({ results })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a semantic search engine. Given a search query and a list of projects, return the indices of the most relevant projects ranked by relevance.

RULES:
- Return ONLY a JSON array of objects with "index" (number) and "score" (0-1 float)
- Score represents semantic relevance, not keyword match
- Return at most 5 results
- Only include results with score > 0.3
- No explanation, no markdown — just the JSON array

Example output: [{"index": 2, "score": 0.95}, {"index": 0, "score": 0.7}]`
          },
          {
            role: 'user',
            content: `Query: "${query}"\n\nProjects:\n${projectSummaries}`
          }
        ],
        temperature: 0,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      // Fallback to keyword search on API error
      const results = keywordSearch(query, projects)
      return NextResponse.json({ results })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim() || '[]'
    
    let ranked: { index: number; score: number }[] = []
    try {
      // Extract JSON array from response (handle potential markdown wrapping)
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        ranked = JSON.parse(jsonMatch[0])
      }
    } catch {
      // Fallback if LLM returns malformed JSON
      const results = keywordSearch(query, projects)
      return NextResponse.json({ results })
    }

    const results = ranked
      .filter(r => r.index >= 0 && r.index < projects.length && r.score > 0)
      .map(r => {
        const project = projects[r.index]
        return {
          id: project.slug,
          text: project.frontmatter.description,
          metadata: {
            type: 'project',
            slug: project.slug,
            title: project.frontmatter.title,
          },
          score: r.score,
        }
      })

    // Also add relevant tag results
    const allTags = new Set<string>()
    for (const r of ranked) {
      if (r.index >= 0 && r.index < projects.length) {
        projects[r.index].frontmatter.tags?.forEach(t => allTags.add(t))
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

/**
 * Fallback keyword search — no API needed.
 * Used when GROQ_API_KEY is not set or API fails.
 */
function keywordSearch(query: string, projects: ReturnType<typeof getAllProjects>) {
  const queryTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 1)
  
  return projects
    .map(project => {
      const searchText = `${project.frontmatter.title} ${project.frontmatter.description} ${project.frontmatter.tags?.join(' ')} ${project.rawContent}`.toLowerCase()
      
      let score = 0
      for (const token of queryTokens) {
        const matches = (searchText.match(new RegExp(token, 'g')) || []).length
        score += matches
      }
      // Normalize
      score = Math.min(score / (queryTokens.length * 3), 1)
      
      return {
        id: project.slug,
        text: project.frontmatter.description,
        metadata: {
          type: 'project' as const,
          slug: project.slug,
          title: project.frontmatter.title,
        },
        score,
      }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}
