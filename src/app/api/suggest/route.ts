import { NextResponse } from 'next/server'
import { getMemory } from '@/lib/unified-data'
import { getAllProjects } from '@/lib/content'

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        suggestions: [
          "Build a real-time notification system with WebSockets",
          "Create an AI-powered code review tool",
          "Develop a personal knowledge management system",
          "Build a distributed caching layer for your APIs",
          "Create an automated testing framework for your projects"
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a strategic advisor helping Mohd Zaid decide what to build next. You think about leverage, compounding returns, and systems thinking.

Consider:
- Projects that build on existing work
- High-impact tools that solve real problems
- Opportunities for learning and growth
- Projects that showcase full-stack capabilities
- AI-native approaches

Provide 5 specific, actionable suggestions that would make sense given the context provided. Be concise and practical.`
          },
          {
            role: 'user',
            content: `Based on my current work and the insights about me, what should I build next? Give me 5 suggestions.\n\n${context}`
          }
        ],
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const suggestions = data.choices?.[0]?.message?.content
      ?.split('\n')
      .filter((s: string) => s.trim())
      .slice(0, 5) || []

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Suggest error:', error)
    return NextResponse.json({ 
      suggestions: [
        "Build a real-time notification system with WebSockets",
        "Create an AI-powered code review tool",
        "Develop a personal knowledge management system"
      ]
    })
  }
}
