import { NextResponse } from 'next/server'
import { getMemory } from '@/lib/unified-data'
import { getAllProjects } from '@/lib/content'

export async function GET() {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        suggestions: [
          "Build a real-time collaborative code review tool with AI-powered suggestions",
          "Create a local-first LLM-powered CLI that generates infrastructure configs from natural language",
          "Develop an MCP-based agent runtime that supports hot-swappable tool chains",
          "Build a distributed task queue with built-in observability and dead letter handling",
          "Create a semantic changelog generator that reads git diffs and writes release notes"
        ]
      })
    }

    const memory = getMemory()
    const projects = getAllProjects()

    const context = `
Current projects:
${projects.map(p => `- ${p.frontmatter.title}: ${p.frontmatter.description}`).join('\n')}

Existing insights:
${memory.insights.join('\n')}

Known patterns:
${memory.patterns.join('\n')}
    `.trim()

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
            content: `You are a strategic advisor helping Mohd Zaid decide what to build next. He's a systems engineer who builds AI-native tooling, distributed backends, and developer infrastructure.

Consider:
- Projects that build on existing work and compound his skills
- High-impact tools that solve real engineering problems
- Opportunities at the intersection of AI and developer tooling
- Systems-level projects, not feature-level ideas
- Projects that would be impressive to strong technical teams

Provide exactly 5 specific, actionable suggestions. Each should be a single concise sentence. No numbering, no bullets - just the raw suggestions, one per line.`
          },
          {
            role: 'user',
            content: `Based on my current work and patterns, what should I build next?\n\n${context}`
          }
        ],
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error('Groq API error')
    }

    const data = await response.json()
    const suggestions = data.choices?.[0]?.message?.content
      ?.split('\n')
      .map((s: string) => s.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter((s: string) => s.length > 10)
      .slice(0, 5) || []

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Suggest error:', error)
    return NextResponse.json({ 
      suggestions: [
        "Build a real-time collaborative code review tool with AI-powered suggestions",
        "Create a local-first LLM-powered CLI that generates infrastructure configs from natural language",
        "Develop an MCP-based agent runtime that supports hot-swappable tool chains"
      ]
    })
  }
}
