'use client'

import { useState } from 'react'
import { Search as SearchIcon, Loader2, ArrowRight } from 'lucide-react'
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <SearchIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Semantic Search</h1>
        </div>
        <p className="text-muted-foreground">
          Search across all projects using AI-powered semantic understanding.
          Find relevant results even when keywords don&apos;t match exactly.
        </p>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try: 'AI search engine' or 'real-time collaboration'..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>

      {hasSearched && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((result, index) => (
          <Link
            key={`${result.id}-${index}`}
            href={result.metadata.type === 'project' && result.metadata.slug 
              ? `/projects/${result.metadata.slug}` 
              : `/projects?tag=${encodeURIComponent(result.metadata.tag || '')}`
            }
            className="block p-6 rounded-xl border border-border hover:border-primary/20 hover:bg-accent/50 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    result.metadata.type === 'project' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-purple-500/10 text-purple-600'
                  }`}>
                    {result.metadata.type === 'project' ? 'Project' : 'Tag'}
                  </span>
                  <span className="font-medium">{result.metadata.title}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {result.metadata.tag && `Tag: ${result.metadata.tag}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {Math.round(result.score * 100)}% match
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!hasSearched && (
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-muted-foreground">
            Enter a search query to find relevant projects
          </p>
        </div>
      )}

      {hasSearched && results.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No results found. Try a different query.
          </p>
        </div>
      )}
    </div>
  )
}
