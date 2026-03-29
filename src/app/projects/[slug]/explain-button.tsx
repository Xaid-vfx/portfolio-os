'use client'

import { useState } from 'react'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { StreamingText } from '@/components/streaming-text'

interface Project {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
  }
  rawContent: string
}

interface ExplainButtonProps {
  project: Project
}

export function ExplainButton({ project }: ExplainButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const explainProject = async () => {
    setIsLoading(true)
    setError(null)
    setExplanation(null)

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Explain the ${project.frontmatter.title} project in both simple and technical terms. Include what makes it interesting and the key technical decisions.`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get explanation')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += decoder.decode(value)
          setExplanation(fullText)
        }
      }
    } catch (err) {
      setError('Failed to generate explanation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={explainProject}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Explain This Project
          </>
        )}
      </button>

      {explanation && (
        <div className="mt-6 p-6 rounded-xl bg-accent/50 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Explanation</span>
          </div>
          <StreamingText text={explanation} className="text-sm leading-relaxed" />
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
