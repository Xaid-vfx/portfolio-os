'use client'

import { useState } from 'react'
import { Sparkles, Loader2, FileText } from 'lucide-react'
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
  const [mode, setMode] = useState<'explain' | 'summary' | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAction = async (action: 'explain' | 'summary') => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setMode(action)

    try {
      const question = action === 'explain'
        ? `Explain the ${project.frontmatter.title} project in both simple and technical terms. Include what makes it interesting and the key technical decisions.`
        : `Summarize the entire ${project.frontmatter.title} project in a concise, structured way. Include the problem, solution, tech stack, key features, and any metrics or results if available. Here's the full content:\n\n${project.rawContent}`

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
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
      <div className="flex gap-3">
        <button
          onClick={() => handleAction('summary')}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading && mode === 'summary' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Summarize
            </>
          )}
        </button>

        <button
          onClick={() => handleAction('explain')}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 transition-colors"
        >
          {isLoading && mode === 'explain' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Explaining...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Explain
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-accent/50 border border-border">
          <div className="flex items-center gap-2 mb-4">
            {mode === 'summary' ? (
              <FileText className="w-4 h-4 text-primary" />
            ) : (
              <Sparkles className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-medium">
              {mode === 'summary' ? 'AI Summary' : 'AI Explanation'}
            </span>
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
