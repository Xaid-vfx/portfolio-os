import { getAllProjects } from './content'

export interface Embedding {
  id: string
  text: string
  metadata: {
    type: 'project' | 'tag'
    slug?: string
    tag?: string
    title: string
  }
  embedding: number[]
}

export interface SearchResult {
  id: string
  text: string
  metadata: Embedding['metadata']
  score: number
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export function searchEmbeddings(
  queryEmbedding: number[],
  embeddings: Embedding[],
  limit: number = 5
): SearchResult[] {
  const results = embeddings.map(embedding => ({
    ...embedding,
    score: cosineSimilarity(queryEmbedding, embedding.embedding),
  }))

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ embedding: _, ...rest }) => rest as SearchResult)
}

export function generateTextForEmbedding(): { id: string; text: string; metadata: Embedding['metadata'] }[] {
  const projects = getAllProjects()
  const texts: { id: string; text: string; metadata: Embedding['metadata'] }[] = []

  projects.forEach(project => {
    texts.push({
      id: project.slug,
      text: `${project.frontmatter.title}. ${project.frontmatter.description}. ${project.rawContent}`,
      metadata: {
        type: 'project',
        slug: project.slug,
        title: project.frontmatter.title,
      },
    })

    project.frontmatter.tags?.forEach(tag => {
      texts.push({
        id: `tag-${tag}-${project.slug}`,
        text: `Tag: ${tag}. Project: ${project.frontmatter.title}. ${project.frontmatter.description}`,
        metadata: {
          type: 'tag',
          tag,
          title: project.frontmatter.title,
        },
      })
    })
  })

  return texts
}
