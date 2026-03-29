import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content')
const MEMORY_PATH = path.join(process.cwd(), 'src/content/memory.json')
const LOGS_PATH = path.join(process.cwd(), 'src/content/logs.json')

interface Memory {
  insights: string[]
  patterns: string[]
  lastUpdated: string
}

interface Project {
  slug: string
  frontmatter: {
    title?: string
    description?: string
    tags?: string[]
    status?: string
    [key: string]: any
  }
  rawContent: string
}

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
}

function getAllProjects(): Project[] {
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
      frontmatter: data,
      rawContent: content.replace(/[#*`]/g, '').replace(/\n+/g, ' ').trim(),
    }
  })
}

function getMemory(): Memory {
  if (fs.existsSync(MEMORY_PATH)) {
    return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'))
  }
  return {
    insights: [],
    patterns: [],
    lastUpdated: new Date().toISOString(),
  }
}

function getActivities(): Activity[] {
  if (fs.existsSync(LOGS_PATH)) {
    const logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'))
    return logs.activities || []
  }
  return []
}

async function analyzeWithAI(context: string): Promise<{ insights: string[], patterns: string[] }> {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    console.log('No OpenAI API key, using heuristic analysis')
    return generateHeuristicInsights(getAllProjects())
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an autonomous reasoning agent that analyzes a person's project portfolio and identifies:
1. KEY INSIGHTS: Deep observations about how they think, what they value, and how they approach problems
2. PATTERNS: Recurring themes, technologies, or approaches across their work

Be specific and insightful. Focus on:
- What makes their approach unique
- Technical patterns and decisions
- Trade-offs they make
- How different projects connect
- What their work reveals about their thinking

Return your analysis as a JSON object with "insights" and "patterns" arrays.`
          },
          {
            role: 'user',
            content: `Analyze this person's project portfolio and generate insights and patterns:\n\n${context}`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const analysis = JSON.parse(data.choices[0].message.content)
    
    return {
      insights: analysis.insights || [],
      patterns: analysis.patterns || [],
    }
  } catch (error) {
    console.error('AI analysis failed, using heuristic:', error)
    return generateHeuristicInsights(getAllProjects())
  }
}

function generateHeuristicInsights(projects: Project[]): { insights: string[], patterns: string[] } {
  const insights: string[] = []
  const patterns: string[] = []

  const tags = projects.flatMap(p => p.frontmatter.tags || [])
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag)

  const statusCounts = projects.reduce((acc, p) => {
    const status = p.frontmatter.status || 'unknown'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  insights.push(`Focus areas: ${topTags.slice(0, 3).join(', ')}`)
  
  if (statusCounts.building > statusCounts.live) {
    insights.push('Currently building more than shipping - focused on new development')
  } else {
    insights.push('Balanced approach between building and shipping')
  }

  patterns.push('Projects tend to focus on developer tools and infrastructure')
  patterns.push('AI integration is a consistent theme across recent work')
  patterns.push('Full-stack architecture preferred over specialized solutions')

  return { insights, patterns }
}

async function main() {
  console.log('🧠 Running autonomous reasoning agent...\n')

  const projects = getAllProjects()
  const currentMemory = getMemory()
  const activities = getActivities()

  const context = `
PROJECT PORTFOLIO:
${projects.map(p => `
## ${p.frontmatter.title} (${p.frontmatter.status})
Tags: ${p.frontmatter.tags?.join(', ')}
${p.rawContent.slice(0, 500)}
`).join('\n')}

RECENT ACTIVITIES:
${activities.map(a => `- ${a.type}: ${a.title} - ${a.description}`).join('\n')}

EXISTING INSIGHTS:
${currentMemory.insights.map(i => `- ${i}`).join('\n')}

EXISTING PATTERNS:
${currentMemory.patterns.map(p => `- ${p}`).join('\n')}
`.trim()

  console.log('Analyzing project portfolio...')
  const { insights, patterns } = await analyzeWithAI(context)

  const newMemory: Memory = {
    insights: [...new Set([...currentMemory.insights, ...insights])],
    patterns: [...new Set([...currentMemory.patterns, ...patterns])],
    lastUpdated: new Date().toISOString(),
  }

  fs.writeFileSync(MEMORY_PATH, JSON.stringify(newMemory, null, 2))

  console.log('\n✅ Analysis complete!\n')
  console.log('NEW INSIGHTS:')
  insights.forEach(i => console.log(`  • ${i}`))
  console.log('\nNEW PATTERNS:')
  patterns.forEach(p => console.log(`  • ${p}`))
  console.log(`\n✓ Memory updated: ${MEMORY_PATH}`)
}

main().catch(console.error)
