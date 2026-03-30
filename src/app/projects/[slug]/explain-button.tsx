'use client'

import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { StreamingText } from '@/components/streaming-text'
import projectSummaries from '@/content/project-summaries.json'

interface Project {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
  }
}

interface ExplainButtonProps {
  project: Project
}

export function ExplainButton({ project }: ExplainButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const summarize = () => {
    setIsLoading(true)
    setResult(null)

    setTimeout(() => {
      const summary = projectSummaries[project.slug as keyof typeof projectSummaries]
      setResult(summary || 'Summary not available.')
      setIsLoading(false)
    }, 500)
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
    </div>
  )
}
