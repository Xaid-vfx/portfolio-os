import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content')
const EMBEDDINGS_PATH = path.join(process.cwd(), 'src/content/embeddings.json')

interface Project {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
    status: string
  }
  rawContent: string
}

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

async function getEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not set')
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data[0].embedding
}

async function main() {
  console.log('Generating embeddings for all content...\n')

  const projects = getAllProjects()
  console.log(`Found ${projects.length} projects\n`)

  const embeddings: Embedding[] = []

  for (const project of projects) {
    console.log(`Processing: ${project.frontmatter.title}`)

    const projectText = `${project.frontmatter.title}. ${project.frontmatter.description}. ${project.rawContent}`
    const projectEmbedding = await getEmbedding(projectText)
    
    embeddings.push({
      id: project.slug,
      text: projectText,
      metadata: {
        type: 'project',
        slug: project.slug,
        title: project.frontmatter.title,
      },
      embedding: projectEmbedding,
    })
    console.log(`  - Added project embedding`)

    for (const tag of project.frontmatter.tags || []) {
      const tagText = `Tag: ${tag}. Project: ${project.frontmatter.title}. ${project.frontmatter.description}`
      const tagEmbedding = await getEmbedding(tagText)
      
      embeddings.push({
        id: `tag-${tag}-${project.slug}`,
        text: tagText,
        metadata: {
          type: 'tag',
          tag,
          title: project.frontmatter.title,
        },
        embedding: tagEmbedding,
      })
      console.log(`  - Added tag: ${tag}`)
    }

    await new Promise(resolve => setTimeout(resolve, 200))
  }

  fs.writeFileSync(EMBEDDINGS_PATH, JSON.stringify(embeddings, null, 2))

  console.log(`\n✓ Generated ${embeddings.length} embeddings`)
  console.log(`✓ Saved to ${EMBEDDINGS_PATH}`)
}

main().catch(console.error)
