'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
    } catch (err) {
      setError('Failed to fetch suggestions')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSuggestions()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">What to Build Next</h1>
          </div>
          <button
            onClick={fetchSuggestions}
            disabled={isLoading}
            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
            title="Refresh suggestions"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <p className="text-muted-foreground">
          AI-powered suggestions for what to build next, based on current projects and patterns.
        </p>
      </div>

      {isLoading && suggestions.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-background hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {index + 1}
                </div>
                <p className="flex-1 text-base leading-relaxed">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 rounded-xl bg-accent/50 border border-border">
        <h2 className="font-semibold mb-4">Want to discuss?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These suggestions are AI-generated based on the current project state and memory.
          For more personalized advice, let&apos;s have a conversation.
        </p>
        <Link
          href="/ask"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          Ask AI for more context <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
