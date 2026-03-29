import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/content'
import fs from 'fs'
import path from 'path'

const EMBEDDINGS_PATH = path.join(process.cwd(), 'src/content/embeddings.json')

interface Embedding {
  id: string
  text: string
  metadata: {
    type: string
    slug?: string
    tag?: string
    title: string
  }
  embedding: number[]
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  let dotProduct = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

async function getEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get embedding')
  }

  const data = await response.json()
  return data.data[0].embedding
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    let embeddings: Embedding[] = []
    if (fs.existsSync(EMBEDDINGS_PATH)) {
      embeddings = JSON.parse(fs.readFileSync(EMBEDDINGS_PATH, 'utf-8'))
    } else {
      const projects = getAllProjects()
      const texts = projects.flatMap(p => [
        { id: p.slug, text: `${p.frontmatter.title}. ${p.frontmatter.description}`, metadata: { type: 'project', slug: p.slug, title: p.frontmatter.title } }
      ])
      
      for (const item of texts) {
        const embedding = await getEmbedding(item.text)
        embeddings.push({ ...item, embedding })
      }
    }

    const queryEmbedding = await getEmbedding(query)

    const results = embeddings.map(e => ({
      ...e,
      score: cosineSimilarity(queryEmbedding, e.embedding),
    })).sort((a, b) => b.score - a.score).slice(0, 5)

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
