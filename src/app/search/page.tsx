'use client'

import { useState } from 'react'
import { Loader2, ArrowUpRight, Search } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  id: string
  text: string
  metadata: {
    type: string
    slug?: string
    tag?: string
    title: string
  }
  score: number
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setHasSearched(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1">Semantic Search</h1>
        <p className="text-sm text-muted-foreground">
          Find projects using AI-powered semantic understanding. Works even when keywords don&apos;t match.
        </p>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Try: 'AI search engine' or 'real-time collaboration'..."
            className="w-full pl-9 pr-4 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-border text-sm placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="px-4 py-2 rounded bg-foreground text-background text-sm font-medium disabled:opacity-40 transition-opacity hover:opacity-80"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
      </div>

      {hasSearched && (
        <p className="text-xs text-muted-foreground mb-4">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      )}

      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <Link
              key={`${result.id}-${index}`}
              href={
                result.metadata.type === 'project' && result.metadata.slug
                  ? `/projects/${result.metadata.slug}`
                  : `/projects?tag=${encodeURIComponent(result.metadata.tag || '')}`
              }
              className="flex items-start justify-between py-4 border-b border-border hover:bg-accent/40 px-1 -mx-1 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-muted-foreground uppercase tracking-wide">
                    {result.metadata.type}
                  </span>
                  <span className="text-sm font-medium">{result.metadata.title}</span>
                </div>
                {result.metadata.tag && (
                  <p className="text-xs text-muted-foreground pl-0">Tag: {result.metadata.tag}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className="text-xs text-muted-foreground">{Math.round(result.score * 100)}%</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {!hasSearched && (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Enter a query above to search</p>
        </div>
      )}

      {hasSearched && results.length === 0 && !isLoading && (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No results. Try a different query.</p>
        </div>
      )}
    </div>
  )
}
