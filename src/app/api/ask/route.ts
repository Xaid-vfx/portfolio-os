import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/content'
import fs from 'fs'
import path from 'path'

const MEMORY_PATH = path.join(process.cwd(), 'src/content/memory.json')

interface Memory {
  insights: string[]
  patterns: string[]
}

function getMemory(): Memory {
  if (fs.existsSync(MEMORY_PATH)) {
    return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'))
  }
  return { insights: [], patterns: [] }
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        response: "I'm not configured to answer questions right now. Please set up the OpenAI API key."
      }, { status: 500 })
    }

    const projects = getAllProjects()
    const memory = getMemory()

    const context = projects.map(p => 
      `- ${p.frontmatter.title}: ${p.frontmatter.description}\n  Tags: ${p.frontmatter.tags?.join(', ')}\n  Status: ${p.frontmatter.status}`
    ).join('\n\n')

    const memoryContext = memory.insights.length > 0 
      ? `Insights about the person:\n${memory.insights.map(i => `- ${i}`).join('\n')}\n\nPatterns:\n${memory.patterns.map(p => `- ${p}`).join('\n')}`
      : ''

    const systemPrompt = `You are Mohd Zaid. You think in systems, optimize for leverage, and build infrastructure + AI tools.

About your projects:
${context}

${memoryContext}

Personality traits:
- You think in systems, not features
- You optimize for leverage and compounding returns
- You prefer building platforms over point solutions
- You're direct and practical
- You ask clarifying questions when needed

Answer questions about your work, projects, or technical decisions. Be concise but informative.`

    const stream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        stream: true,
      }),
    })

    if (!stream.ok) {
      throw new Error('OpenAI API error')
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const streamProcessor = new ReadableStream({
      async start(controller) {
        const reader = stream.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  controller.close()
                  return
                }
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    controller.enqueue(encoder.encode(content))
                  }
                } catch {}
              }
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(streamProcessor, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Ask error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate response',
      response: 'I encountered an error processing your question. Please try again.'
    }, { status: 500 })
  }
}
