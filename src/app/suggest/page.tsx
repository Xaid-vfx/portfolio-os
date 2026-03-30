'use client'

import { useState, useEffect } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function SuggestPage() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/suggest')
      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch {
      setError('Failed to fetch suggestions')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSuggestions()
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-1">What to Build Next</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated suggestions based on current projects and patterns.
          </p>
        </div>
        <button
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="p-1.5 rounded border border-border hover:bg-accent transition-colors text-muted-foreground"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isLoading && suggestions.length === 0 ? (
        <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating suggestions...
        </div>
      ) : error ? (
        <p className="text-sm text-muted-foreground">{error}</p>
      ) : (
        <div>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-4 py-4 border-b border-border">
              <span className="text-xs text-muted-foreground tabular-nums mt-0.5 flex-shrink-0 w-4">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <p className="text-sm text-muted-foreground">
          Want to explore further?{' '}
          <Link href="/ask" className="text-foreground hover:underline">
            Ask AI for context →
          </Link>
        </p>
      </div>
    </div>
  )
}
