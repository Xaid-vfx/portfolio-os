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

    const groqApiKey = process.env.GROQ_API_KEY
    const openrouterApiKey = process.env.OPENROUTER_API_KEY
    if (!groqApiKey && !openrouterApiKey) {
      return NextResponse.json({ 
        error: 'API key not configured',
        response: "I'm not configured to answer questions right now."
      }, { status: 500 })
    }

    const projects = getAllProjects()
    const memory = getMemory()

    const context = projects.map(p => 
      `- ${p.frontmatter.title}: ${p.frontmatter.description}\n  Tags: ${p.frontmatter.tags?.join(', ')}\n  Status: ${p.frontmatter.status}\n  Content: ${p.rawContent.slice(0, 300)}`
    ).join('\n\n')

    const memoryContext = memory.insights.length > 0 
      ? `Insights about the person:\n${memory.insights.map(i => `- ${i}`).join('\n')}\n\nPatterns:\n${memory.patterns.map(p => `- ${p}`).join('\n')}`
      : ''

    const systemPrompt = `You are an AI assistant on Mohd Zaid's personal website. You answer questions about his work, projects, and engineering approach.

About his projects:
${context}

${memoryContext}

About Zaid:
- Systems-oriented engineer — thinks in architectures, not features
- Experience at Absinthe Labs (distributed backends, campaign platforms), IG Group (trading infrastructure, cloud migration), Bloom (co-founded multi-tenant platform), Graviti (logistics tracking)
- Builds AI-native tooling, distributed systems, and developer infrastructure
- Tech: TypeScript, Node.js, React, Next.js, Java, Spring Boot, AWS, Kafka, Docker, Terraform, PostgreSQL
- Currently building Orqys (multi-agent engineering ops), Wispr Flow (local-first voice AI)

Answer questions about his work, projects, or technical decisions. Be concise, direct, and technical. Don't make up information — only reference what's provided in the context.`

    let stream = null

    if (groqApiKey) {
      stream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ],
          stream: true,
          max_tokens: 1024,
        }),
      })

      if (!stream.ok && stream.status !== 429) {
        const errBody = await stream.text()
        console.error('Groq API error:', stream.status, errBody)
      }
    }

    if (!stream?.ok && openrouterApiKey) {
      stream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openrouterApiKey}`,
          'HTTP-Referer': 'https://portfolio-os.vercel.app',
          'X-Title': 'Portfolio OS',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ],
          stream: true,
          max_tokens: 1024,
        }),
      })
    }

    if (!stream?.ok) {
      const errBody = await stream?.text().catch(() => '')
      console.error('API error:', stream?.status, errBody)
      throw new Error(`API error: ${stream?.status || 'unknown'}`)
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
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to generate response',
      response: `I encountered an error: ${message}. Please try again.`
    }, { status: 500 })
  }
}
