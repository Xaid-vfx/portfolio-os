'use client'

import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { StreamingText } from '@/components/streaming-text'

interface Project {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
  }
  rawContent: string
  content: string
}

interface ExplainButtonProps {
  project: Project
}

export function ExplainButton({ project }: ExplainButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const summarize = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Give me a 2-3 line summary of the ${project.frontmatter.title} project. Here's the content:\n\n${project.rawContent}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += decoder.decode(value)
          setResult(fullText)
        }
      }
    } catch (err) {
      console.error('AI error:', err)
      setError('Failed to generate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={summarize}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Summarizing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Summarize
          </>
        )}
      </button>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-accent/50 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Summary</span>
          </div>
          <StreamingText text={result} className="text-sm leading-relaxed" />
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
