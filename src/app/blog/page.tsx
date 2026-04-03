import { getAllBlogs } from '@/lib/content'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Tag } from '@/components/tag'

export const metadata = {
  title: 'Blog | Zaid',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllBlogs()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1">Blog</h1>
        <p className="text-sm text-muted-foreground">
          {posts.length} posts - thoughts on philosophy, mindset, and building.
        </p>
      </div>

      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-4 border-b border-border hover:bg-accent/40 transition-colors px-1 -mx-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-foreground group-hover:text-foreground mb-1">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                  {post.frontmatter.description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground/60">
                    {formatDate(post.frontmatter.date)}
                  </span>
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
