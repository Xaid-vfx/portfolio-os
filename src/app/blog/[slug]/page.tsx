import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogBySlug, getAllBlogs } from '@/lib/content'
import { Tag } from '@/components/tag'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  const posts = getAllBlogs()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.frontmatter.title} | Zaid`,
    description: post.frontmatter.description,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Blog
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-2xl font-semibold mb-2">{post.frontmatter.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-4">{post.frontmatter.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground/60">
              {formatDate(post.frontmatter.date)}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags?.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/### (.*)/g, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/> (.*)/g, '<blockquote class="border-l-2 border-border pl-4 text-muted-foreground italic my-4">$1</blockquote>')
                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent text-xs font-mono">$1</code>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </article>
    </div>
  )
}
