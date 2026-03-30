'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StreamingTextProps {
  text: string
  className?: string
  showCursor?: boolean
}

export function StreamingText({ text, className, showCursor = true }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [text])

  return (
    <p className={cn('whitespace-pre-wrap', className)}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="inline-block w-0.5 h-4 ml-0.5 bg-primary" />
      )}
    </p>
  )
}
